// 简化的农历转换（实际项目中建议使用专业的农历库）
const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月']
const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']

const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 获取生肖
export function getZodiac(year: number): string {
  return zodiacAnimals[(year - 4) % 12]
}

// 获取天干地支年
export function getGanZhiYear(year: number): string {
  const stemIndex = (year - 4) % 10
  const branchIndex = (year - 4) % 12
  return heavenlyStems[stemIndex] + earthlyBranches[branchIndex]
}

// 简化的农历日期生成（仅用于演示）
export function getLunarDate(date: Date): string {
  // 这里使用简化算法，实际项目建议使用 lunar-javascript 等专业库
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  
  // 简单映射（实际应该用准确的农历转换算法）
  const lunarMonth = lunarMonths[month]
  const lunarDay = lunarDays[Math.min(day - 1, 29)]
  const ganZhiYear = getGanZhiYear(year)
  const zodiac = getZodiac(year)
  
  // 简化的月份和日期天干地支
  const monthStem = heavenlyStems[(month + 2) % 10]
  const monthBranch = earthlyBranches[(month + 2) % 12]
  const dayStem = heavenlyStems[(day - 1) % 10]
  const dayBranch = earthlyBranches[(day - 1) % 12]
  
  return `农历${lunarMonth}${lunarDay} ${ganZhiYear}年 【${zodiac}年】 ${monthStem}${monthBranch}月 ${dayStem}${dayBranch}日`
}

