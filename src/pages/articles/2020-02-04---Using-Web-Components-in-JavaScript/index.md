---
title: Using Web Components in JavaScript
date: "2018-11-05"
layout: post
draft: false
path: "/posts/using-web-components-in-javascript"
category: "javascript"
tags:
  - "javascript"
description: "Web Components is a suit of different technologies that allow creating and using reusable custom HTML elements. Currently it is based on the three main features which are: Custom Elements, Shadow DOM and HTML Templates."
---

Web Components is a suit of different technologies that allow creating and using reusable custom HTML elements. Currently it is based on the three main features which are: Custom Elements, Shadow DOM and HTML Templates.

A Web Component is created by registering a class which defines the component. The component can then be used in two ways. It can either extend the functionality of an existing element such as a paragraph tag, or it can define a custom element with its own name.

A custom element can be defined using the following:

```
customElements.define('word-count', WordCount, { extends: 'p' });
```

The first argument is the name of the component. The second argument is the name of the class which defines the Web Component. It should be a valid ES6 class name. The class may extend **HTMLElement** or another HTML class such as **HTMLParagraphElement**. The third argument is an optional argument which specifies the HTML element that the custom element is based on.

The **Shadow DOM API** allows the custom element to keep its markup, style and code separate without effecting other parts of the page. The **attachShadow** allows a shadow root to be attached to any DOM element. Once the shadow root has been attached, it can be used like any other DOM element. For example, elements and styles can be added to it using JavaScript. The following example shows how to create the shadow root and attach it to the custom element:

```
// Create a shadow root
var shadow = this.attachShadow({mode: 'open'});
```

The **mode** parameter indicates whether the Shadow DOM should be accessible to the main page. For example the **video** tag contains a Shadow DOM which is in closed mode. Which means we cannot access its **shadowRoot** property.

**Templates** and **Slots** are another part of Web Components. A template is an inert block of code which is not directly rendered by the browser. It is defined using **Template** tag. The following code defines a template:

```
<template id="my-paragraph">
  <p>My paragraph</p>
</template>
```

A template is rendered by fetching its contents and appending it to a DOM element using JavaScript. The following shows how to use a template:

```
let template = document.getElementById('my-paragraph');
let templateContent = template.content;
document.body.appendChild(templateContent);
```

**Slots** provide placeholders for template values. Slots are defined using the **slot** tag. A slot tag has a **name** attribute which is used to access the slot from the custom element tag.

Slots are first defined inside the template tag using the **slot** tag. Then they are used inside the custom element tag by using the attribute **slot** on an HTML element such as **span** or **div**. The value of the slot attribute is the name of the slot tag defined in the template.

See the article [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for more information about how to use Web Components in JavaScript.
