# 如何更新头像

## 方法1：替换现有文件
1. 准备一张 200x200 像素的头像图片
2. 将图片命名为 `avatar.svg`（SVG格式）或 `avatar.jpg`（JPEG格式）
3. 上传到 `assets/images/` 文件夹，替换现有文件

## 方法2：使用不同文件名
1. 将您的头像图片上传到 `assets/images/` 文件夹
2. 在 `_config.yml` 文件中修改 `author.avatar` 路径指向您的新文件
   ```yaml
   author:
     avatar: "/assets/images/your-new-avatar.jpg"
   ```

## 推荐图片规格
- 尺寸：200x200 像素（正方形）
- 格式：JPG、PNG 或 SVG
- 文件大小：建议小于 100KB

## 上传方法
1. **GitHub网页端**：点击 `assets/images/` 文件夹 → Upload files → 选择您的头像文件
2. **Git命令行**：
   ```bash
   git add assets/images/avatar.jpg
   git commit -m "Update avatar"
   git push
   ```

更新后，GitHub Pages 将自动重新部署您的网站，新头像将在几分钟内生效。