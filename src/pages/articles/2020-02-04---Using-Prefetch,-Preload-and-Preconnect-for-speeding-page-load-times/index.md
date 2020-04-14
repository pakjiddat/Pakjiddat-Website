---
title: Using Prefetch, Preload and Preconnect for speeding page load times
date: "2018-02-19"
layout: post
draft: false
path: "/posts/using-prefetch--preload-and-preconnect-for-speeding-page-load-times"
tags:
  - "html"
  - "css"
  - "javascript"
description: "Prefetch, Preload and Preconnect are mechanisms supported by modern web browsers that allow efficient loading of web resources."
---

Prefetch, Preload and Preconnect are mechanisms supported by modern web browsers that allow efficient loading of web resources.

**Preload** allows controlling how resources such as images, CSS and JavaScript files are loaded on the current page. For each resource that we want to preload, we have to use a link tag with rel="preload" attribute. The following examples show how to preload resources:

```
<!-- allows preloading an image -->
<link rel="preload" href="image.png">
<!-- allows preloading a font file -->
<link rel="preload" href="https://example.com/fonts/font.woff" as="font" crossorigin>
<!-- allows preloading css -->
<link rel="preload" href="https://blog.keycdn.com/blog/css/mystyles.css" as="style">
```

The main benefit of the preload directive is that it allows important resources to be loaded earlier. For example if there is a stylesheet or image that is required for a page to display properly, then it can be preloaded by adding the relevant link tags in the head section of the document.

**Prefetch** is similar to preload but allows efficient loading of resources that are likely to be accessed by the user, such as a next or previous link. A drawback of prefetch is that it can cause certain page metrics such as ad statistics, visitor count etc to be miscalculated. For example [Google Chrome has been known to miscalculate web analytics stats](https://www.scl.com/insights/blog/google-chrome-prefetchprerender-inflating-web-analytics-stats/). There are three types of prefetch directives:

* **link-prefetch**. It allows a link to be fetched in advance before it has been clicked by the user. The contents of the link are saved to the browser cache
* **dns-prefetch**. It allows the host name of the resource to be resolved in advance. It eliminates the dns resolution step when the resource is requested by the user
* **pre-render**. It allows a resource to be fetched and processed before being requested by the user. For example a link marked with the directive **rel="prerender"** will be fetched and processed by the browser. It should be used with caution as it can consume resources on mobile devices
* **preconnect**. The preconnect directive allows establishing tcp connections for a resource before it is actually requested. For example tls negotiations, tcp handshake and dns resolutions.

See the article [Resource Hints - What is Preload, Prefetch, and Preconnect?](https://www.keycdn.com/blog/resource-hints) for more information on using Prefetch, Preload and Preconnect.
