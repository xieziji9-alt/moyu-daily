# ✅ 部署检查清单

按照这个清单一步步操作，25分钟内完成部署！

---

## 📋 准备阶段（5分钟）

### 账号注册

- [ ] 注册GitHub账号（如果还没有）
  - 访问：https://github.com/signup
  
- [ ] 注册MongoDB Atlas账号
  - 访问：https://www.mongodb.com/cloud/atlas/register
  - 推荐使用GitHub账号登录
  
- [ ] 注册Vercel账号
  - 访问：https://vercel.com/signup
  - 推荐使用GitHub账号登录

---

## 🗄️ MongoDB配置（5分钟）

### 创建数据库集群

- [ ] 登录MongoDB Atlas
- [ ] 点击 "Build a Database"
- [ ] 选择 "FREE" 计划
- [ ] 选择云服务商和区域（推荐：AWS / Singapore）
- [ ] 集群名称：保持默认或改为 `moyu-cluster`
- [ ] 点击 "Create"
- [ ] 等待集群创建完成（约3-5分钟）

### 创建数据库用户

- [ ] 点击左侧 "Database Access"
- [ ] 点击 "Add New Database User"
- [ ] 认证方式：Password
- [ ] 用户名：`moyuuser`（或自定义）
- [ ] 密码：点击 "Autogenerate Secure Password"（记住这个密码！）
- [ ] 权限：Read and write to any database
- [ ] 点击 "Add User"

### 配置网络访问

- [ ] 点击左侧 "Network Access"
- [ ] 点击 "Add IP Address"
- [ ] 选择 "Allow Access from Anywhere"
- [ ] IP地址：`0.0.0.0/0`（自动填充）
- [ ] 点击 "Confirm"

### 获取连接字符串

- [ ] 点击左侧 "Database"
- [ ] 点击你的集群的 "Connect" 按钮
- [ ] 选择 "Connect your application"
- [ ] Driver: Node.js
- [ ] Version: 5.5 or later
- [ ] 复制连接字符串：
  ```
  mongodb+srv://moyuuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```
- [ ] 将 `<password>` 替换为你的实际密码
- [ ] 保存这个连接字符串（稍后需要用到）

---

## 📦 代码推送到GitHub（5分钟）

### 初始化Git仓库

```bash
# 在项目目录下执行
cd d:\code\idea\ideaPrograms\moyu

# 初始化Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "完成摸鱼日报 - 自动化RSS新闻系统"
```

- [ ] 执行上述命令

### 创建GitHub仓库

- [ ] 访问：https://github.com/new
- [ ] 仓库名称：`moyu-daily`
- [ ] 描述：摸鱼日报 - 每日新闻简报
- [ ] 可见性：Public（公开）或 Private（私有）
- [ ] 不要勾选任何初始化选项
- [ ] 点击 "Create repository"

### 推送代码

```bash
# 添加远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/你的用户名/moyu-daily.git

# 推送代码
git branch -M main
git push -u origin main
```

- [ ] 执行上述命令
- [ ] 刷新GitHub页面，确认代码已上传

---

## 🚀 部署到Vercel（5分钟）

### 导入项目

- [ ] 访问：https://vercel.com/new
- [ ] 点击 "Import Git Repository"
- [ ] 选择你的 `moyu-daily` 仓库
- [ ] 点击 "Import"

### 配置项目

- [ ] Framework Preset: Next.js（自动检测）
- [ ] Root Directory: `./`（默认）
- [ ] Build Command: `yarn build`（默认）
- [ ] Output Directory: `.next`（默认）

### 配置环境变量

- [ ] 展开 "Environment Variables" 部分
- [ ] 添加变量：
  
  **变量1：**
  - Name: `MONGODB_URI`
  - Value: 你的MongoDB连接字符串
  - Environment: Production, Preview, Development（全选）
  
  **变量2：**
  - Name: `NEXT_PUBLIC_SITE_URL`
  - Value: `https://xiezij.com`
  - Environment: Production, Preview, Development（全选）
  
  **变量3（可选）：**
  - Name: `CRON_SECRET`
  - Value: 随机字符串（如：`my-secret-key-123`）
  - Environment: Production, Preview, Development（全选）

- [ ] 点击 "Deploy"
- [ ] 等待部署完成（约2-3分钟）

### 验证部署

- [ ] 部署完成后，点击 "Visit" 按钮
- [ ] 应该能看到摸鱼日报首页
- [ ] 记下Vercel分配的域名（如：`moyu-daily.vercel.app`）

---

## 🌐 绑定域名 xiezij.com（10分钟）

### 在Vercel添加域名

