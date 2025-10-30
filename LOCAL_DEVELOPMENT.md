# 💻 本地开发指南

如何在本地测试和开发摸鱼日报。

---

## 🚀 快速开始

### 1. 安装依赖

```bash
yarn install
```

### 2. 配置环境变量

复制环境变量示例文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
# 可选：如果想测试数据库功能，填入MongoDB连接字符串
MONGODB_URI=mongodb+srv://...

# 可选：定时任务密钥
CRON_SECRET=your-secret-key

# 网站URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**注意：** 如果不配置 `MONGODB_URI`，系统会自动使用静态数据（`lib/newsData.ts`），功能完全正常！

### 3. 启动开发服务器

```bash
yarn dev
```

访问：http://localhost:3000

---

## 🧪 测试功能

### 测试RSS新闻获取

创建测试文件 `test-rss.js`：

```javascript
const { getTodayNews } = require('./lib/rss-fetcher')

async function test() {
  console.log('开始测试RSS获取...')
  const result = await getTodayNews(15)
  console.log('获取到的新闻：')
  result.news.forEach((news, index) => {
    console.log(`${index + 1}. ${news}`)
  })
  console.log('\n新闻源：', result.sources)
}

test()
```

运行：

```bash
node test-rss.js
```

### 测试定时任务API

启动开发服务器后，访问：

```
http://localhost:3000/api/cron/daily-news
```

或使用curl：

```bash
curl http://localhost:3000/api/cron/daily-news
```

### 测试数据库连接

如果配置了MongoDB，访问：

```
http://localhost:3000/api/news?action=dates
```

应该返回数据库中的日期列表。

---

## 📁 项目结构

```
moyu/
├── app/                          # Next.js App Router
│   ├── admin/                    # 管理后台
│   │   └── page.tsx
│   ├── api/                      # API路由
│   │   ├── cron/                 # 定时任务
│   │   │   └── daily-news/
│   │   │       └── route.ts      # 每日新闻更新
│   │   └── news/
│   │       └── route.ts          # 新闻查询API
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 首页
├── components/                   # React组件
│   ├── AdminLink.tsx             # 管理后台链接
│   ├── DateSelector.tsx          # 日期选择器
│   ├── FavoritesModal.tsx        # 收藏弹窗
│   ├── NewsItem.tsx              # 新闻项
│   ├── NewsStats.tsx             # 新闻统计
│   ├── PrintButton.tsx           # 打印按钮
│   ├── SearchBar.tsx             # 搜索栏
│   ├── ShareButton.tsx           # 分享按钮
│   └── ThemeToggle.tsx           # 主题切换
├── lib/                          # 工具库
│   ├── lunar-calendar.ts         # 农历计算
│   ├── mongodb.ts                # 数据库连接
│   ├── newsData.ts               # 静态新闻数据
│   ├── rss-fetcher.ts            # RSS新闻获取
│   └── types.ts                  # TypeScript类型
├── models/                       # 数据模型
│   └── News.ts                   # 新闻模型
├── .env.example                  # 环境变量示例
├── .env.local                    # 本地环境变量（不提交）
├── .gitignore                    # Git忽略文件
├── DEPLOYMENT.md                 # 部署指南
├── LOCAL_DEVELOPMENT.md          # 本地开发指南（本文件）
├── next.config.js                # Next.js配置
├── package.json                  # 项目依赖
├── README.md                     # 项目说明
├── tailwind.config.ts            # Tailwind配置
├── tsconfig.json                 # TypeScript配置
├── UPDATE_LOG.md                 # 更新日志
└── vercel.json                   # Vercel配置
```

---

## 🔧 开发技巧

### 1. 使用静态数据开发

如果不想配置数据库，可以直接编辑 `lib/newsData.ts`：

```typescript
export const newsDatabase: Record<string, DailyNews> = {
  '2025-10-30': {
    date: '2025-10-30',
    // ... 添加你的测试数据
  },
}
```

### 2. 热重载

Next.js支持热重载，修改代码后会自动刷新页面。

### 3. 调试技巧

在代码中添加 `console.log`：

```typescript
console.log('调试信息:', data)
```

在浏览器控制台查看输出。

### 4. TypeScript类型检查

运行类型检查：

```bash
yarn tsc --noEmit
```

### 5. 代码格式化

如果安装了Prettier：

```bash
yarn prettier --write .
```

---

## 🗄️ 数据库开发

### 连接本地MongoDB

如果你想使用本地MongoDB而不是Atlas：

1. 安装MongoDB：https://www.mongodb.com/try/download/community

2. 启动MongoDB：
   ```bash
   mongod
   ```

3. 在 `.env.local` 中设置：
   ```env
   MONGODB_URI=mongodb://localhost:27017/moyu
   ```

### 查看数据库数据

使用MongoDB Compass：
1. 下载：https://www.mongodb.com/try/download/compass
2. 连接到你的数据库
3. 浏览 `daily_news` 集合

或使用命令行：

```bash
mongosh
use moyu
db.daily_news.find()
```

### 清空数据库

```bash
mongosh
use moyu
db.daily_news.deleteMany({})
```

---

## 🧪 添加测试数据

### 方法1：使用管理后台

1. 访问：http://localhost:3000/admin
2. 选择日期
3. 输入新闻内容
4. 点击"生成代码"
5. 复制到 `lib/newsData.ts`

### 方法2：手动调用API

```bash
curl -X POST http://localhost:3000/api/cron/daily-news \
  -H "Content-Type: application/json" \
  -d '{"date": "2024-10-29", "force": true}'
```

### 方法3：直接编辑数据文件

编辑 `lib/newsData.ts`，添加新的日期和新闻。

---

## 📝 修改RSS新闻源

编辑 `lib/rss-fetcher.ts`：

```typescript
export const RSS_SOURCES = [
  {
    name: '你的新闻源名称',
    url: 'https://example.com/rss.xml',
    category: '分类',
  },
  // ... 添加更多
]
```

测试新的RSS源：

```bash
node -e "
const { testRSSSource } = require('./lib/rss-fetcher');
testRSSSource('https://example.com/rss.xml').then(result => {
  console.log('RSS源状态:', result ? '可用' : '不可用');
});
"
```

---

## 🎨 自定义样式

### 修改主题色

编辑 `tailwind.config.ts`：

```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    },
  },
}
```

### 修改全局样式

编辑 `app/globals.css`。

### 修改组件样式

直接编辑组件文件中的Tailwind类名。

---

## 🐛 常见问题

### Q: 端口被占用？

修改端口：

```bash
yarn dev -p 3001
```

### Q: 依赖安装失败？

清除缓存重试：

```bash
yarn cache clean
yarn install
```

### Q: TypeScript报错？

检查 `tsconfig.json` 配置，或临时忽略：

```typescript
// @ts-ignore
```

### Q: RSS获取超时？

增加超时时间，编辑 `lib/rss-fetcher.ts`：

```typescript
const parser = new Parser({
  timeout: 30000, // 30秒
})
```

---

## 📚 学习资源

- **Next.js文档**: https://nextjs.org/docs
- **React文档**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **MongoDB文档**: https://www.mongodb.com/docs
- **TypeScript文档**: https://www.typescriptlang.org/docs

---

## 🚀 准备部署

在部署前：

1. ✅ 测试所有功能
2. ✅ 检查环境变量
3. ✅ 运行类型检查：`yarn tsc --noEmit`
4. ✅ 测试构建：`yarn build`
5. ✅ 提交代码到Git

然后参考 [DEPLOYMENT.md](./DEPLOYMENT.md) 进行部署。

---

**祝开发愉快！🎉**

