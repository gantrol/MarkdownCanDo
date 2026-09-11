# Images

The way to insert images is very similar to [links](#step-3), except you need to add an exclamation mark `!` in front. The syntax for inserting images is as follows:

```
![Alt text for screen readers](/path/to/image/on/local/absolute/path.jpg)

![Alt text for screen readers](../path/to/image/on/local/relative/path.jpg)

![Loading remote images](https://markdown.aicando.xyz/logo-mini.png "Optional title")
```

![Alt text can also be displayed when the image does not load](/path/to/cat.jpg)

This is the website icon:

![Example of a successfully loaded image](https://markdown.aicando.xyz/logo-mini.png "Website Icon")

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

## Uploading in the playground

Use **Upload image**, paste an image, or drag a file into the editor. A successful upload inserts `![alt text](image address)` automatically. Edit the alt text so that it describes the image instead of merely repeating its filename.

The service accepts JPEG, PNG, WebP, GIF, and AVIF files up to 5 MiB. A visitor may upload 10 images or 20 MiB per UTC day; the site-wide limit is 300 images or 1 GiB per UTC day. Images stop working after 24 hours and are then cleaned up.

Your Markdown text is not uploaded. Images are temporary, must not contain sensitive material, and can only be displayed on MarkdownCanDo. Upload the file again on the destination platform before using the Markdown elsewhere.
---

It must be said, in the past, inserting images in Markdown was a bit of a hassle, with some websites that use Markdown syntax not even using this method of image insertion. Fortunately, some local editors have made optimizations, such as [Obsidian](https://obsidian.md/).
