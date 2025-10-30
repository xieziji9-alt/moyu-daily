import Parser from 'rss-parser'

// RSS解析器
const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },
})

// RSS新闻源配置
export const RSS_SOURCES = [
  {
    name: '人民网-时政',
    url: 'http://www.people.com.cn/rss/politics.xml',
    category: '时政',
  },
  {
    name: '人民网-国际',
    url: 'http://www.people.com.cn/rss/world.xml',
    category: '国际',
  },
  {
    name: '人民网-财经',
    url: 'http://www.people.com.cn/rss/finance.xml',
    category: '财经',
  },
  {
    name: '新华网-时政',
    url: 'http://www.news.cn/politics/news_politics.xml',
    category: '时政',
  },
  {
    name: '央广网',
    url: 'http://www.cnr.cn/rss/news.xml',
    category: '综合',
  },
  {
    name: '中国新闻网',
    url: 'https://www.chinanews.com.cn/rss/scroll-news.xml',
    category: '综合',
  },
]

export interface RSSNewsItem {
  title: string
  link: string
  pubDate: string
  source: string
  category: string
  content?: string
}

/**
 * 从单个RSS源获取新闻
 */
export async function fetchRSSFeed(source: typeof RSS_SOURCES[0]): Promise<RSSNewsItem[]> {
  try {
    console.log(`📡 正在获取: ${source.name}`)
    const feed = await parser.parseURL(source.url)
    
    const items: RSSNewsItem[] = feed.items.slice(0, 10).map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || new Date().toISOString(),
      source: source.name,
      category: source.category,
      content: item.contentSnippet || item.content || '',
    }))
    
    console.log(`✅ ${source.name}: 获取 ${items.length} 条新闻`)
    return items
  } catch (error) {
    console.error(`❌ ${source.name} 获取失败:`, error)
    return []
  }
}

/**
 * 从所有RSS源获取新闻
 */
export async function fetchAllRSSFeeds(): Promise<RSSNewsItem[]> {
  console.log('🚀 开始获取所有RSS新闻源...')
  
  const results = await Promise.allSettled(
    RSS_SOURCES.map(source => fetchRSSFeed(source))
  )
  
  const allNews: RSSNewsItem[] = []
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allNews.push(...result.value)
    } else {
      console.error(`❌ ${RSS_SOURCES[index].name} 失败:`, result.reason)
    }
  })
  
  console.log(`✅ 总共获取 ${allNews.length} 条新闻`)
  return allNews
}

/**
 * 筛选和格式化新闻为日报格式
 */
export function formatNewsForDaily(newsItems: RSSNewsItem[], count: number = 15): string[] {
  // 去重（基于标题）
  const uniqueNews = Array.from(
    new Map(newsItems.map(item => [item.title, item])).values()
  )
  
  // 按发布时间排序（最新的在前）
  uniqueNews.sort((a, b) => {
    const dateA = new Date(a.pubDate).getTime()
    const dateB = new Date(b.pubDate).getTime()
    return dateB - dateA
  })
  
  // 选择多样化的新闻（不同类别）
  const selectedNews: RSSNewsItem[] = []
  const categoryCount: Record<string, number> = {}
  
  for (const news of uniqueNews) {
    if (selectedNews.length >= count) break
    
    const category = news.category
    const currentCount = categoryCount[category] || 0
    
    // 每个类别最多选3条，保证多样性
    if (currentCount < 3) {
      selectedNews.push(news)
      categoryCount[category] = currentCount + 1
    }
  }
  
  // 如果还不够，补充其他新闻
  if (selectedNews.length < count) {
    for (const news of uniqueNews) {
      if (selectedNews.length >= count) break
      if (!selectedNews.includes(news)) {
        selectedNews.push(news)
      }
    }
  }
  
  // 格式化为简报格式
  return selectedNews.slice(0, count).map(news => {
    // 清理标题，移除多余的空格和特殊字符
    let title = news.title.trim()
    
    // 如果标题太长，截断
    if (title.length > 100) {
      title = title.substring(0, 97) + '...'
    }
    
    // 添加来源标注（可选）
    // title = `${title}（${news.source}）`
    
    return title
  })
}

/**
 * 获取今日新闻（用于定时任务）
 */
export async function getTodayNews(count: number = 15): Promise<{
  news: string[]
  sources: string[]
}> {
  try {
    const allNews = await fetchAllRSSFeeds()
    const formattedNews = formatNewsForDaily(allNews, count)
    const sources = [...new Set(allNews.map(n => n.source))]
    
    return {
      news: formattedNews,
      sources,
    }
  } catch (error) {
    console.error('❌ 获取今日新闻失败:', error)
    return {
      news: [],
      sources: [],
    }
  }
}

/**
 * 测试RSS源是否可用
 */
export async function testRSSSource(url: string): Promise<boolean> {
  try {
    await parser.parseURL(url)
    return true
  } catch (error) {
    return false
  }
}

/**
 * 获取RSS源状态
 */
export async function getRSSSourcesStatus(): Promise<Array<{
  name: string
  url: string
  status: 'online' | 'offline'
}>> {
  const results = await Promise.allSettled(
    RSS_SOURCES.map(async source => ({
      name: source.name,
      url: source.url,
      status: (await testRSSSource(source.url)) ? 'online' as const : 'offline' as const,
    }))
  )
  
  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => (r as PromiseFulfilledResult<any>).value)
}

