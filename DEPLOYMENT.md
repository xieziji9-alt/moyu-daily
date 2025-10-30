# 🚀 部署指南 - 摸鱼日报

完全免费的部署方案，0成本运行！

---

## 📋 准备工作

### 1. 注册免费服务

#### MongoDB Atlas（免费数据库）
1. 访问：https://www.mongodb.com/cloud/atlas/register
2. 使用GitHub账号登录（推荐）
3. 创建免费集群（Free Tier - 512MB）
4. 选择离你最近的区域（如：AWS / Singapore）
5. 等待集群创建完成（约3-5分钟）

#### Vercel（免费托管）
1. 访问：https://vercel.com
2. 使用GitHub账号登录
3. 无需其他操作，稍后导入项目

---

## 🗄️ 配置MongoDB数据库

### 步骤1：创建数据库用户

1. 在MongoDB Atlas控制台，点击左侧 **Database Access**
2. 点击 **Add New Database User**
3. 选择 **Password** 认证方式
4. 设置用户名和密码（记住这些信息！）
5. 权限选择：**Read and write to any database**
6. 点击 **Add User**

### 步骤2：配置网络访问

1. 点击左侧 **Network Access**
2. 点击 **Add IP Address**
3. 选择 **Allow Access from Anywhere**（0.0.0.0/0）
4. 点击 **Confirm**

### 步骤3：获取连接字符串

1. 点击左侧 **Database**
2. 点击你的集群的 **Connect** 按钮
3. 选择 **Connect your application**
4. 复制连接字符串，格式如下：
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. 将 `<username>` 和 `<password>` 替换为你刚才创建的用户名和密码

**示例：**
```
mongodb+srv://moyuuser:MyPassword123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

---

## 🌐 部署到Vercel

### 方法1：通过GitHub（推荐）

#### 步骤1：推送代码到GitHub

```bash
# 初始化Git仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 摸鱼日报"

# 创建GitHub仓库后，添加远程仓库
git remote add origin https://github.com/你的用户名/moyu-daily.git

# 推送代码
git push -u origin main
```

#### 步骤2：在Vercel导入项目

1. 访问：https://vercel.com/new
2. 选择 **Import Git Repository**
3. 选择你刚才创建的GitHub仓库
4. 点击 **Import**

#### 步骤3：配置环境变量

在Vercel项目设置中：

1. 点击 **Settings** → **Environment Variables**
2. 添加以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `MONGODB_URI` | 你的MongoDB连接字符串 | 必需 |
| `CRON_SECRET` | 随机字符串（可选） | 保护定时任务 |
| `NEXT_PUBLIC_SITE_URL` | `https://xiezij.com` | 你的域名 |

3. 点击 **Save**

#### 步骤4：重新部署

1. 点击 **Deployments**
2. 点击最新部署右侧的 **...** 菜单
3. 选择 **Redeploy**
4. 等待部署完成

---

## 🌍 绑定自定义域名

### 在Vercel绑定 xiezij.com

1. 在Vercel项目中，点击 **Settings** → **Domains**
2. 输入 `xiezij.com`
3. 点击 **Add**
4. Vercel会显示需要配置的DNS记录

### 在域名注册商配置DNS

根据Vercel的提示，在你的域名注册商（如阿里云、腾讯云、GoDaddy等）添加DNS记录：

**A记录：**
```
类型: A
主机记录: @
记录值: 76.76.21.21
```

**CNAME记录（www子域名）：**
```
类型: CNAME
主机记录: www
记录值: cname.vercel-dns.com
```

### 等待DNS生效

- 通常需要5-30分钟
- 最长可能需要24-48小时
- 可以使用 https://dnschecker.org 检查DNS传播状态

---

## ⏰ 配置定时任务

Vercel会自动识别 `vercel.json` 中的定时任务配置：

```json
{
  "crons": [
    {
      "path": "/api/cron/daily-news",
      "schedule": "0 8 * * *"
    }
  ]
}
```

**说明：**
- `0 8 * * *` = 每天早上8点（UTC时间）
- 北京时间 = UTC + 8，所以是下午4点
- 如果想改为北京时间早上8点，使用 `0 0 * * *`（UTC 0点 = 北京8点）

