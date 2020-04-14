---
title: Adding event listeners using JavaScript
date: "2018-04-04"
layout: post
draft: false
path: "/posts/adding-event-listeners-using-javascript"
tags:
  - "javascript"
description: "The addEventListener function can be used to listen for events. The function can be called on any HTML DOM object such as HTML elements, HTML document, the window object or objects that support events such as xmlHttpRequest. The following example shows how to attach event listener to the window object:"
---

The addEventListener function can be used to listen for events. The function can be called on any HTML DOM object such as HTML elements, HTML document, the window object or objects that support events such as xmlHttpRequest. The following example shows how to attach event listener to the window object:

```
window.addEventListener("resize", function(){
    document.getElementById("demo").innerHTML = sometext;
});
```

The above code sets the inner HTML of the HTML element with id 'demo' to some text. The first parameter of the addEventListener function is the name of the event to monitor. The second argument is the handler function. An optional third argument allows specifying the event propagation method.

Two event propagation methods are supported. "Bubbling" and "Capturing". The Bubbling method implies that the events are handled from inside out. For example if a div tag contains a paragraph tag, and the paragraph tag is clicked, then the event handler for the paragraph tag will be called first and then the event handler for the div tag will be called.

In the "Capturing" method of event propagation, the events are handled from the outside in. In the previous example, if we click on the paragraph tag, the event handler for the div tag will be called first, followed by the event handler for the paragraph tag.

See the W3schools article [JavaScript HTML DOM EventListener](https://www.w3schools.com/js/js_htmldom_eventlistener.asp) for more information
