---
outline: [2, 3]
---

# Folha de Dicas do Markdown

## Tabela de Visão Geral

| Elemento           | Sintaxe do Markdown                                                                                                                   |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Cabeçalho          | `# H1`<br />`## H2`<br />`### H3`                                                                                                     |
| Negrito            | `**texto em negrito**`                                                                                                               |
| Itálico            | `*texto em itálico*`                                                                                                                 |
| Citação            | `> citação`                                                                                                                          |
| Lista Ordenada     | `1. Primeiro item`<br />`2. Segundo item`                                                                                            |
| Lista Não Ordenada | `- Primeiro item`<br />`- Segundo item`                                                                                              |
| Código             | `` `código` ``                                                                                                                       |
| Bloco de Código    | ```` ``` ````<br />```` ``` ````                                                                                                     |
| Linha Horizontal   | `---`                                                                                                                                |
| Link               | `[título](https://www.example.com)`                                                                                                  |
| Imagem             | `![texto alternativo](imagem.jpg)`                                                                                                   |
| Tabela             | `\| Sintaxe \| Descrição \|`<br />` \| ----------- \| ----------- \|`<br />` \| Cabeçalho \| Título \|`<br />` \| Parágrafo \| Texto \|` |

## Sintaxe Básica

### Cabeçalhos

H1: Cabeçalho Nível 1
```
# 
```

H2: Cabeçalho Nível 2
```
## 
```

H3: Cabeçalho Nível 3
```
### 
```

H4: Cabeçalho Nível 4
```
#### 
```

H5: Cabeçalho Nível 5
```
##### 
```

H6: Cabeçalho Nível 6
```
###### 
```

### Ênfase
```
*Este texto será em itálico*
_Este também será em itálico_

**Este texto será em negrito**
__Este também será em negrito__

_Você **pode** combiná-los_
```

### Listas

#### Lista Ordenada

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

#### Lista Não Ordenada

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

### Links
```
[Markdown Pode Fazer](https://www.markdowncando.com/)
```

```
[Markdown Pode Fazer][MPCF]

[MPCF]:https://www.markdowncando.com/
```

### Imagens

![Logo do Markdown Pode Fazer](https://www.markdowncando.com/logo-mini.png "Logo do MarkdownPodeFazer")

```
![Logo do Markdown Pode Fazer](https://www.markdowncando.com/ "Logo do MarkdownPodeFazer")
```

### Citação em Bloco

> Citação em Bloco
>
> > Citação em Bloco Aninhada
> >

```
> Citação em Bloco
>
> > Citação em Bloco Aninhada
> >
```

### Tabelas

```
| meio | meio | direita | esquerda |
| ---- | :--: | ------: | :------- |
|      |      |         |          |
|      |      |         |          |
```

```
|      |      |      |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |
|      |      |      |      |
```

### Linha Horizontal
```
---
```

### Código Inline
```
Use a função `printf()`.
```

### Blocos de Código (Cercados)

````
```javascript

```
````

Conta quatro cercas: \`\`\`\`, que pode embutir \`\`\`

### Escapando

Use `\` para escapar os seguintes caracteres no Markdown:

| Caractere | Markdown Escapado | Nome do Caractere         |
|-----------|-------------------|---------------------------|
| `*`       | `\*`              | Asterisco                 |
| `_`       | `\_`              | Sublinhado                |
| `{`       | `\{

`              | Chave de Abertura         |
| `}`       | `\}`              | Chave de Fechamento       |
| `[`       | `\[`              | Colchete de Abertura      |
| `]`       | `\]`              | Colchete de Fechamento    |
| `(`       | `\(`              | Parêntese de Abertura     |
| `)`       | `\)`              | Parêntese de Fechamento   |
| `#`       | `\#`              | Cerquilha                 |
| `+`       | `\+`              | Mais                      |
| `-`       | `\-`              | Hífen/Menos               |
| `.`       | `\.`              | Ponto                     |
| `!`       | `\!`              | Ponto de Exclamação       |
| \|       | `\|`              | Barra Vertical            |

Esta tabela fornece uma referência rápida para escapar caracteres especiais no Markdown, juntamente com os nomes dos caracteres.

### Nota de Rodapé

Este parágrafo usa uma nota de rodapé[^1].

[^1]: Esta linha aparecerá no final do artigo

```
Este parágrafo usa uma nota de rodapé[^1].

[^1]: Esta linha aparecerá no final do artigo
```

## Combinar

### Distintivo Readme

[![Documentação em Inglês](https://img.shields.io/badge/Inglês-Readme-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)

```
[![Documentação em Inglês](https://img.shields.io/badge/Inglês-Readme-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)
```

```
[![alt](https://img.shields.io/badge/esquerda-direita-blue?style=for-the-badge)](link do readme)
```

Outras configurações consulte [shield](https://shields.io).

### Distintivo de Implantação Vercel

[![Implante este site com Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gantrol/markdown-can-do)

```
[![Implante este site com Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gantrol/markdown-can-do)
```

```
[![alt](https://img.shields.io/badge/esquerda-direita-blue?style=for-the-badge)](https://vercel.com/import/project?template=linkDoGithub)
```

