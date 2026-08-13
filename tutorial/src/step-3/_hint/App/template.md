# Links

You can access external links, such as [my blog](https://www.gantrol.com)

You can use "relative" links to access content within this site, such as [this site's tutorial](/zh/guide/)

Create a link here to visit [this site's playground](/zh/playground/)

You can also use it to jump to a specific heading on a web page [this site's tutorial#building a site](/zh/guide/#building a site)

You can also add attributes, such as [my blog](https://www.gantrol.com "title") `[my blog](https://www.gantrol.com "title")`

**What if a document uses the same link multiple times?**

You can first define a link alias, in the format `[alias]: link`, such as:

[why]: /zh/guide/why "Why Markdown?"

Then use the `[text][alias]` format to create a link, [Why use Markdown][why].

For example, [my blog][ABC], [my blog][ABC], [blog][ABC]

Look closely at the preview on the right, does the line above show?

Now it's my turn,

[gantrol/markdown-can-do | Github][GGG]

[markdown-can-do][GGG]

[GGG][GGG]

Additionally, the links to these tutorial pages are specially processed, `#step-3` will generate a new page, instead of jumping to a specific section within the page.

[GGG]: https://github.com/gantrol/markdown-can-do
[ABC]: https://www.gantrol.com