**修改定时任务时间：**

编辑 `vercel.json`，然后推送到GitHub，Vercel会自动更新。

---

## 🧪 测试部署

### 1. 测试网站访问

访问：`https://xiezij.com`

应该能看到摸鱼日报首页。

### 2. 测试数据库连接

访问：`https://xiezij.com/api/news?action=dates`

如果返回日期列表，说明数据库连接成功。

### 3. 手动触发定时任务

访问：`https://xiezij.com/api/cron/daily-news`

如果设置了 `CRON_SECRET`，需要带上token：
```
https://xiezij.com/api/cron/daily-news?token=你的密钥
```

应该返回：
```json
{
  "success": true,
  "message": "新闻更新成功",
  "date": "2024-10-29",
  "newsCount": 15
}
```

### 4. 查看新闻

刷新首页，应该能看到自动获取的新闻。

---

## 📊 监控和维护

### 查看Vercel日志

1. 在Vercel项目中，点击 **Deployments**
2. 点击最新部署
3. 点击 **Functions** 标签
4. 可以看到所有API调用和定时任务的日志

### 查看MongoDB数据

1. 在MongoDB Atlas控制台
2. 点击 **Browse Collections**
3. 可以看到 `daily_news` 集合中的所有数据

### 定时任务执行记录

在Vercel的 **Logs** 中可以看到定时任务的执行记录：
- 执行时间
- 执行结果
- 错误信息（如果有）

---

## 🔧 常见问题

### Q1: 定时任务没有执行？

**检查：**
1. Vercel项目是否是Pro计划？（免费版有限制）
2. `vercel.json` 是否正确配置？
3. 查看Vercel日志是否有错误

**解决：**
- Vercel免费版的Cron Jobs有限制，可能需要升级
- 或者使用外部定时任务服务（如：cron-job.org）定期访问API

### Q2: 数据库连接失败？

**检查：**
1. `MONGODB_URI` 是否正确？
2. 用户名密码是否包含特殊字符？（需要URL编码）
3. IP白名单是否设置为 `0.0.0.0/0`？

**解决：**
- 重新复制连接字符串
- 特殊字符需要编码（如：`@` → `%40`）
- 确保网络访问配置正确

### Q3: RSS获取失败？

**原因：**
- RSS源可能被墙或不稳定
- 网络超时

**解决：**
- 等待自动重试
- 手动触发更新
- 修改 `lib/rss-fetcher.ts` 中的RSS源列表

### Q4: 域名无法访问？

**检查：**
1. DNS是否配置正确？
2. DNS是否已生效？（使用 dnschecker.org 检查）
3. Vercel是否显示域名已验证？

**解决：**
- 等待DNS传播（最长48小时）
- 检查域名注册商的DNS设置
- 尝试清除浏览器缓存

---

## 💰 成本分析

| 服务 | 免费额度 | 超出后费用 |
|------|---------|-----------|
| **Vercel** | 100GB带宽/月 | $20/月起 |
| **MongoDB Atlas** | 512MB存储 | $9/月起 |
| **域名** | 已有 | - |
| **总计** | **¥0/月** | 基本不会超 |

**说明：**
- 个人使用完全在免费额度内
- 每天15条新闻 × 365天 ≈ 5MB数据
- 512MB可以用100年+

---

## 🎉 完成！

现在你的摸鱼日报网站已经：

✅ 部署到 Vercel（免费）
✅ 使用 MongoDB 存储数据（免费）
✅ 绑定自定义域名 xiezij.com
✅ 每天自动更新新闻（免费）
✅ 完全自动化运行

**访问你的网站：** https://xiezij.com

---

## 📚 下一步

1. **优化RSS源**：在 `lib/rss-fetcher.ts` 中添加更多新闻源
2. **自定义样式**：修改 `app/globals.css` 和组件样式
3. **添加功能**：如评论、点赞、分享统计等
4. **SEO优化**：添加sitemap、robots.txt等
5. **性能优化**：添加CDN、图片优化等

---

## 🆘 需要帮助？

如果遇到问题：

1. 查看Vercel日志
2. 查看浏览器控制台
3. 检查环境变量配置
4. 参考本文档的常见问题部分

---

**祝你部署顺利！🎊**

