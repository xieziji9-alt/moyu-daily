'use client'

export default function PrintButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
      title="打印"
    >
      <span>🖨️</span>
      <span>打印</span>
    </button>
  )
}

