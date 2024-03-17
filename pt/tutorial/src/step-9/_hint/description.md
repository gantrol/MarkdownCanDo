# Código Inline e Blocos de Código Markdown

## Código Inline

Envolva o código com um par de craves, como `print("Olá, MarkdownCanDo")`:

```markdown
`print("Olá, MarkdownCanDo")`
```

## Blocos de Código

Você pode criar um bloco de código usando três craves ```. Você também pode adicionar um identificador de linguagem após as três craves de abertura para adicionar realce de sintaxe ao bloco de código.

Por exemplo, usando o identificador de linguagem JavaScript:

````markdown
```js
function sayHello() {
  console.log("Olá, MarkdownCanDo!");
}
```
````

Saída

```js
function sayHello() {
  console.log("Olá, MarkdownCanDo!");
}
```

Com o identificador de linguagem correto, ele realçará corretamente o código, tornando-o mais legível.

Se o bloco de código estiver em Markdown, mas contiver código, o que fazer? Adicione uma crave a mais:

`````markdown
````markdown
```js
function sayHello() {
  console.log("Olá, MarkdownCanDo!");
}
```
````
`````

Para cada nível aninhado, adicione mais uma crave.
