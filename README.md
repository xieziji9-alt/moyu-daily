# 摸鱼日报 - 每日看简报 📰

一个功能完善、简洁美观的每日新闻简报网站，**完全免费**，自动更新，帮助你快速了解每日资讯。

🌐 **在线访问**: [https://xiezij.com](https://xiezij.com)

---

## ✨ 功能特点

### 🤖 自动化功能（新增！）
- 📡 **RSS新闻聚合** - 自动从多个权威新闻源获取新闻
- ⏰ **定时自动更新** - 每天自动获取和发布新闻
- 🗄️ **数据库存储** - MongoDB持久化存储，支持历史查询
- 🔄 **智能去重** - 自动去除重复新闻
- 🎯 **多样化选择** - 确保新闻覆盖多个领域

### 核心功能
- 📰 **每日新闻简报展示** - 清晰展示每日重要新闻（15条）
- 📅 **日期切换** - 支持查看历史日报，前后翻页
- 🗓️ **农历显示** - 自动显示农历日期和天干地支
- 📊 **新闻统计** - 实时显示当日新闻总数

### 交互功能
- ❤️ **收藏功能** - 收藏感兴趣的新闻，本地存储
- 🔍 **搜索功能** - 快速搜索新闻内容
- 📤 **分享功能** - 支持分享到微博、QQ、QQ空间，复制链接
- 🖨️ **打印功能** - 优化的打印样式，方便保存

### 界面优化
- 🎨 **精美UI设计** - 渐变背景、卡片式布局
- 🌙 **深色模式** - 支持浅色/深色主题切换
- 📱 **响应式设计** - 完美支持移动端和桌面端
- ✨ **动画效果** - 流畅的过渡和加载动画
- 🎯 **加载状态** - 友好的加载提示和错误处理

### 管理功能
- ⚙️ **管理后台** - 可视化新闻添加工具
- 📝 **代码生成** - 自动生成新闻数据代码
- 🔍 **RSS源监控** - 实时检查RSS源状态

---

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **UI库**: React 18
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Hooks

### 后端
- **数据库**: MongoDB Atlas (免费512MB)
- **RSS解析**: rss-parser
- **数据模型**: Mongoose
- **定时任务**: Vercel Cron Jobs

### 部署
- **托管**: Vercel (免费)
- **域名**: xiezij.com
- **CDN**: Vercel Edge Network

---

## 💰 成本分析

| 服务 | 费用 | 说明 |
|------|------|------|
| Vercel托管 | **¥0** | 免费版，100GB带宽/月 |
| MongoDB Atlas | **¥0** | 免费版，512MB存储 |
| RSS新闻源 | **¥0** | 官方免费RSS |
| 域名 | 已有 | xiezij.com |
| **总计** | **¥0/年** | 🎉 完全免费！ |

---

## 📡 新闻来源

所有新闻均来自官方权威RSS源：

- 📰 人民网（时政、国际、财经）
- 📰 新华网（时政）
- 📰 央广网（综合）
- 📰 中国新闻网（综合）

**特点：**
- ✅ 官方权威
- ✅ 实时更新
- ✅ 完全免费
- ✅ 合法合规

## 🚀 快速开始

### 本地开发

```bash
# 1. 克隆项目
git clone https://github.com/你的用户名/moyu-daily.git
cd moyu-daily

# 2. 安装依赖（推荐使用yarn）
yarn install

# 3. 配置环境变量（可选）
cp .env.example .env.local
# 编辑 .env.local，填入MongoDB连接字符串（如果需要）

# 4. 启动开发服务器
yarn dev
```

访问：http://localhost:3000

**注意：** 如果不配置数据库，系统会自动使用静态数据，功能完全正常！

### 部署到生产环境

详细部署指南请查看：[DEPLOYMENT.md](./DEPLOYMENT.md)

**快速部署步骤：**

1. 注册 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)（免费）
2. 注册 [Vercel](https://vercel.com)（免费）
3. 推送代码到GitHub
4. 在Vercel导入项目
5. 配置环境变量
6. 自动部署完成！

---

## 📁 项目结构

```
moyu/
├── app/                          # Next.js App Router
│   ├── admin/                    # 管理后台
│   ├── api/                      # API路由
│   │   ├── cron/                 # 定时任务
│   │   │   └── daily-news/       # 每日新闻更新
│   │   ├── news/                 # 新闻查询
│   │   └── rss-status/           # RSS源状态
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局
│   └── page.tsx                  # 首页
├── components/                   # React组件
│   ├── DateSelector.tsx          # 日期选择器
│   ├── FavoritesModal.tsx        # 收藏弹窗
│   ├── NewsItem.tsx              # 新闻项
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
│   └── News.ts                   # 新闻模型（Mongoose）
├── .env.example                  # 环境变量示例
├── DEPLOYMENT.md                 # 部署指南
├── LOCAL_DEVELOPMENT.md          # 本地开发指南
├── README.md                     # 项目说明（本文件）
├── UPDATE_LOG.md                 # 更新日志
├── next.config.js                # Next.js配置
├── package.json                  # 项目依赖
├── tailwind.config.ts            # Tailwind配置
├── tsconfig.json                 # TypeScript配置
└── vercel.json                   # Vercel配置（定时任务）
```

## 📖 使用指南

### 用户功能

#### 查看新闻
1. 打开网站，默认显示最新日期的新闻
2. 使用日期选择器切换到其他日期
3. 点击"前一天"/"后一天"按钮快速切换

#### 收藏新闻
1. 鼠标悬停在新闻条目上
2. 点击右侧的心形图标收藏
3. 点击顶部"我的收藏"按钮查看所有收藏

#### 搜索新闻
1. 在搜索框中输入关键词
2. 实时过滤显示匹配的新闻
3. 点击 ✕ 清除搜索

#### 分享新闻
1. 点击"分享"按钮
2. 选择分享平台或复制链接
3. 分享给朋友

### 管理员功能

#### 手动添加新闻
1. 访问：`/admin`
2. 选择日期，输入新闻内容（每行一条）
3. 点击"生成代码"
4. 复制生成的代码到 `lib/newsData.ts` 文件中

#### 触发自动更新
访问：`/api/cron/daily-news`

系统会自动从RSS源获取新闻并保存到数据库。

#### 检查RSS源状态
访问：`/api/rss-status`

查看所有RSS源的在线状态。

---

## 🔧 API接口

### 获取新闻
```
GET /api/news?date=2024-10-29
```

### 获取可用日期
```
GET /api/news?action=dates
```

### 手动更新新闻
```
POST /api/cron/daily-news
Content-Type: application/json

{
  "date": "2024-10-29",
  "force": true
}
```

### 检查RSS源状态
```
GET /api/rss-status
```

---

## 🎨 自定义配置

### 修改RSS新闻源

编辑 `lib/rss-fetcher.ts`：

```typescript
export const RSS_SOURCES = [
  {
    name: '你的新闻源',
    url: 'https://example.com/rss.xml',
    category: '分类',
  },
  // 添加更多...
]
```

### 修改定时任务时间

编辑 `vercel.json`：

```json
{
  "crons": [
    {
      "path": "/api/cron/daily-news",
      "schedule": "0 0 * * *"  // 每天UTC 0点 = 北京时间8点
    }
  ]
}
```

Cron表达式说明：
- `0 0 * * *` - 每天0点
- `0 8 * * *` - 每天8点
- `0 */6 * * *` - 每6小时
- `0 0 * * 1` - 每周一0点

### 修改主题颜色

编辑 `tailwind.config.ts`：

```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    },
  },
}
```

---

## 🚀 部署

详细部署指南请查看：**[DEPLOYMENT.md](./DEPLOYMENT.md)**

### 快速部署到Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量（`MONGODB_URI`）
4. 自动部署完成

### 绑定域名

在Vercel项目设置中：
1. Settings → Domains
2. 添加 `xiezij.com`
3. 配置DNS记录
4. 等待生效

---

## 📚 文档

- 📖 [README.md](./README.md) - 项目说明（本文件）
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md) - 详细部署指南
- 💻 [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) - 本地开发指南
- 📝 [UPDATE_LOG.md](./UPDATE_LOG.md) - 更新日志

