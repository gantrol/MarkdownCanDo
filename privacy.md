---
title: Privacy Policy
description: Read how MarkdownCanDo handles editor text, browser storage, analytics data, external services, and privacy-related requests.
---

# Privacy Policy

Last updated: August 29, 2026.

This policy explains how MarkdownCanDo handles information when you use the website and its browser-based Markdown tools.

## Editor content

The Markdown editor processes the text you enter in your browser. MarkdownCanDo does not provide accounts or cloud document storage. Copy and save your work before closing or refreshing a page.

Do not enter confidential or sensitive information into any online tool unless you have assessed whether that use is appropriate for you or your organization.

## Image uploads

When you actively choose, paste, or drop an image into the editor, that image is sent to Cloudflare R2 and stored temporarily so it can appear in the preview. The original filename is not stored in the object address. The site stops serving an image 24 hours after upload; R2 lifecycle deletion of the underlying object may take up to about 24 additional hours.

To enforce per-visitor and rolling storage limits without retaining the full IP address, the upload service stores a secret-keyed pseudonymous identifier derived from the connection address and the current UTC date, together with daily byte and file counts. The identifier changes each day, cannot be reproduced without the service secret, and quota records are automatically deleted after approximately three days. Cloudflare may process request and security data as part of providing the website infrastructure.

Uploaded image addresses are protected against normal cross-site hotlinking, but images should still be treated as publicly retrievable content rather than private storage. Do not upload confidential, personal, or rights-infringing images.

## Analytics

MarkdownCanDo uses Google Analytics to understand aggregate site usage, such as visited pages, device and browser information, approximate location, and interactions. Google may process this data under its own terms and privacy policies.

## Browser storage

The site may use local browser storage for interface preferences and client-side features, such as theme or search preferences. You can clear this data using your browser settings.

## External services and links

Some pages link to or display resources from third-party services, including GitHub and documentation providers. Those services have their own privacy practices. Following an external link leaves MarkdownCanDo.

## Changes and questions

This policy may change when site features or legal requirements change. Material updates will be reflected by the date above. To ask a privacy question, use the options on the [contact page](/contact). See also the [terms of use](/terms) and [about page](/about).
