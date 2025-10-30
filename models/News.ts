import mongoose, { Schema, Model } from 'mongoose'

// 单条新闻接口
export interface INewsItem {
  id: number
  content: string
  source?: string // 新闻来源
  link?: string // 原文链接
}

// 每日新闻接口
export interface IDailyNews {
  date: string // YYYY-MM-DD
  year: number
  month: number
  day: number
  weekDay: string
  lunarDate: string
  news: INewsItem[]
  createdAt?: Date
  updatedAt?: Date
}

// Mongoose Schema
const NewsItemSchema = new Schema<INewsItem>({
  id: { type: Number, required: true },
  content: { type: String, required: true },
  source: { type: String },
  link: { type: String },
}, { _id: false })

const DailyNewsSchema = new Schema<IDailyNews>({
  date: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
  weekDay: { type: String, required: true },
  lunarDate: { type: String, required: true },
  news: { type: [NewsItemSchema], required: true },
}, {
  timestamps: true, // 自动添加 createdAt 和 updatedAt
  collection: 'daily_news' // 集合名称
})

// 创建索引
DailyNewsSchema.index({ date: -1 }) // 按日期降序
DailyNewsSchema.index({ year: -1, month: -1, day: -1 }) // 复合索引

// 静态方法：获取指定日期的新闻
DailyNewsSchema.statics.getByDate = async function(date: string) {
  return this.findOne({ date }).lean()
}

// 静态方法：获取日期范围内的新闻
DailyNewsSchema.statics.getByDateRange = async function(startDate: string, endDate: string) {
  return this.find({
    date: { $gte: startDate, $lte: endDate }
  }).sort({ date: -1 }).lean()
}

// 静态方法：获取所有可用日期
DailyNewsSchema.statics.getAllDates = async function() {
  const results = await this.find({}, { date: 1, _id: 0 }).sort({ date: -1 }).lean()
  return results.map((r: any) => r.date)
}

// 静态方法：获取最新的N条新闻
DailyNewsSchema.statics.getLatest = async function(limit: number = 10) {
  return this.find({}).sort({ date: -1 }).limit(limit).lean()
}

// 实例方法：添加新闻项
DailyNewsSchema.methods.addNewsItem = function(newsItem: INewsItem) {
  this.news.push(newsItem)
  return this.save()
}

// 实例方法：更新新闻项
DailyNewsSchema.methods.updateNewsItem = function(id: number, content: string) {
  const item = this.news.find((n: any) => n.id === id)
  if (item) {
    item.content = content
    return this.save()
  }
  return null
}

// 实例方法：删除新闻项
DailyNewsSchema.methods.deleteNewsItem = function(id: number) {
  this.news = this.news.filter((n: any) => n.id !== id)
  return this.save()
}

// 定义模型接口
interface IDailyNewsModel extends Model<IDailyNews> {
  getByDate(date: string): Promise<IDailyNews | null>
  getByDateRange(startDate: string, endDate: string): Promise<IDailyNews[]>
  getAllDates(): Promise<string[]>
  getLatest(limit?: number): Promise<IDailyNews[]>
}

// 导出模型（避免重复编译）
const DailyNews = (mongoose.models.DailyNews as IDailyNewsModel) || 
  mongoose.model<IDailyNews, IDailyNewsModel>('DailyNews', DailyNewsSchema)

export default DailyNews

