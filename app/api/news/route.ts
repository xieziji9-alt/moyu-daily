import { NextRequest, NextResponse } from 'next/server'
import { getNewsByDate, getLatestNews, getAvailableDates } from '@/lib/newsData'
import connectDB, { isConnected } from '@/lib/mongodb'
import DailyNews from '@/models/News'

/**
 * 获取新闻API
 * 优先从数据库获取，如果数据库未配置或无数据，则使用静态数据
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const date = searchParams.get('date')
  const action = searchParams.get('action')

  try {
    // 尝试连接数据库
    const useDatabase = process.env.MONGODB_URI ? true : false

    if (useDatabase) {
      try {
        await connectDB()
      } catch (error) {
        console.warn('⚠️  数据库连接失败，使用静态数据')
      }
    }

    // 获取可用日期列表
    if (action === 'dates') {
      if (useDatabase && isConnected()) {
        try {
          const dbDates = await DailyNews.getAllDates()
          const staticDates = getAvailableDates()
          // 合并数据库和静态数据的日期，去重
          const allDates = [...new Set([...dbDates, ...staticDates])].sort().reverse()
          return NextResponse.json({ dates: allDates })
        } catch (error) {
          console.error('❌ 从数据库获取日期失败:', error)
        }
      }
      return NextResponse.json({ dates: getAvailableDates() })
    }

    // 获取指定日期或最新的新闻
    let news = null

    // 优先从数据库获取
    if (useDatabase && isConnected()) {
      try {
        if (date) {
          news = await DailyNews.getByDate(date)
        } else {
          const latest = await DailyNews.getLatest(1)
          news = latest[0] || null
        }
      } catch (error) {
        console.error('❌ 从数据库获取新闻失败:', error)
      }
    }

    // 如果数据库没有数据，使用静态数据
    if (!news) {
      news = date ? getNewsByDate(date) : getLatestNews()
    }

    if (!news) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 })
    }

    return NextResponse.json(news)

  } catch (error) {
    console.error('❌ API错误:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

