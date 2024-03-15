---
outline: [2, 3]
---

# Markdown 速查表

# 概览

| 元素               | Markdown 语法                                                                                                                         |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| 标题               | `# H1`<br />`## H2`<br />`### H3`                                                                                                   |
| 加粗               | `**加粗文本**`                                                                                                                     |
| 斜体               | `*斜体文本*`                                                                                                                       |
| 引用               | `> 引用`                                                                                                                            |
| 有序列表           | `1. 第一项`<br />`2. 第二项`                                                                                                         |
| 无序列表           | `- 第一项`<br />`- 第二项`                                                                                                           |
| 代码               | `` `代码` ``                                                                                                                        |
| 围栏代码块         | ```` ``` ````<br />```` ``` ````                                                                                                    |
| 分割线             | `---`                                                                                                                               |
| 链接               | `[标题](https://www.example.com)`                                                                                                  |
| 图像               | `![替代文字](image.jpg)`                                                                                                            |
| 表格               | `\| 语法 \| 描述 \|`<br />` \| ----------- \| ----------- \|`<br />` \| 标题 \| 标题 \|`<br />` \| 段落  \| 文本 \|`                |


## 基本语法

### 标题

H1: 一级标题
```
# 
```

H2: 二级标题
```
## 
```

H3: 三级标题
```
### 
```

H4: 四级标题
```
#### 
```

H5: 五级标题
```
##### 
```

H6: 六级标题
```
###### 
```

### 强调
```
*这段文本将呈现为斜体*
_这段文本也将呈现为斜体_

**这段文本将呈现为加粗**
__这段文本也将呈现为加粗__

_你 **可以** 组合它们_
```

### 列表

#### 有序列表

1. -
2. -
    1. -
    2. -

```
1. 
2. 
   1. 
   2. 
```

#### 无序列表


- 1
- 2
    - 3
    - 4

```
- 
- 
  - 
  -
```

### 链接
```
[Markdown 能做](https://www.markdowncando.com/zh/)
```

```
[Markdown 能做][MDCD]

[MDCD]:https://www.markdowncando.com/zh/
```

### 图像

![Markdown 能做的 Logo](https://www.markdowncando.com/logo-mini.png "MarkdownCanDo Logo")

```
![Markdown 能做的 Logo](https://www.markdowncando.com/logo-mini.png "MarkdownCanDo Logo")
```

### 段引用

> 段引用
> 
> > 嵌套段引用
> > 

```
> 段引用
> 
> > 嵌套段引用
> > 
```

### 表格

```
|居中| 居中| 右对齐| 左对齐 |
| ---  | :---: | ---: | :--- |
|      |       |      |      |
|      |       |      |      |
```

```
|     |     |     |     |
| --- | --- | --- | --- |
|     |     |     |     |
|     |     |     |     |
```

### 分割线
```
---
```

### 行内代码
```
使用 `printf()` 函数。
```

### （围栏式）代码块

````
```javascript

```
````

围栏数为四：\`\`\`\`, 可以嵌套使用 \`\`\`

### 转义

在 Markdown 中使用 `\` 转义以下字符:

| 字符     | 转义后的 Markdown | 字符名称             |
|---------|------------------|---------------------|
| `*`     | `\*`             | 星号                 |
| `_`     | `\_`             | 下划线               |
| `{`     | `\{`             | 左花括号             |
| `}`     | `\}`             | 右花括号             |
| `[`     | `\[`             | 左方括号             |
| `]`     | `\]`             | 右方括号             |
| `(`     | `\(`             | 左圆括号             |
| `)`     | `\)`             | 右圆括号             |
| `#`     | `\#`             | 井号                 |
| `+`     | `\+`             | 加号                 |
| `-`     | `\-`             | 连字符/减号          |
| `.`     | `\.`             | 点号                 |
| `!`     | `\!`             | 感叹号               |
| `\|`    | `\|`             | 竖线                 |

这个表格提供了在 Markdown 中转义特殊字符的快速参考，以及这些字符的名称。

### 脚注

这一段用了一个脚注[^1]。

[^1]: 这一行会出现在文章结尾

```
这一段用了一个脚注[^1]。

[^1]: 这一行会出现在文章结尾
```

## 组合

### 自述文件徽章

[![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)

```
[![中文文档](https://img.shields.io/badge/中文-读我-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)
```

```
[![alt](https://img.shields.io/badge/left-right-blue?style=for-the-badge)](readme 链接)
```

其他配置参考 [shield](https://shields.io)

### Vercel 部署徽章

[![使用 Vercel 部署此网站](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gantrol/markdown-can-do)

```
[![使用 Vercel 部署此网站](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gantrol/markdown-can-do)
```

```
[![alt](https://img.shields.io/badge/left-right-blue?style=for-the-badge)](https://vercel.com/import/project?template=githubLink)
```
