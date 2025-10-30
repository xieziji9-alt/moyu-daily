'use client'

import { useState } from 'react'

interface ShareButtonProps {
  date: string
}

export default function ShareButton({ date }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `每日看简报 - ${date}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShareWeibo = () => {
    const url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleShareQQ = () => {
    const url = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const handleShareQzone = () => {
    const url = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
      >
        <span>📤</span>
        <span>分享</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full mb-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-2 min-w-[160px]">
            <button
              onClick={handleCopyLink}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
            >
              <span>🔗</span>
              <span>{copied ? '已复制!' : '复制链接'}</span>
            </button>
            <button
              onClick={handleShareWeibo}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
            >
              <span>🔴</span>
              <span>分享到微博</span>
            </button>
            <button
              onClick={handleShareQQ}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
            >
              <span>🐧</span>
              <span>分享到QQ</span>
            </button>
            <button
              onClick={handleShareQzone}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
            >
              <span>⭐</span>
              <span>分享到QQ空间</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

