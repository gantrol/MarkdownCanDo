# Links

É possível acessar links externos, como [meu blog](https://www.gantrol.com)

Você pode usar links "relativos" para acessar conteúdos do próprio site, como [o tutorial deste site](/pt/guide/)

Crie um link aqui para visitar [o campo de prática deste site](/pt/playground/)

Também é possível usar links para pular para títulos específicos em uma página, como [o tutorial deste site#criar-site](/pt/guide/#criar-site)

Você pode adicionar um título ao link, como [meu blog](https://www.gantrol.com "título")  `[meu blog](https://www.gantrol.com "título")`

**E se um documento precisar usar um link várias vezes**?

Você pode definir um identificador de link, no formato `[identificador]: endereço`, como:

[why]: /pt/guide/why "Por que Markdown?"

Então, crie um link usando o formato `[texto][identificador]`, [Por que usar Markdown][why].

Por exemplo, [meu blog][ABC], [meu blog][ABC], [blog][ABC]

Veja o preview à direita, a linha acima aparece?

Agora é a minha vez,

[gantrol/markdown-can-do | Github][GGG]

[markdown-can-do][GGG]

[GGG][GGG]



Além disso, os links para estas páginas do tutorial são processados de maneira especial, `#step-3` gerará uma nova página ao invés de levar a uma seção específica da página.

[GGG]: https://github.com/gantrol/markdown-can-do
[ABC]: https://www.gantrol.com

