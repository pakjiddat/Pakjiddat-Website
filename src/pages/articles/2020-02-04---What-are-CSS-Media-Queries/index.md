---
title: What are CSS Media Queries
date: "2017-04-14"
layout: post
draft: false
path: "/posts/what-are-css-media-queries"
tags:
  - "frontend web development"
description: "CSS Media Queries allow us to use CSS rules for particular media"
---

CSS Media Queries allow us to use CSS rules for particular media

Media Queries are a new feature of CSS3. CSS 2.1 also supported Media specific styles. For example the media attribute of the link tag allows us to use different style sheets for different media. For example print or screen media.

CSS Media Queries are used inside CSS Style Sheets. They have the format: **@media query {css_rules}**, where query is the CSS query and CSS_rules are the CSS rules that are applied when the query returns true.

The query parameter can have different values such as the device width. e.g the following media query sets the background color to red if the screen width is 960px or less.

```css
@media screen and (max-width: 960px) {
 body {background-color: red;}
}


@media screen and (max-device-width: 960px) {
 body {background-color: red;}
}
```

The above media query sets the body background color if the maximum device width is 960px or less.

Multiple media queries can be used and separated either with and or with ','. ',' has same affect as 'or' operator.
