# Inserir Imagens no Markdown

A maneira de inserir imagens é muito semelhante a [links](#step-3), exceto que você precisa adicionar um ponto de exclamação `!` na frente. A sintaxe para inserir imagens é a seguinte:

```
![Texto alternativo para leitores de tela](/caminho/para/imagem/no/caminho/absoluto/local.jpg)

![Texto alternativo para leitores de tela](../caminho/para/imagem/no/caminho/relativo/local.jpg)

![Carregando imagens remotas](URL "Título opcional")
```

![O texto alternativo também pode ser exibido quando a imagem não carrega](/caminho/para/gato.jpg)

Esta é o ícone do site:

![Exemplo de imagem carregada com sucesso](https://www.markdowncando.com/logo-mini.png "Ícone do MarkdownCanDo")

## Combinando Links e Imagens

Abaixo está o link para a documentação chinesa deste projeto, que também é uma imagem.

[![Documentação em inglês](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)

Analisando sua estrutura, ele coloca uma imagem dentro de um link e, em seguida, usa o formato `[Imagem](endereço do link)` para adicionar o link.

```
Imagem:
![Documentação em inglês](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)

Link:
[Imagem](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)
```

[//]: # (TODO: Após o upload da implementação, você poderá usar arrastar e soltar para inserir imagens de arquivos de imagem ou navegadores da web. Tente inserir a seguinte imagem:)
