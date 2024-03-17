# Notas de rodapé em Markdown

As notas de rodapé permitem que os leitores verifiquem rapidamente o conteúdo das anotações. Elas podem melhorar o conteúdo informativo de um artigo sem deixar o corpo principal poluído.

Aqui está um parágrafo regular com um termo que precisa de explicação[^1].

[^1]: Esta é a explicação do termo, que é o conteúdo de uma nota de rodapé.

Primeiro, você precisa definir a nota de rodapé, o formato é:

`[^identificador da nota de rodapé]: conteúdo da nota de rodapé`

Tipicamente, são usados símbolos de meio-ponto em inglês. Em seguida, faça referência a ela no texto principal com `[^identificador da nota de rodapé]`.

Por exemplo:

`[^1]: Nota de rodapé 1`

Então, você pode fazer referência a ela com `[^1]`.

> Embora as notas de rodapé sejam um recurso muito útil, nem todos os editores Markdown os suportam, e a extensão do suporte varia.
>
> Se o editor não os suportar, será um tipo de [link](#fn1)
