'use client'

import { useState, useEffect } from 'react'

interface DateSelectorProps {
  currentDate: string
  onDateChange: (date: string) => void
}

export default function DateSelector({ currentDate, onDateChange }: DateSelectorProps) {
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 获取可用日期列表
    fetch('/api/news?action=dates')
      .then(res => res.json())
      .then(data => setAvailableDates(data.dates))
      .catch(err => console.error('Failed to fetch dates:', err))
  }, [])

  const formatDisplayDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-')
    return `${year}年${parseInt(month)}月${parseInt(day)}日`
  }

  const handleDateSelect = (date: string) => {
    onDateChange(date)
    setIsOpen(false)
  }

  const currentIndex = availableDates.indexOf(currentDate)
  const hasPrev = currentIndex < availableDates.length - 1
  const hasNext = currentIndex > 0

  const goToPrev = () => {
    if (hasPrev) {
      onDateChange(availableDates[currentIndex + 1])
    }
  }

  const goToNext = () => {
    if (hasNext) {
      onDateChange(availableDates[currentIndex - 1])
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      <button
        onClick={goToPrev}
        disabled={!hasPrev}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          hasPrev
            ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
        }`}
        title="前一天"
      >
        ← 前一天
      </button>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-1 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          📅 {formatDisplayDate(currentDate)}
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
              {availableDates.map(date => (
                <button
                  key={date}
                  onClick={() => handleDateSelect(date)}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    date === currentDate ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {formatDisplayDate(date)}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <button
        onClick={goToNext}
        disabled={!hasNext}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          hasNext
            ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
        }`}
        title="后一天"
      >
        后一天 →
      </button>
    </div>
  )
}

