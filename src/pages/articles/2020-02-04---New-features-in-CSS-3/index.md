---
title: New features in CSS 3
date: "2017-04-14"
layout: post
draft: false
path: "/posts/new-features-in-css-3"
category: "css"
tags:
  - "css"
description: "CSS 3 is well supported in all major browsers. Old versions of Internet Explorer such as Explorer 6 support most CSS 3 modules. Modules such as Font Face module are not supported in old browsers."
---

CSS 3 is well supported in all major browsers. Old versions of Internet Explorer such as Explorer 6 support most CSS 3 modules. Modules such as Font Face module are not supported in old browsers.

#### Rounded Corners
In CSS 2.1 rounded corner affect could only be achieved using background images. CSS 3 provides the border-radius declaration which produces rounded corners. e.g .round {border-radius: 10px}

#### Vendor Prefixes
Vendor prefixes are strings that are prepended to CSS 3 properties that are not supported by all browsers. e.g -khtml- prefix is for Konqueror web browser. -rim- prefix is for Rim browser. -ms- prefix is for Internet Explorer browser. -o- prefix is for Opera browser. -moz- prefix is for Mozilla Firefox browser. -webkit- prefix is for Chrome and Safari browsers. CSS styles are cascaded which means the styles lower down the order are applied later. Also more specific CSS selectors take precedence over less specific CSS selectors.

#### Multiple Columns
CSS 3 also allows dividing content into columns. For example it can divide content into columns of certain width or certain number of columns. The following code shows how this works:

```
<div id="main">
  column 1 text
  column 2 text
  column 3 text
</div>
<style>

#main {
  column-width: 12em; /** It will set the width of each column equal to 12 em; * OR use below style: */
  column-count : 3; /** It will divide the content into 4 columns */
}
</style>
```

#### Word Wrap
CSS 3 provides the word-wrap style which allows wrapping a word if it exceeds the bounds of its container. e.g **#main {word-wrap: break-word;}**.

#### Attribute Selectors
CSS 3 provides attribute selectors. It allows selecting a HTML tag with a certain attribute. e.g:

```
img[alt] {
  border: 3px dashed #e15f5f;
}
```

Applies a dashed border to all images on the page with alt attribute.

```
img[alt="film"] {
  border: 3px dashed #e15f5f;
}
```

Applies a dashed border to all images on the page with alt attribute that starts with "film". If alt*="film" was used instead, then it would match all images with alt tag containing the text film. If alt$="film" was used then it would match all images with alt tag that ends with film. CSS 3 also allows id values to start with a number. e.g id="1940year".

#### CSS3 structural pseudo-classes
CSS 3 also introduces the following selectors known as pseudo-classes: **:nth-child(n), :nth-lastchild(n), :nth-of-type(n), and :nth-last-of-type(n)**, where n can be a number, arithmetic progression, odd, even. e.g:

```
nav ul li:nth-child(2n+3) a {
 color: #fe0208;
}
```

will apply the color to all list items with position 3, 5, 7, 9 and so on.

```
nav ul li:not(.internal) a {
 color: #fe0208;
}
```

will apply the color to all list items with class not equal to internal and that contain &lt;a&gt; tag.

**li:: first-line {color: red;}** will apply the color red to the fist line in the list tag.

```
p::after {
    content: " - Remember this";
}
```

will apply the content after the paragraph tag

#### Custom Web Typograhpy
CSS 3 also allows the use of custom font types using the @font-face syntax. e.g:

```
@font-face {
 font-family: 'BebasNeueRegular';
 src: url('BebasNeue-webfont.eot');
}
```

Will load the font file BebasNeue-webfont.eot and make give it the font-family name of BebasNeueRegular. Following are the main types of fonts used for websites:  Embedded OpenType (EOT), TrueType (TTF), Scalable Vector Graphics (SVG) and Web Open Font Format (WOFF).

#### Responsive font size unit
CSS 3 introduced the vw unit, which implies percentage of the viewport. e.g: h1 { font-size: 8vw }, implies the font size is 8% of the viewport width. e.g if viewport width is 200mm, then font-size of h1 elements will be 16mm.

#### New Color formats and Alpha transparency
CSS 3 introduced following new color formats: RGB, HSL. RGBA and HSLA allow specifying the alpha transparency. Alpha transparency allows the opacity value of a certain tag to be set. For example a certain portion of a page can have a different opacity then the other portions.

#### Some useful websites:

* [https://www.internetadvisor.com/best-internet-browser](https://www.internetadvisor.com/best-internet-browser)
* [https://caniuse.com/](https://caniuse.com/)
* [http://www.fontsquirrel.com/](http://www.fontsquirrel.com/)
* [https://www.w3.org/TR/css3-values/#viewport-relative-lengths](https://www.w3.org/TR/css3-values/#viewport-relative-lengths)
* [https://css-tricks.com/logic-in-media-queries/](https://css-tricks.com/logic-in-media-queries/)
