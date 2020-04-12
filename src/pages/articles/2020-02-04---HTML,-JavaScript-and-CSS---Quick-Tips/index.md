---
title: HTML, JavaScript and CSS - Quick Tips
date: "2019-04-03"
layout: post
draft: false
path: "/posts/html--javascript-and-css---quick-tips"
category: "quick tips"
tags:
  - "quick tips"
  - "javascript"
  - "html"
  - "css"
description: "Following are some quick tips related to HTML, JavaScript and CSS:"
---

Following are some quick tips related to HTML, JavaScript and CSS:

#### [Free Font for Urdu language](http://www.cle.org.pk/software/localization/Fonts/nafeesWebNaskh.html)
A free font for Urdu language is provided by a Pakistani Organization called Center for Language Engineering (CLE). The organization conducts research and development in linguistic and computational aspects of languages, specifically of Pakistan and developing Asia

#### [How to use CCS rules specific to FireFox](http://stackoverflow.com/questions/952861/targeting-only-firefox-with-css)
The CSS statement:

```
@-moz-document url-prefix() {
  h1 {color:red}
}
```

allows the CSS rule: h1 {color:red} to be applied only to Firefox browser

#### [Using ems instead of Pixels for Typography](https://www.w3schools.com/cssref/css_pxtoemconversion.asp)
EM is a unit for font sizes. It is based on the font size of the container element.
For example if an element has a font-size set to 2em and the font-size of the container element is set to 20px, then the font-size of the target element will be 40px

#### [Replacing a string using Javascript replace function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
The replace function can be used to replace a substring with another string using regular expressions.
For example: **str.replace(/substring/g, 'New Substring');** will replace all occurrences of 'substring' with 'New Substring'

#### [Base64 Encoding of utf-8 encoded string using Javascript](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_.22Unicode_Problem.22)
The btoa function encodes an ASCII encoded string using Base64 encoding scheme. If the string is utf-8 encoded then the btoa function will not work correctly. The solution is to first url encode the string using encodeURIComponent and then call window.btoa function.

#### [Passing parameters to Jquery event handler function](http://stackoverflow.com/questions/4897368/how-to-use-a-function-that-takes-arguments-with-jquerys-change-method)
To pass a parameter to Jquery event handler, the parameter should be given as first argument to event function. The argument will be passed on as a property of event.data. For example:

```
jQuery(".selector").change({parameter: value}, function(event){
    user_function(event.data.parameter);
});
```

#### [Fetching HTML elements using JavaScript](https://www.w3schools.com/jsref/prop_node_parentnode.asp)
**Fetching parent node element of a HTML node**. We can fetch the parent node of a HTML element using following code:
```
var x = document.getElementById("myLI").parentNode.nodeName;
```
**Fetching HTML elements using CSS class names**. We can fetch HTML elements from CSS classes using following JavaScript code:
```
var x = document.getElementsByClassName("example");
```
**Fetching html elements using CSS selectors with Javascript**. The following Javascript code fetches html elements using CSS selectors:
```
var x = document.querySelectorAll(".example");
```

#### [Get current unix timestamp using Javascript](https://www.w3schools.com/jsref/jsref_gettime.asp)
The Javascript function getTime returns the number of milliseconds since Jan 1st, 1970, which is called the unix timestamp

#### [Adding tilt effect to images using tilt.js](http://gijsroge.github.io/tilt.js/)
Tilt.js is a library that allows adding tilt effect to HTML elements. For example div and image tags. To add a tilt affect to an image, the following code may be used:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Tilt.js - DEMO</title>
    <script src="js/jquery.slim.min.js"></script>
    <script src="js/tilt.jquery.min.js"></script>
    <script>
      $(document).ready(function () {
          var tilt = $('.js-tilt').tilt();
          var tiltOutput = $('.js-tilt-output').tilt();
          tiltOutput.on('change', function (e, transforms) {
              var output = $(this).closest('.js-parent').find('.js-output');
              $('<li><strong>X: </strong>' + transforms.percentageX + ' | <strong>Y: </strong>' + transforms.percentageY + '</li>').prependTo(output);
          });

          $('.js-destroy').on('click', function () {
              var element = $(this).closest('.js-parent').find('.js-tilt');
              element.tilt.destroy.call(element);
          });

          $('.js-enable').on('click', function () {
              var element = $(this).closest('.js-parent').find('.js-tilt');
              element.tilt();
          });
      });
    </script>
  </head>
  <body>
    <main>
      <a target="_blank" href="[some-url]">
	<img src="[image-url]" class="js-tilt" data-tilt-speed="1000" data-tilt-max="20" data-tilt-scale="1.2" data-tilt-perspective="250" width="961px"></a>
    </main>
  </body>
</html>
```

#### [Scrolling to specific position in page](https://www.w3schools.com/jsref/met_win_scrollto.asp)
To scroll the page to a particular position, the following code may be used:

```
var temp_arr = location.href.split('#');
var div_id   = temp_arr[1];
var position = $('#' + div_id).position();
window.scrollTo(0, (position.top -100));
```

The above code causes the current page to scroll to a certain div. The id of this div is given by the URL hash fragment.

The code uses the JQuery **position** function to get the left and top co-ordinates of the div tag. The **window.scrollTo** function is used to scroll 100px above this div tag, so it can be viewed properly.

#### [Preloading font files](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization#the_font_loading_api)

In order to use custom fonts that are not supported by the browser, we need to load a font file. Sometimes the font file may take a while to fetch, because of which the website text is displayed with default font. This usually happens with slow internet connections.

This can be a problem for websites that need to display text in a foreign language such as Urdu or Arabic. To prevent this problem, we can preload the font file. This allows the browser to load the font file before other content. It increases the chances of displaying text with correct font.

If the text is still not displayed with correct font, then we can use the Font API to load the font files. The Font API provides a JavaScript interface for loading font files. It allows monitoring loading of files. It can be used to hide text until a font file has completed loading.

The article [Preloading @font-face fonts?](https://stackoverflow.com/a/46830425) discusses how to preload font files. The following code may be used to preload font files:

```
<link rel="preload" href="/ui/font/NafeesWeb.ttf" as="font" crossorigin="anonymous" />
<style>
@font-face {
  font-display: auto;
  font-family: NafeesWeb;
  src: local(NafeesWeb),url(/ui/font/NafeesWeb.ttf);
}
```
