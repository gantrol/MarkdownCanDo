# Markdown 图片

图片的插入方式和[链接](#step-3)很相似,只是前面需要额外加一个英文感叹号`!`。插入图片的语法如下:

``` 
![说明文本，方便屏读](/图片/的/本地/绝对路径.jpg)

![说明文本，方便屏读](../图片/的/本地/相对路径.jpg)

![加载远程图片](https://markdown.aicando.xyz/logo-mini.png "可选标题")
```

![说明文本也可以在图片加载不出时](/path/to/cat.jpg)

这是本网站图标：

![加载成功图片示例](https://markdown.aicando.xyz/logo-mini.png "本网站图标")

## 链接与图片结合

下面是本项目中文文档链接，同时也是一张图片。

[![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/zh/readme.md)

分析它的结构，是在链接中放了一个图片，然后用`[图片](链接地址)`的格式添加链接。

```
[![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/zh/readme.md)

图片:
![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)

链接：
[图片](https://github.com/gantrol/MarkdownCanDo/blob/main/zh/readme.md)
```

## 在演练场上传图片

点击**上传图片**、粘贴剪贴板图片，或把图片文件拖进编辑器。成功后会自动插入 `![说明文字](图片地址)`。记得把文件名式的说明改成对图片内容的简短描述。

支持 JPEG、PNG、WebP、GIF 和 AVIF，单图最大 5 MiB。每位访客每天最多 10 张或 20 MiB，全站每天最多 300 张或 1 GiB，均按 UTC 日期计算。图片会在上传 24 小时后失效并自动清理。

Markdown 正文不会上传；图片是临时资源，不应包含敏感内容，并且只允许在 MarkdownCanDo 中展示。复制 Markdown 到别处前，请先在目标平台重新上传图片。
---

不得不说，以往，Markdown插入图片是比较麻烦的事情，有的部分采用Markdown语法的网站，甚至不用这种图片插入方式。好在一些本地编辑器做了优化，比如 [Obsidian](https://obsidian.md/)
