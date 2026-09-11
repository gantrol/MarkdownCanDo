# Markdown insert Images

The way to insert images is very similar to [links](#step-3), except you need to add an exclamation mark `!` in front. The syntax for inserting images is as follows:

```
![Alt text for screen readers](/path/to/image/on/local/absolute/path.jpg)

![Alt text for screen readers](../path/to/image/on/local/relative/path.jpg)

![Loading remote images](URL "Optional title")
```

![Alt text can also be displayed when the image does not load](/path/to/cat.jpg)

This is the website icon:

![Example of a successfully loaded image](https://markdown.aicando.xyz/logo-mini.png "MarkdownCanDo Icon")

## Combining Links and Images

Below is the link to the Chinese documentation of this project, which is also an image.

[![English documentation](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)

Analyzing its structure, it places an image inside a link, and then uses the format `[Image](link address)` to add the link.

```
Image:
![English documentation](https://img.shields.io/badge/English-Readme-blue?style=for-the-badge)

Link:
[Image](https://github.com/gantrol/MarkdownCanDo/blob/main/readme.md)
```

## Upload an image

In the editor, choose **Upload image**, paste an image from the clipboard, or drag an image file into the editable area. MarkdownCanDo uploads it and inserts the resulting Markdown image address for you. Replace the filename-style alt text with a short description of what the image shows.

Uploads are temporary and intended for this playground:

- JPEG, PNG, WebP, GIF, and AVIF are supported; SVG is not accepted.
- Each image can be at most 5 MiB.
- Each visitor can upload up to 10 images or 20 MiB per UTC day.
- The whole site can accept up to 300 images or 1 GiB per UTC day.
- Uploaded images stop working after 24 hours and are then automatically cleaned up.

Only the image is uploaded. Your Markdown text still stays in your browser. Do not upload confidential images or files you do not have the right to use.

Uploaded image addresses are protected against hotlinking. They display on MarkdownCanDo, but normally will not display after you copy the Markdown to GitHub, a blog, or another website. Before publishing elsewhere, download the image and upload it to that platform.
