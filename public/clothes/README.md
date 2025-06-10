# 📚 预设服装库使用说明

## 🎯 目录结构

```
public/clothes/
├── clothes-data.json        # 服装数据配置文件
├── tops/                   # 上衣类服装图片
├── bottoms/               # 下装类服装图片
├── dresses/               # 连衣裙类服装图片
├── outerwear/             # 外套类服装图片
└── accessories/           # 配饰类服装图片
```

## 📷 添加服装图片

1. **图片格式要求**
   - 支持格式：JPG, PNG, WEBP
   - 推荐尺寸：400x600px 或更高
   - 文件大小：建议小于 2MB

2. **图片命名规范**
   - 使用有意义的文件名（如：`casual-tshirt-white.jpg`）
   - 使用英文和连字符，避免空格和特殊字符

3. **添加新服装的步骤**
   - 将图片放入对应分类的文件夹
   - 在 `clothes-data.json` 中添加相应的配置
   - 更新配置文件中的 `popular` 和 `newest` 数组

## 🔧 配置说明

### clothes-data.json 结构

```json
{
  "categories": {
    "tops": {
      "name": "上衣",
      "icon": "👔",
      "items": [
        {
          "id": "unique-item-id",
          "name": "显示名称",
          "image": "/clothes/tops/filename.jpg",
          "tags": ["标签1", "标签2"],
          "description": "服装描述"
        }
      ]
    }
  },
  "popular": ["item-id1", "item-id2"],
  "newest": ["item-id3", "item-id4"]
}
```

## 🎨 服装分类说明

- **tops (上衣)**：T恤、衬衫、卫衣、毛衣等
- **bottoms (下装)**：裤子、短裤、裙子等
- **dresses (连衣裙)**：各种款式的连衣裙
- **outerwear (外套)**：夹克、大衣、西装等
- **accessories (配饰)**：帽子、围巾、包包等

## 📊 使用统计

- 支持搜索功能
- 支持标签筛选
- 支持分类浏览
- 热门推荐展示
- 最新上架展示

## 🚀 快速开始

1. 准备服装图片并放入对应目录
2. 编辑 `clothes-data.json` 添加配置
3. 刷新网页查看效果

## 💡 最佳实践

- 使用统一的图片风格和背景
- 提供清晰的服装细节图
- 添加准确的标签和描述
- 定期更新热门和最新推荐
- 保持文件名和ID的一致性

---

*需要帮助？请查看网站的 FAQ 部分或联系开发团队。* 