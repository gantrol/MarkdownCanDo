# Imagens Markdown

A inserção de imagens é muito semelhante à de [links](#step-3), com a adição de um ponto de exclamação `!` no início. A sintaxe para inserir imagens é a seguinte:

``` 
![Texto alternativo, útil para leitores de tela](/caminho/da/imagem/local/absoluto.jpg)

![Texto alternativo, útil para leitores de tela](../caminho/relativo/da/imagem/local.jpg)

![Carregando imagem remota](https://www.markdowncando.com/logo-mini.png "Título opcional")
```

![O texto alternativo também pode ser exibido quando a imagem não carrega](/caminho/para/gato.jpg)

Este é o ícone do site:

![Exemplo de imagem carregada com sucesso](https://www.markdowncando.com/logo-mini.png "Ícone do site")

## Combinando links e imagens

A seguir, o link para a documentação em chinês deste projeto, que também é uma imagem.

[![Documentação em chinês](https://img.shields.io/badge/中文-Ler-me-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/zh/readme.md)

Analisando sua estrutura, ela coloca uma imagem dentro de um link, usando o formato `[imagem](endereço do link)`.

```
[![Documentação em chinês](https://img.shields.io/badge/中文-Ler-me-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/zh/readme.md)

Imagem:
![Documentação em chinês](https://img.shields.io/badge/中文-Ler-me-blue?style=for-the-badge)

Link:
[imagem](https://github.com/gantrol/MarkdownCanDo/blob/main/zh/readme.md)
```

[//]: # (TODO: Após o upload ser implementado, você poderá inserir imagens arrastando e soltando arquivos de imagem ou através do navegador. Tente inserir a imagem abaixo:)

---

Vale dizer, no passado, inserir imagens em Markdown era uma tarefa um tanto quanto complicada. Alguns sites que adotam a sintaxe Markdown nem utilizam este método de inserção de imagens. Felizmente, alguns editores locais otimizaram esse processo, como o [Obsidian](https://obsidian.md/)

