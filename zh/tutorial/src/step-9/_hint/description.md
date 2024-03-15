# Markdown 行内代码与代码块

## 行内代码

用一对反引号包围代码，比如`print("Hello, MarkdownCanDo")`：

```markdown
`print("Hello, MarkdownCanDo")`
```

## 代码块

可以使用三个反引号 \`\`\` 来创建代码块。你还可以在开头三个反引号后添加一个语言标识符，为代码块添加语法高亮。

例如，使用 JavaScript 语言标识符：

````markdown
```js
function sayHello() {
  console.log("Hello, MarkdownCanDo!");
}
```
````

输出

```js
function sayHello() {
  console.log("Hello, MarkdownCanDo!");
}
```

有正确的语言标识，会正确高亮代码，增加代码可读性。

如果代码块是 Markdown，但是里面又有代码，怎么办呢？加多一个反引号：

`````markdown
````markdown
```js
function sayHello() {
  console.log("Hello, MarkdownCanDo!");
}
```
````
`````

每嵌套一层，就要多一个反引号。
