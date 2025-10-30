export interface NewsItem {
  id: number
  content: string
}

export interface DailyNews {
  date: string // YYYY-MM-DD
  year: number
  month: number
  day: number
  weekDay: string
  lunarDate: string
  news: NewsItem[]
}

export interface FavoriteItem {
  id: string
  newsId: number
  content: string
  date: string
  addedAt: number
}