- [ ] 在Vercel项目页面，点击 "Settings"
- [ ] 点击左侧 "Domains"
- [ ] 在输入框中输入：`xiezij.com`
- [ ] 点击 "Add"
- [ ] Vercel会显示需要配置的DNS记录

### 配置DNS记录

在你的域名注册商（如阿里云、腾讯云、GoDaddy等）：

**A记录（主域名）：**
- [ ] 类型：A
- [ ] 主机记录：`@`
- [ ] 记录值：`76.76.21.21`
- [ ] TTL：600（或默认）

**CNAME记录（www子域名）：**
- [ ] 类型：CNAME
- [ ] 主机记录：`www`
- [ ] 记录值：`cname.vercel-dns.com`
- [ ] TTL：600（或默认）

### 等待DNS生效

- [ ] 保存DNS配置
- [ ] 等待5-30分钟（通常10分钟内生效）
- [ ] 使用 https://dnschecker.org 检查DNS传播状态
- [ ] 在Vercel的Domains页面，等待域名状态变为 "Valid Configuration"

---

## 🧪 测试功能（5分钟）

### 基础功能测试

- [ ] 访问：https://xiezij.com
- [ ] 能看到摸鱼日报首页
- [ ] 能看到日期和新闻列表
- [ ] 日期切换功能正常
- [ ] 搜索功能正常
- [ ] 收藏功能正常
- [ ] 分享功能正常
- [ ] 深色模式切换正常

### API测试

**测试RSS源状态：**
- [ ] 访问：https://xiezij.com/api/rss-status
- [ ] 应该返回JSON，显示RSS源状态
- [ ] 至少有5个源在线

**测试新闻API：**
- [ ] 访问：https://xiezij.com/api/news?action=dates
- [ ] 应该返回可用日期列表

**手动触发新闻更新：**
- [ ] 访问：https://xiezij.com/api/cron/daily-news
- [ ] 应该返回成功消息
- [ ] 刷新首页，应该能看到新获取的新闻

### 管理后台测试

- [ ] 访问：https://xiezij.com/admin
- [ ] 能看到管理后台界面
- [ ] 可以选择日期
- [ ] 可以输入新闻
- [ ] 可以生成代码

---

## 📊 监控和维护

### 查看Vercel日志

- [ ] 登录Vercel
- [ ] 进入你的项目
- [ ] 点击 "Logs"
- [ ] 可以看到所有请求和定时任务的日志

### 查看MongoDB数据

- [ ] 登录MongoDB Atlas
- [ ] 点击 "Browse Collections"
- [ ] 选择你的数据库
- [ ] 查看 `daily_news` 集合
- [ ] 应该能看到自动保存的新闻数据

### 定时任务验证

- [ ] 在Vercel项目中，点击 "Settings" → "Crons"
- [ ] 应该能看到配置的定时任务：
  - Path: `/api/cron/daily-news`
  - Schedule: `0 8 * * *`（每天8点UTC = 北京时间16点）
- [ ] 等待第二天，检查是否自动更新了新闻

---

## ✅ 完成检查

### 功能完整性

- [ ] ✅ 网站可以正常访问
- [ ] ✅ 所有用户功能正常
- [ ] ✅ RSS新闻源在线
- [ ] ✅ 数据库连接正常
- [ ] ✅ 定时任务配置正确
- [ ] ✅ 域名绑定成功

### 文档完整性

- [ ] ✅ README.md 已更新
- [ ] ✅ DEPLOYMENT.md 已创建
- [ ] ✅ LOCAL_DEVELOPMENT.md 已创建
- [ ] ✅ UPDATE_LOG.md 已创建
- [ ] ✅ SETUP_COMPLETE.md 已创建
- [ ] ✅ CHECKLIST.md 已创建（本文件）

---

## 🎉 恭喜完成！

如果所有项目都已勾选，说明你的摸鱼日报网站已经成功部署并运行！

### 下一步

1. **分享给朋友**：让更多人使用你的网站
2. **监控运行**：定期查看日志和数据
3. **持续优化**：根据使用情况改进功能
4. **学习提升**：研究代码，学习新技术

---

## 📞 需要帮助？

如果遇到问题：

1. 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 的常见问题部分
2. 查看Vercel日志
3. 查看MongoDB Atlas日志
4. 检查环境变量配置
5. 确认DNS配置正确

---

## 📚 相关资源

- 📖 [项目说明](./README.md)
- 🚀 [部署指南](./DEPLOYMENT.md)
- 💻 [开发指南](./LOCAL_DEVELOPMENT.md)
- 📝 [更新日志](./UPDATE_LOG.md)
- 🎉 [完成总结](./SETUP_COMPLETE.md)

---

**祝你部署顺利！🚀**

记得给项目一个Star！⭐

