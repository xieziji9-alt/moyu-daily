'use client'

import { useState, useEffect } from 'react'
import { getFavorites, removeFavorite } from '@/lib/favorites'
import { FavoriteItem } from '@/lib/types'

interface FavoritesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  useEffect(() => {
    if (isOpen) {
      setFavorites(getFavorites())
    }
  }, [isOpen])

  const handleRemove = (id: string) => {
    removeFavorite(id)
    setFavorites(getFavorites())
  }

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-')
    return `${year}年${parseInt(month)}月${parseInt(day)}日`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold dark:text-white">我的收藏 ❤️</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <p className="text-4xl mb-2">📭</p>
              <p>还没有收藏任何内容</p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-2">
                        {item.content}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(item.date)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="flex-shrink-0 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                      title="删除收藏"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

