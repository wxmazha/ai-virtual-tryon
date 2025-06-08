# 🚀 AI换衣网站部署指南

本指南将帮助您将AI换衣网站部署到各种在线平台。

## 📋 部署前准备

### 1. 环境变量配置
确保您有以下环境变量：
```bash
REPLICATE_API_TOKEN=你的_replicate_api_token
```

### 2. 项目构建测试
```bash
npm run build
npm start
```

## 🌟 推荐部署方案

### 🥇 Vercel (推荐)
Vercel是Next.js的最佳部署平台，提供：
- ✅ 自动部署和CI/CD
- ✅ 全球CDN加速
- ✅ 无服务器函数支持
- ✅ 免费SSL证书
- ✅ 自动域名绑定

#### 部署步骤：

1. **登录Vercel**
```bash
vercel login
```

2. **部署项目**
```bash
vercel
```

3. **配置环境变量**
在Vercel Dashboard中：
- 项目设置 → Environment Variables
- 添加：`REPLICATE_API_TOKEN` = `你的API Token`

4. **自定义域名**（可选）
- 项目设置 → Domains
- 添加自定义域名

### 🥈 Netlify
适合静态网站，但需要额外配置服务器端功能。

#### 部署步骤：
1. 连接GitHub仓库
2. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `.next`
3. 环境变量配置同Vercel

### 🥉 Railway
全栈应用部署平台，支持容器化部署。

#### 部署步骤：
1. 连接GitHub仓库
2. 选择Next.js模板
3. 配置环境变量
4. 自动部署

## 🔧 部署配置文件

### vercel.json
项目已包含优化的Vercel配置：
- API函数超时设置：60秒
- 安全头配置
- 路由优化

### next.config.js（如需要）
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'replicate.delivery'],
  },
  env: {
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
  }
}

module.exports = nextConfig
```

## 🌐 域名和DNS配置

### 自定义域名设置
1. 购买域名（推荐：Namecheap, GoDaddy）
2. 在部署平台添加域名
3. 配置DNS记录：
   ```
   类型: CNAME
   名称: www
   值: your-project.vercel.app
   ```

### SSL证书
所有推荐平台都提供免费SSL证书，自动配置HTTPS。

## 📊 性能优化

### 1. 图片优化
- 使用Next.js Image组件
- 配置图片域名白名单
- 启用图片懒加载

### 2. 缓存策略
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}
```

### 3. 环境变量管理
```bash
# 生产环境
REPLICATE_API_TOKEN=prod_token_here
NODE_ENV=production

# 开发环境
REPLICATE_API_TOKEN=dev_token_here
NODE_ENV=development
```

## 🔍 部署后检查

### 1. 功能测试
- [ ] 首页加载正常
- [ ] API接口响应正常
- [ ] 图片上传功能
- [ ] AI处理功能
- [ ] 响应式设计

### 2. 性能检测
使用以下工具检测：
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

### 3. SEO检查
- [ ] Meta标签正确
- [ ] Open Graph配置
- [ ] 网站地图生成
- [ ] robots.txt配置

## 🛠️ 故障排除

### 常见问题：

1. **API调用失败**
   - 检查环境变量配置
   - 验证API Token有效性
   - 查看服务器日志

2. **构建失败**
   - 检查依赖版本兼容性
   - 清理缓存：`npm cache clean --force`
   - 重新安装依赖：`rm -rf node_modules && npm install`

3. **样式问题**
   - 确认Tailwind CSS配置
   - 检查CSS文件导入顺序

## 📞 技术支持

如果遇到部署问题，可以：
- 查看平台官方文档
- 检查GitHub Issues
- 联系技术支持

---

🎉 **恭喜！您的AI换衣网站已经准备好部署到全世界了！** 