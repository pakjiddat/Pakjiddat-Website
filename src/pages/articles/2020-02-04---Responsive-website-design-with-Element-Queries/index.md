---
title: Responsive website design with Element Queries
date: "2019-03-18"
layout: post
draft: false
path: "/posts/responsive-website-design-with-element-queries"
tags:
  - "responsive website design"
description: "Element Queries allow changing the size of a HTML element based on the style of other elements. Element queries are similar to media queries, but are based on element size instead of browser or view-port size."
---

Element Queries allow changing the size of a HTML element based on the style of other elements. Element queries are similar to media queries, but are based on element size instead of browser or view-port size.

Element Queries are not supported by browsers natively like media queries. Two libraries that implement element queries are: [EQCSS](https://elementqueries.com/) and [CSS Element-Queries](https://github.com/marcj/css-element-queries). Both libraries are small sized JavaScript files, that parse contents of CSS files and run the element queries defined in the file.

The [CSS Elements Query](https://github.com/marcj/css-element-queries) library has a feature called ResizeSensor. It allows JavaScript code to be run, when an element is resized. It can be used to change layout of pages that display dynamic content such as ads.

The [Specification for CSS Element Queries](https://tomhodgins.github.io/element-queries-spec/element-queries.html#introduction) describes how CSS Element Queries work

See the question [Can media queries resize based on a div element instead of the screen?](https://stackoverflow.com/questions/12251750/can-media-queries-resize-based-on-a-div-element-instead-of-the-screen) on Stack-overflow for more information about Element queries  