---

## 🔍 常见问题

### Q: 如何修改新闻来源？
A: 编辑 `lib/rss-fetcher.ts` 中的 `RSS_SOURCES` 数组。

### Q: 定时任务不执行？
A: Vercel免费版的Cron Jobs有限制，可以使用外部定时服务（如cron-job.org）定期访问API。

### Q: 数据库连接失败？
A: 检查 `MONGODB_URI` 环境变量是否正确，IP白名单是否设置为 `0.0.0.0/0`。

### Q: RSS获取失败？
A: 某些RSS源可能不稳定，系统会自动跳过失败的源，使用其他可用源。

### Q: 如何备份数据？
A: 在MongoDB Atlas控制台可以导出数据，或使用 `mongodump` 命令。

---

## 🛣️ 路线图

- [x] 基础新闻展示功能
- [x] 日期切换和历史查询
- [x] 收藏、搜索、分享功能
- [x] 深色模式
- [x] 管理后台
- [x] RSS自动获取
- [x] 数据库存储
- [x] 定时自动更新
- [ ] 用户系统和评论功能
- [ ] 新闻分类和标签
- [ ] 数据统计和分析
- [ ] 移动端APP
- [ ] 微信小程序

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 开源协议

MIT License

---

## 🙏 致谢

感谢以下开源项目和服务：

- [Next.js](https://nextjs.org/) - React框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - 免费数据库
- [Vercel](https://vercel.com/) - 免费托管
- [rss-parser](https://github.com/rbren/rss-parser) - RSS解析
- 人民网、新华网、央广网、中国新闻网 - 新闻源

感谢所有使用和支持本项目的朋友们！

---

## 📞 联系方式

- 网站：https://xiexij.com
- GitHub：[本项目地址]
- 问题反馈：[GitHub Issues]

---

**⭐ 如果这个项目对你有帮助，请给个Star！**

