/**
 * 农历日期计算工具
 * 简化版本，用于显示农历日期
 */

// 天干
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// 地支
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 生肖
const ZODIAC_ANIMALS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

// 农历月份
const LUNAR_MONTHS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月']

// 农历日期
const LUNAR_DAYS = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
]

/**
 * 获取天干地支年份
 */
export function getGanZhiYear(year: number): string {
  const ganIndex = (year - 4) % 10
  const zhiIndex = (year - 4) % 12
  return HEAVENLY_STEMS[ganIndex] + EARTHLY_BRANCHES[zhiIndex]
}

/**
 * 获取生肖
 */
export function getZodiacAnimal(year: number): string {
  const index = (year - 4) % 12
  return ZODIAC_ANIMALS[index]
}

/**
 * 简化的农历日期计算
 * 注意：这是一个简化版本，实际农历计算非常复杂
 * 建议使用专业的农历库如 lunar-javascript
 */
export function getLunarDate(date: Date): {
  year: number
  month: number
  day: number
  monthName: string
  dayName: string
  ganZhi: string
  zodiac: string
  fullDate: string
} {
  const year = date.getFullYear()
  const ganZhi = getGanZhiYear(year)
  const zodiac = getZodiacAnimal(year)
  
  // 简化计算：使用公历日期估算农历日期
  // 实际应用中应该使用专业的农历转换库
  const dayOfYear = Math.floor((date.getTime() - new Date(year, 0, 0).getTime()) / 86400000)
  const estimatedMonth = Math.floor(dayOfYear / 30) % 12
  const estimatedDay = (dayOfYear % 30) + 1
  
  const monthName = LUNAR_MONTHS[estimatedMonth]
  const dayName = LUNAR_DAYS[Math.min(estimatedDay - 1, 29)]
  
  const fullDate = `农历${monthName}${dayName} ${ganZhi}年 【${zodiac}年】`
  
  return {
    year,
    month: estimatedMonth + 1,
    day: estimatedDay,
    monthName,
    dayName,
    ganZhi,
    zodiac,
    fullDate,
  }
}

/**
 * 获取星期几（中文）
 */
export function getWeekDay(date: Date): string {
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return days[date.getDay()]
}

/**
 * 格式化日期为 YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 获取完整的日期信息（用于新闻数据）
 */
export function getFullDateInfo(date: Date) {
  const dateStr = formatDate(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekDay = getWeekDay(date)
  const lunar = getLunarDate(date)
  
  return {
    date: dateStr,
    year,
    month,
    day,
    weekDay,
    lunarDate: lunar.fullDate,
  }
}

/**
 * 获取昨天的日期
 */
export function getYesterday(date: Date = new Date()): Date {
  const yesterday = new Date(date)
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday
}

/**
 * 获取明天的日期
 */
export function getTomorrow(date: Date = new Date()): Date {
  const tomorrow = new Date(date)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

/**
 * 解析日期字符串 YYYY-MM-DD
 */
export function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

