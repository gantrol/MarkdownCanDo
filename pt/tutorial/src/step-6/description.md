# Inserir Imagens no Markdown

A maneira de inserir imagens é muito semelhante a [links](#step-3), exceto que você precisa adicionar um ponto de exclamação `!` na frente. A sintaxe para inserir imagens é a seguinte:

```
![Texto alternativo para leitores de tela](/caminho/para/imagem/no/caminho/absoluto/local.jpg)

![Texto alternativo para leitores de tela](../caminho/para/imagem/no/caminho/relativo/local.jpg)

![Carregando imagens remotas](URL "Título opcional")
```

![O texto alternativo também pode ser exibido quando a imagem não carrega](/caminho/para/gato.jpg)

Esta é o ícone do site:

![Exemplo de imagem carregada com sucesso](https://markdown.aicando.xyz/logo-mini.png "Ícone do MarkdownCanDo")

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

## Enviar uma imagem

No editor, selecione **Enviar imagem**, cole uma imagem da área de transferência ou arraste um arquivo para a área editável. O MarkdownCanDo envia o arquivo e insere automaticamente o endereço em Markdown. Troque o texto alternativo baseado no nome do arquivo por uma descrição breve do conteúdo da imagem.

Os envios são temporários e destinados a este playground:

- São aceitos JPEG, PNG, WebP, GIF e AVIF; SVG não é aceito.
- Cada imagem pode ter no máximo 5 MiB.
- Cada visitante pode enviar até 10 imagens ou 20 MiB por dia UTC.
- O site inteiro aceita até 300 imagens ou 1 GiB por dia UTC.
- As imagens deixam de funcionar 24 horas após o envio e então são removidas automaticamente.

Somente a imagem é enviada; o texto Markdown continua no navegador. Não envie conteúdo confidencial ou arquivos que você não tem direito de usar.

Os endereços têm proteção contra hotlink e funcionam apenas nas páginas do MarkdownCanDo. Antes de publicar o Markdown no GitHub, em um blog ou em outro site, baixe a imagem e envie-a para a plataforma de destino.
