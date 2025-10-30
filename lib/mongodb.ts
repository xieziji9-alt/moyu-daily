import mongoose from 'mongoose'

// MongoDB连接字符串（从环境变量读取）
const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  console.warn('⚠️  请在 .env.local 文件中设置 MONGODB_URI')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// 使用全局变量缓存连接，避免在开发环境中重复连接
declare global {
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
}

if (!global.mongoose) {
  global.mongoose = cached
}

/**
 * 连接到MongoDB数据库
 * 使用连接池和缓存机制，提高性能
 */
async function connectDB(): Promise<typeof mongoose> {
  // 如果已经有连接，直接返回
  if (cached.conn) {
    return cached.conn
  }

  // 如果没有URI，返回空连接（开发模式下使用静态数据）
  if (!MONGODB_URI) {
    console.log('📦 使用静态数据模式（未配置数据库）')
    // 返回一个模拟的mongoose对象
    return mongoose
  }

  // 如果正在连接中，等待连接完成
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 10000,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB 连接成功')
      return mongoose
    }).catch((error) => {
      console.error('❌ MongoDB 连接失败:', error)
      cached.promise = null
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

/**
 * 断开数据库连接
 */
export async function disconnectDB(): Promise<void> {
  if (cached.conn) {
    await cached.conn.disconnect()
    cached.conn = null
    cached.promise = null
    console.log('🔌 MongoDB 已断开连接')
  }
}

/**
 * 检查数据库连接状态
 */
export function isConnected(): boolean {
  return cached.conn !== null && mongoose.connection.readyState === 1
}

export default connectDB

