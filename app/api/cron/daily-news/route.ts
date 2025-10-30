import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import DailyNews from '@/models/News'
import { getTodayNews } from '@/lib/rss-fetcher'
import { getFullDateInfo, getYesterday, formatDate } from '@/lib/lunar-calendar'

/**
 * 定时任务：每日自动获取新闻
 * 
 * 使用方式：
 * 1. Vercel Cron Jobs: 在 vercel.json 中配置
 * 2. 手动触发: GET /api/cron/daily-news
 * 3. 带验证: GET /api/cron/daily-news?token=YOUR_SECRET_TOKEN
 */
export async function GET(request: NextRequest) {
  try {
    // 验证请求（可选，用于安全性）
    const authHeader = request.headers.get('authorization')
    const token = request.nextUrl.searchParams.get('token')
    const cronSecret = process.env.CRON_SECRET
    
    // 如果设置了密钥，则验证
    if (cronSecret) {
      const isValid = 
        authHeader === `Bearer ${cronSecret}` || 
        token === cronSecret
      
      if (!isValid) {
        return NextResponse.json(
          { error: '未授权访问' },
          { status: 401 }
        )
      }
    }
    
    console.log('🚀 开始执行每日新闻更新任务...')
    
    // 连接数据库
    await connectDB()
    
    // 获取昨天的日期（新闻通常是前一天的）
    const yesterday = getYesterday()
    const dateInfo = getFullDateInfo(yesterday)
    const dateStr = formatDate(yesterday)
    
    console.log(`📅 准备获取 ${dateStr} 的新闻`)
    
    // 检查是否已存在该日期的新闻
    const existingNews = await DailyNews.findOne({ date: dateStr })
    
    if (existingNews) {
      console.log(`ℹ️  ${dateStr} 的新闻已存在，跳过`)
      return NextResponse.json({
        success: true,
        message: '该日期的新闻已存在',
        date: dateStr,
        existing: true,
      })
    }
    
    // 获取RSS新闻
    const { news, sources } = await getTodayNews(15)
    
    if (news.length === 0) {
      console.error('❌ 未能获取到任何新闻')
      return NextResponse.json(
        { error: '未能获取到新闻' },
        { status: 500 }
      )
    }
    
    console.log(`✅ 成功获取 ${news.length} 条新闻`)
    
    // 格式化新闻数据
    const newsItems = news.map((content, index) => ({
      id: index + 1,
      content,
      source: sources.join(', '),
    }))
    
    // 保存到数据库
    const dailyNews = new DailyNews({
      date: dateStr,
      year: dateInfo.year,
      month: dateInfo.month,
      day: dateInfo.day,
      weekDay: dateInfo.weekDay,
      lunarDate: dateInfo.lunarDate,
      news: newsItems,
    })
    
    await dailyNews.save()
    
    console.log(`✅ ${dateStr} 的新闻已保存到数据库`)
    
    return NextResponse.json({
      success: true,
      message: '新闻更新成功',
      date: dateStr,
      newsCount: news.length,
      sources: sources,
      data: dailyNews,
    })
    
  } catch (error) {
    console.error('❌ 每日新闻更新失败:', error)
    return NextResponse.json(
      { 
        error: '新闻更新失败', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

/**
 * POST 方法：手动指定日期更新新闻
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { date, force = false } = body
    
    if (!date) {
      return NextResponse.json(
        { error: '请提供日期参数' },
        { status: 400 }
      )
    }
    
    console.log(`🚀 手动更新 ${date} 的新闻...`)
    
    // 连接数据库
    await connectDB()
    
    // 检查是否已存在
    const existingNews = await DailyNews.findOne({ date })
    
    if (existingNews && !force) {
      return NextResponse.json({
        success: false,
        message: '该日期的新闻已存在，使用 force=true 强制更新',
        date,
        existing: true,
      })
    }
    
    // 获取新闻
    const { news, sources } = await getTodayNews(15)
    
    if (news.length === 0) {
      return NextResponse.json(
        { error: '未能获取到新闻' },
        { status: 500 }
      )
    }
    
    // 解析日期
    const [year, month, day] = date.split('-').map(Number)
    const dateObj = new Date(year, month - 1, day)
    const dateInfo = getFullDateInfo(dateObj)
    
    // 格式化新闻
    const newsItems = news.map((content, index) => ({
      id: index + 1,
      content,
      source: sources.join(', '),
    }))
    
    // 更新或创建
    if (existingNews && force) {
      existingNews.news = newsItems
      existingNews.lunarDate = dateInfo.lunarDate
      await existingNews.save()
      console.log(`✅ ${date} 的新闻已更新`)
    } else {
      const dailyNews = new DailyNews({
        date,
        year: dateInfo.year,
        month: dateInfo.month,
        day: dateInfo.day,
        weekDay: dateInfo.weekDay,
        lunarDate: dateInfo.lunarDate,
        news: newsItems,
      })
      await dailyNews.save()
      console.log(`✅ ${date} 的新闻已创建`)
    }
    
    return NextResponse.json({
      success: true,
      message: force ? '新闻更新成功' : '新闻创建成功',
      date,
      newsCount: news.length,
      sources,
    })
    
  } catch (error) {
    console.error('❌ 手动更新失败:', error)
    return NextResponse.json(
      { 
        error: '更新失败', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

