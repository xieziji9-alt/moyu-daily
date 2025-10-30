import { FavoriteItem } from './types'

const STORAGE_KEY = 'moyu_favorites'

// 获取所有收藏
export function getFavorites(): FavoriteItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Failed to get favorites:', error)
    return []
  }
}

// 添加收藏
export function addFavorite(newsId: number, content: string, date: string): FavoriteItem {
  const favorites = getFavorites()
  const newFavorite: FavoriteItem = {
    id: `${date}-${newsId}-${Date.now()}`,
    newsId,
    content,
    date,
    addedAt: Date.now()
  }
  
  favorites.unshift(newFavorite)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  return newFavorite
}

// 删除收藏
export function removeFavorite(id: string): void {
  const favorites = getFavorites()
  const filtered = favorites.filter(item => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

// 检查是否已收藏
export function isFavorited(newsId: number, date: string): boolean {
  const favorites = getFavorites()
  return favorites.some(item => item.newsId === newsId && item.date === date)
}

// 切换收藏状态
export function toggleFavorite(newsId: number, content: string, date: string): boolean {
  if (isFavorited(newsId, date)) {
    const favorites = getFavorites()
    const item = favorites.find(f => f.newsId === newsId && f.date === date)
    if (item) {
      removeFavorite(item.id)
      return false
    }
  } else {
    addFavorite(newsId, content, date)
    return true
  }
  return false
}

