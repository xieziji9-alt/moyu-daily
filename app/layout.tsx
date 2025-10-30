import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '每日看简报 - 摸鱼日报',
  description: '每天了解最新资讯，轻松摸鱼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

