# Images

The way to insert images is very similar to [links](#step-3), except you need to add an exclamation mark `!` in front. The syntax for inserting images is as follows:

```
![Alt text for screen readers](/path/to/image/on/local/absolute/path.jpg)

![Alt text for screen readers](../path/to/image/on/local/relative/path.jpg)

![Loading remote images](https://www.markdowncando.com/logo-mini.png "Optional title")
```

![Alt text can also be displayed when the image does not load](/path/to/cat.jpg)

This is the website icon:

![Example of a successfully loaded image](https://www.markdowncando.com/logo-mini.png "Website Icon")

## Combining Links and Images (badge)

Below is the link to the Chinese documentation of this project, which is also an image.

[![English documentation](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)

Analyzing its structure, it places an image inside a link, and then uses the format `[Image](link address)` to add the link.

```
Image:
![English documentation](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)

Link:
[Image](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)
```

[//]: # (TODO: After uploading implementation, you can use drag and drop to insert images from image files or web browsers. Try inserting the following image:)
---

It must be said, in the past, inserting images in Markdown was a bit of a hassle, with some websites that use Markdown syntax not even using this method of image insertion. Fortunately, some local editors have made optimizations, such as [Obsidian](https://obsidian.md/).
