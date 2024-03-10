# What Markdown Can Do

Markdown makes formatting easier. [Playground link](/playground/), [Webpage link](/guide/).

## What Specifically Can It Do?

- [x] Implement a simple to-do list
- [x] Common paragraph formats: normal paragraphs, six levels of headings, block quotes, lists, to-dos, code, tables, formulas, footnotes, dividers, images, etc.
- [x] Common inline formats: **bold**, *italic*, ~~strikethrough~~, [link🔗](), 🤣emoji, inline formula $e^\pi$, inline code `a = 3`...
- [ ] ~~Get some fries at the dock~~

## Markdown Can Do More

- [x] Various charts, such as flowcharts, mind maps, Gantt charts, timelines, etc. Find it troublesome? Try [letting ChatGPT do it](/reference/chatgpt/).[^1]
- [ ] PPT
- [x] Music scores (generally not supported by Markdown applications)
- [x] This website, see the [Website Building](#building-a-website) section
- [ ] ~~Go to Mars~~

### Timeline

```mermaid
timeline
    title ChatGPT Development Timeline
    section Early Development
        November 30, 2022 : ChatGPT released, OpenAI
    section Rapid Growth
        January 2023 : More than 100 million users
    section Version Update
        March 14, 2023 : GPT-4 released, available to ChatGPT Plus users
```

### Flowchart

```mermaid
flowchart LR
A(("Question")) --> B(Friend)
A --> ChatGPT(ChatGPT)
B --> sum((Summary))
ChatGPT --> sum
sum --> solution(Solution)
solution --> accu((Accumulation))
accu -->|In large quantities| Wealth[(Wealth)]
accu -->|Over a long time| Wealth
```
### Music Score

```abc
X:1
T:Ode to Joy
M:4/4
L:1/4
K:C
E E F G | G F E D |
```

## More Things If You Are a Programmer

### HTML

- <u>Underline</u>
- iframe
- svg
- Create a button

### CSS

Markdown ultimately renders as HTML, and CSS can modify the layout of HTML elements. If your Markdown editing software has the corresponding configuration, you might be able to:

- Define CSS inline
- Customize CSS globally

### Building a Website

There are many ways to build websites based on Markdown. Personal research has mainly identified Vitepress and MDX as two options, both extending Markdown and allowing for code component insertion. Vitepress primarily supports Vue components, while MDX mainly supports React components.

Considering performance and maintenance stability, this site is built with Vitepress, and the site owner learned Vue overnight (~~in one hour~~).

## Want More?

You might want to check out the [reference materials](/reference-resource).

[^1]: Find it difficult? Actually, there's no need to memorize the syntax for various charts. The site owner used to rely on manuals, but now mainly consults ChatGPT.