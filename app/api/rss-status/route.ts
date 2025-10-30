import { NextResponse } from 'next/server'
import { getRSSSourcesStatus } from '@/lib/rss-fetcher'

/**
 * 检查所有RSS源的状态
 * GET /api/rss-status
 */
export async function GET() {
  try {
    console.log('🔍 开始检查RSS源状态...')
    
    const sources = await getRSSSourcesStatus()
    
    const onlineCount = sources.filter(s => s.status === 'online').length
    const offlineCount = sources.filter(s => s.status === 'offline').length
    
    console.log(`✅ 在线: ${onlineCount}, ❌ 离线: ${offlineCount}`)
    
    return NextResponse.json({
      success: true,
      total: sources.length,
      online: onlineCount,
      offline: offlineCount,
      sources,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('❌ 检查RSS源状态失败:', error)
    return NextResponse.json(
      { 
        error: '检查失败', 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

