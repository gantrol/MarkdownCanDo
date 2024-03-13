# Markdown 图片

图片的插入方式和[链接](#step-3)很相似,只是前面需要额外加一个英文感叹号`!`。插入图片的语法如下:

``` 
![说明文本，方便屏读](/图片/的/本地/绝对路径.jpg)

![说明文本，方便屏读](../图片/的/本地/相对路径.jpg)

![加载远程图片](URL "可选标题")
```

![说明文本也可以在图片加载不出时](/path/to/cat.jpg)

这是本网站图标：

![加载成功图片示例](https://www.markdowncando.com/logo-mini.png "本网站图标")

## 链接与图片结合

下面是本项目中文文档链接，同时也是一张图片。

[![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme-zh.md)

分析它的结构，是在链接中放了一个图片，然后用`[图片](链接地址)`的格式添加链接。

```
[![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme-zh.md)

图片:
![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)

链接：
[图片](https://github.com/gantrol/MarkdownCanDo/blob/main/readme-zh.md)
```


[//]: # (TODO: 上传实现之后，你可以使用拖放来从图片文件或网页浏览器插入图片。尝试插入下面这张图片:)
