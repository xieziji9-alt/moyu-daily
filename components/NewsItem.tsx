'use client'

import { useState, useEffect } from 'react'
import { isFavorited, toggleFavorite } from '@/lib/favorites'

interface NewsItemProps {
  id: number
  content: string
  date: string
}

export default function NewsItem({ id, content, date }: NewsItemProps) {
  const [favorited, setFavorited] = useState(false)

  useEffect(() => {
    setFavorited(isFavorited(id, date))
  }, [id, date])

  const handleToggleFavorite = () => {
    const newState = toggleFavorite(id, content, date)
    setFavorited(newState)
  }

  return (
    <div className="flex gap-3 text-gray-800 dark:text-gray-200 leading-relaxed group hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
      <span className="font-semibold flex-shrink-0">{id}、</span>
      <p className="flex-1">{content}</p>
      <button
        onClick={handleToggleFavorite}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        title={favorited ? '取消收藏' : '收藏'}
      >
        {favorited ? (
          <span className="text-red-500 text-xl">❤️</span>
        ) : (
          <span className="text-gray-400 hover:text-red-500 text-xl">🤍</span>
        )}
      </button>
    </div>
  )
}

