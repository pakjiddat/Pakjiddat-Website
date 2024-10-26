---
title: New features in HTML 5
date: "2017-04-14"
template: post
draft: false
slug: "/posts/new-features-in-html-5"
category: "web development"
tags:
  - "web development"
description: "HTML 5 is the latest version of the HTML specification after HTML 4.01. The HTML standard is maintained by the W3C."
---

HTML 5 is the latest version of the HTML specification after HTML 4.01. The HTML standard is maintained by the W3C.

HTML 5 contains many new features. The basic structure of a HTML 5 document is as follows:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
</head>
<body>
</body>
</html>
```

HTML 5 has very loose type checking and does not require closing '/' for void tags such as meta tag or img tag. It also does not require enclosing quotation marks and optional attributes such as type attribute for script and link tags.

Several tags are now considered as obsolete in HTML 5. e.g frame and frameset tags.

Some new structural elements introduced in HTML 5 are: section, hroup, article, nav, aside, header, footer, address.

HTML 5 supports following [inline elements](http://w3c.github.io/html/textlevel-semantics.html#textlevel-semantics): &lt;b&gt; (bold text), &lt;i&gt; (italics text), &lt;em&gt; (for emphasizing text).

HTML 5 also provides support for accessibility. The [WAI-ARIA standard](https://www.w3.org/WAI/intro/aria) makes web content and web applications more accessible to people with disabilities. One of the main features of WAI-ARIA is [landmark roles](https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page). The role attribute can be added to any HTML element. The value of the role attribute indicates the use of the HTML element. e.g **&#x3C;nav role=&#x22;navigation&#x22;&#x3E;** implies the nav tag is used for navigation. The role attribute can have fixed values.

HTML 5 provides the video and audio elements. It allows playback of video and audio files. The video element is used just like the img element. A video element can include several nested source elements. Each source element is a video source file. The audio element works similarly.

HTML 5 also [allows offline access](/posts/making-webpages-work-offline). To allow a HTML 5 application to be accessed offline, we need to add the manifest attribute to the HTML tag. The value of this attribute is the URL of the manifest file. The manifest file lists the resources that should be available to the application when it is offline. For example the images, CSS and JavaScript files
