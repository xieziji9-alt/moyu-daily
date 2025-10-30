'use client'

import Link from 'next/link'

export default function AdminLink() {
  return (
    <Link
      href="/admin"
      className="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg transition-colors text-sm font-medium flex items-center gap-2 z-30"
      title="管理后台"
    >
      <span>⚙️</span>
      <span>管理</span>
    </Link>
  )
}

