# Imagens Markdown

A inserção de imagens é muito semelhante à de [links](#step-3), com a adição de um ponto de exclamação `!` no início. A sintaxe para inserir imagens é a seguinte:

``` 
![Texto alternativo, útil para leitores de tela](/caminho/da/imagem/local/absoluto.jpg)

![Texto alternativo, útil para leitores de tela](../caminho/relativo/da/imagem/local.jpg)

![Carregando imagem remota](https://markdown.aicando.xyz/logo-mini.png "Título opcional")
```

![O texto alternativo também pode ser exibido quando a imagem não carrega](/caminho/para/gato.jpg)

Este é o ícone do site:

![Exemplo de imagem carregada com sucesso](https://markdown.aicando.xyz/logo-mini.png "Ícone do site")

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

## Enviar imagens no playground

Use **Enviar imagem**, cole uma imagem ou arraste um arquivo para o editor. Após o envio, `![texto alternativo](endereço da imagem)` é inserido automaticamente. Edite o texto alternativo para descrever a imagem, em vez de apenas repetir o nome do arquivo.

São aceitos JPEG, PNG, WebP, GIF e AVIF de até 5 MiB. Cada visitante pode enviar 10 imagens ou 20 MiB por dia UTC; o limite do site é 300 imagens ou 1 GiB por dia UTC. As imagens deixam de funcionar 24 horas após o envio e então são removidas.

O texto Markdown não é enviado. As imagens são temporárias, não devem conter dados sensíveis e só podem ser exibidas no MarkdownCanDo. Envie a imagem novamente na plataforma de destino antes de usar o Markdown em outro lugar.

---

Vale dizer, no passado, inserir imagens em Markdown era uma tarefa um tanto quanto complicada. Alguns sites que adotam a sintaxe Markdown nem utilizam este método de inserção de imagens. Felizmente, alguns editores locais otimizaram esse processo, como o [Obsidian](https://obsidian.md/)

