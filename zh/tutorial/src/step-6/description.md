# Markdown 图片

图片的插入方式和[链接](#step-3)很相似,只是前面需要额外加一个英文感叹号`!`。插入图片的语法如下:

``` markdown
![说明文本，方便屏读](/图片/的/本地/绝对路径.jpg)

![说明文本，方便屏读](../图片/的/本地/相对路径.jpg)

![加载远程图片](URL "可选标题")
```

![说明文本也可以在图片加载不出时](/path/to/cat.jpg)

这是本网站图标：

![加载成功图片示例](https://markdown.aicando.xyz/logo-mini.png "本网站图标")

## 链接与图片结合

下面是本项目中文文档链接，同时也是一张图片。

[![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/zh/readme.md)

分析它的结构，是在链接中放了一个图片，然后用`[图片](链接地址)`的格式添加链接。

```markdown
[![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/zh/readme.md)

图片:
![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)

链接：
[图片](https://github.com/gantrol/MarkdownCanDo/blob/main/zh/readme.md)
```


## 上传一张图片

在编辑器中点击**上传图片**，也可以粘贴剪贴板里的图片，或把图片文件拖进编辑区域。上传成功后，MarkdownCanDo 会自动插入对应的 Markdown 图片地址。请把由文件名生成的说明文字改成对图片内容的简短描述，方便屏幕阅读器用户理解。

上传功能是为本站演练场提供的临时图片服务：

- 支持 JPEG、PNG、WebP、GIF 和 AVIF；不接受 SVG。
- 每张图片最大 5 MiB。
- 每位访客每天最多上传 10 张或 20 MiB，以先达到的一项为准。
- 全站每天最多上传 300 张或 1 GiB。
- 每日额度按 UTC 00:00 重置；图片会在上传 24 小时后失效并自动清理。

只有你主动选择的图片会上传，Markdown 正文仍只保留在浏览器中。请勿上传机密图片、个人敏感信息，或你无权使用的内容。

上传后的图片地址启用了防盗链，只供 MarkdownCanDo 页面展示。把 Markdown 复制到 GitHub、博客或其他网站后，图片通常不会显示；正式发布前，请先下载图片并上传到目标平台。
