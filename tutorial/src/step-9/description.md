# Markdown Inline Code and Code Blocks

## Inline Code

Surround the code with a pair of backticks, like `print("Hello, MarkdownCanDo")`:

```markdown
`print("Hello, MarkdownCanDo")`
```

## Code Blocks

You can create a code block using three backticks ```. You can also add a language identifier after the opening three backticks to add syntax highlighting to the code block.

For example, using the JavaScript language identifier:

````markdown
```js
function sayHello() {
  console.log("Hello, MarkdownCanDo!");
}
```
````

Output

```js
function sayHello() {
  console.log("Hello, MarkdownCanDo!");
}
```

With the correct language identifier, it will properly highlight the code, making it more readable.

If the code block is in Markdown, but it contains code, what to do? Add an extra backtick:

`````markdown
````markdown
```js
function sayHello() {
  console.log("Hello, MarkdownCanDo!");
}
```
````
`````
