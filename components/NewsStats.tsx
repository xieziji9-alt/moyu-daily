'use client'

interface NewsStatsProps {
  totalNews: number
}

export default function NewsStats({ totalNews }: NewsStatsProps) {
  return (
    <div className="flex justify-center gap-6 mb-6 text-sm">
      <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
        <span className="text-blue-600 dark:text-blue-400 font-semibold">📊</span>
        <span className="text-gray-600 dark:text-gray-400">今日新闻：</span>
        <span className="text-blue-600 dark:text-blue-400 font-bold">{totalNews}</span>
        <span className="text-gray-600 dark:text-gray-400">条</span>
      </div>
    </div>
  )
}

