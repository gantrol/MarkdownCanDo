# 链接

可以访问外部链接，比如[我的博客](https://www.gantrol.com)

可以用“相对”链接访问本站内容，比如[本站教程](/zh/guide/)

在这里建一个链接，访问[本站演练场](/zh/playground/)吧

还能用来跳转到网页特定标题处[本站教程#建站](/zh/guide/#建站)

还能加上属性，如 [我的博客](https://www.gantrol.com "标题")  `[我博客](https://www.gantrol.com "标题")`

**如果一篇文档多次用到一个链接怎么办呢**？

你可以先定义一个链接代号，格式是`[代号]: 链接`，如：

[why]: /zh/guide/why "为何 Markdown？"

然后用`[文本][代号]`格式创建链接，[为什么要用Markdown][why]。

再如，[我的博客][ABC]、[我博客][ABC]、[博客][ABC]

仔细看右侧预览，上面一行有显示吗？

现在到我了，

[gantrol/markdown-can-do | Github][GGG]

[markdown-can-do][GGG]

[GGG][GGG]



另外，这些个教程网页的链接是经过特殊处理的，`#step-3`就会生成新的网页，而不是到网页中的某一节。

[GGG]: https://github.com/gantrol/markdown-can-do
[ABC]: https://www.gantrol.com
