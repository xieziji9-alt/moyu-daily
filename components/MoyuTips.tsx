'use client'

import { useState, useEffect } from 'react'

interface CountdownItem {
  name: string
  days: number
  icon: string
}

export default function MoyuTips() {
  const [isOpen, setIsOpen] = useState(false)
  const [countdowns, setCountdowns] = useState<CountdownItem[]>([])
  const [currentDate, setCurrentDate] = useState('')

  // 计算距离某个日期的天数
  const getDaysUntil = (targetDate: Date): number => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    targetDate.setHours(0, 0, 0, 0)
    const diff = targetDate.getTime() - today.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  // 获取本月的发薪日列表
  const getPaydays = (): CountdownItem[] => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const currentDay = today.getDate()
    
    const paydays = [5, 10, 15, 20, 25, 30]
    const result: CountdownItem[] = []
    
    paydays.forEach(day => {
      let targetDate = new Date(year, month, day)
      
      // 如果这个月没有这一天（比如2月30日），跳过
      if (targetDate.getMonth() !== month) {
        return
      }
      
      // 如果日期已过，计算下个月的
      if (day < currentDay) {
        targetDate = new Date(year, month + 1, day)
        // 如果下个月也没有这一天，跳过
        if (targetDate.getMonth() !== (month + 1) % 12) {
          return
        }
      }
      
      const days = getDaysUntil(targetDate)
      if (days >= 0) {
        result.push({
          name: `领工资（${day}号）`,
          days,
          icon: '💰'
        })
      }
    })
    
    return result
  }

  // 获取周末倒计时
  const getWeekendCountdown = (): CountdownItem[] => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    
    const result: CountdownItem[] = []
    
    // 周六
    const daysUntilSaturday = dayOfWeek === 0 ? 6 : (6 - dayOfWeek)
    if (daysUntilSaturday >= 0) {
      result.push({
        name: '周六',
        days: daysUntilSaturday,
        icon: '🎮'
      })
    }
    
    // 周日
    const daysUntilSunday = dayOfWeek === 0 ? 0 : (7 - dayOfWeek)
    if (daysUntilSunday >= 0) {
      result.push({
        name: '周日',
        days: daysUntilSunday,
        icon: '🛌'
      })
    }
    
    return result
  }

  // 获取节假日倒计时
  const getHolidayCountdown = (): CountdownItem[] => {
    const today = new Date()
    const year = today.getFullYear()
    
    // 2025年节假日（需要根据实际年份调整）
    const holidays = [
      { name: '元旦节', date: new Date(year + 1, 0, 1), icon: '🎊' },
      { name: '春节', date: new Date(year + 1, 0, 29), icon: '🧨' }, // 2025年春节是1月29日
      { name: '清明节', date: new Date(year + 1, 3, 4), icon: '🌸' },
      { name: '劳动节', date: new Date(year + 1, 4, 1), icon: '⚒️' },
      { name: '端午节', date: new Date(year + 1, 5, 31), icon: '🥟' }, // 2025年端午节是5月31日
      { name: '中秋节', date: new Date(year + 1, 9, 6), icon: '🥮' }, // 2025年中秋节是10月6日
      { name: '国庆节', date: new Date(year + 1, 9, 1), icon: '🇨🇳' },
    ]
    
    return holidays
      .map(holiday => ({
        name: holiday.name,
        days: getDaysUntil(holiday.date),
        icon: holiday.icon
      }))
      .filter(item => item.days > 0)
      .sort((a, b) => a.days - b.days)
  }

  // 获取星期几的中文
  const getWeekDayName = (): string => {
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return days[new Date().getDay()]
  }

  // 初始化数据
  useEffect(() => {
    const today = new Date()
    const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`
    setCurrentDate(dateStr)
    
    const paydays = getPaydays()
    const weekends = getWeekendCountdown()
    const holidays = getHolidayCountdown()
    
    setCountdowns([...paydays, ...weekends, ...holidays])
  }, [])

  return (
    <>
      {/* 触发按钮 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-40 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
        title="摸鱼提示"
      >
        <span className="text-2xl">🐟</span>
      </button>

      {/* 弹窗 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* 标题 */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span>🐟</span>
                    <span>【摸鱼办】温馨提示</span>
                  </h2>
                  <p className="text-sm mt-2 opacity-90">B站：阿兕Cherry</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white text-3xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* 内容 */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* 日期 */}
              <div className="text-center mb-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  「{currentDate} {getWeekDayName()}」
                </p>
              </div>

              {/* 摸鱼宣言 */}
              <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 rounded-lg border-l-4 border-orange-400">
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  上午好！摸鱼人！摸鱼才是自己赚的钱，努力工作得到的是报酬！有事儿没事儿起身走走，别总在工位上坐着，钱是老板的，但健康是自己的。
                </p>
              </div>

              {/* 倒计时列表 */}
              <div className="space-y-3">
                {countdowns.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        距离【{item.name}】还有：
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {item.days < 10 ? `0${item.days}` : item.days}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-1">天</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部提示 */}
              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>💡 摸鱼使我快乐，快乐使我健康</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

