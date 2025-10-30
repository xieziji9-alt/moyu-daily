'use client'

import { useState } from 'react'
import { getLunarDate } from '@/lib/lunar'

export default function AdminPage() {
  const [date, setDate] = useState('')
  const [newsContent, setNewsContent] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')

  const handleGenerate = () => {
    if (!date || !newsContent) {
      alert('请填写日期和新闻内容')
      return
    }

    const newsLines = newsContent.trim().split('\n').filter(line => line.trim())
    const newsItems = newsLines.map((line, index) => {
      // 移除开头的数字和顿号
      const content = line.replace(/^\d+[、.]?\s*/, '').trim()
      return { id: index + 1, content }
    })

    const [year, month, day] = date.split('-').map(Number)
    const dateObj = new Date(year, month - 1, day)
    const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const weekDay = weekDays[dateObj.getDay()]
    const lunarDate = getLunarDate(dateObj)

    const code = `  '${date}': {
    date: '${date}',
    year: ${year},
    month: ${month},
    day: ${day},
    weekDay: '${weekDay}',
    lunarDate: '${lunarDate}',
    news: [
${newsItems.map(item => `      { id: ${item.id}, content: '${item.content}' },`).join('\n')}
    ]
  },`

    setGeneratedCode(code)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode)
    alert('已复制到剪贴板！')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">📝 新闻管理后台</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                日期
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                新闻内容（每行一条，可以带序号）
              </label>
              <textarea
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
                rows={15}
                placeholder="1、第一条新闻内容&#10;2、第二条新闻内容&#10;3、第三条新闻内容"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              生成代码
            </button>
          </div>
        </div>

        {generatedCode && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">生成的代码</h2>
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                📋 复制代码
              </button>
            </div>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm font-mono whitespace-pre">{generatedCode}</pre>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>使用说明：</strong>
              </p>
              <ol className="text-sm text-blue-700 mt-2 space-y-1 list-decimal list-inside">
                <li>复制上面生成的代码</li>
                <li>打开 <code className="bg-blue-100 px-1 rounded">lib/newsData.ts</code> 文件</li>
                <li>在 <code className="bg-blue-100 px-1 rounded">newsDatabase</code> 对象中添加这段代码</li>
                <li>保存文件，页面会自动刷新</li>
              </ol>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            ← 返回首页
          </a>
        </div>
      </div>
    </div>
  )
}

