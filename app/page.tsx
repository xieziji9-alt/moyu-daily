'use client'

import { useState, useEffect } from 'react'
import DateSelector from '@/components/DateSelector'
import NewsItem from '@/components/NewsItem'
import FavoritesModal from '@/components/FavoritesModal'
import NewsStats from '@/components/NewsStats'
import SearchBar from '@/components/SearchBar'
import MoyuTips from '@/components/MoyuTips'
import { DailyNews } from '@/lib/types'

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('')
  const [newsData, setNewsData] = useState<DailyNews | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // 获取今天的日期字符串
  const getTodayString = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // 加载新闻数据
  const loadNews = async (date: string) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/news?date=${date}`)
      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }
      const data = await response.json()
      setNewsData(data)
    } catch (err) {
      setError('加载失败，请稍后重试')
      console.error('Failed to load news:', err)
    } finally {
      setLoading(false)
    }
  }

  // 初始化
  useEffect(() => {
    const today = getTodayString()
    setSelectedDate(today)
    loadNews(today)
  }, [])

  // 日期改变时重新加载
  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    loadNews(date)
  }

  const formatDisplayDate = () => {
    if (!newsData) return ''
    return `${newsData.year}年${newsData.month}月${newsData.day}日`
  }

  // 过滤新闻
  const filteredNews = newsData?.news.filter(item =>
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 标题 */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 dark:text-white">
            每日<span className="text-red-600 dark:text-red-400">看简报</span>
            <span className="text-3xl ml-2">📰</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">阿兕Cherry</p>
        </div>

        {/* 日期选择器 */}
        {selectedDate && (
          <DateSelector
            currentDate={selectedDate}
            onDateChange={handleDateChange}
          />
        )}

        {/* 加载状态 */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 dark:border-t-blue-400"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">加载中...</p>
          </div>
        )}

        {/* 错误状态 */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* 新闻内容 */}
        {!loading && !error && newsData && (
          <div className="animate-fade-in">
            {/* 日期信息 */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-6 text-center border border-gray-100 dark:border-gray-700">
              <div className="text-xl font-semibold mb-1 dark:text-white">
                「{formatDisplayDate()} {newsData.weekDay}」
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{newsData.lunarDate}</div>
            </div>

            {/* 统计信息 */}
            <NewsStats totalNews={newsData.news.length} />

            {/* 新闻列表 */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-100 dark:border-gray-700">
              {filteredNews.length === 0 ? (
                <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                  <p className="text-3xl mb-2">🔍</p>
                  <p>没有找到匹配的新闻</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNews.map((item) => (
                    <NewsItem
                      key={item.id}
                      id={item.id}
                      content={item.content}
                      date={selectedDate}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 底部装饰 */}
            <div className="mt-8 text-center text-gray-400 dark:text-gray-500 text-sm">
              <p>每日资讯，轻松摸鱼 🐟</p>
            </div>
          </div>
        )}
      </div>

      {/* 收藏弹窗 */}
      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
      />

      {/* 摸鱼提示 */}
      <MoyuTips />
    </div>
  )
}

