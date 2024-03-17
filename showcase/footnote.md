# Markdown Footnotes

Footnotes allow readers to quickly check annotation content. They can enhance the information content of an article without making the main body appear cluttered.

Here is a regular paragraph with a term that needs explanation[^1].

[^1]: This is the explanation of the term, which is the content of a footnote.

First, you need to define the footnote, the format is:

`[^footnote identifier]: footnote content`

Typically, English half-width symbols are used. Then, reference it in the main text with `[^footnote identifier]`.

For example:

`[^1]: Footnote 1`

Then, you can reference it with `[^1]`.

> Although footnotes are a very useful feature, not all Markdown editors support them, and the extent of support varies.
>
> If the editor does not support them, it will be a type of [link](#fn1)
