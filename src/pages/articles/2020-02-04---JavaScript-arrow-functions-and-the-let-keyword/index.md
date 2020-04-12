---
title: JavaScript arrow functions and the let keyword
date: "2018-11-25"
layout: post
draft: false
path: "/posts/javascript-arrow-functions-and-the-let-keyword"
category: "javascript"
tags:
  - "javascript"
description: "JavaScript arrow functions are unnamed functions which are best used as non-method functions. They provide a short hand notation for using functions. An arrow function consists of a list of function parameters followed by an arrow which is followed by an expression to be returned or a code block."
---

JavaScript arrow functions are unnamed functions which are best used as non-method functions. They provide a short hand notation for using functions. An arrow function consists of a list of function parameters followed by an arrow which is followed by an expression to be returned or a code block. The following code shows how to create an arrow function

```
let ToUpperWrapper = (value) => {value.toUpperCase();}

ToUpperWrapper("test");
```

The **let** keyword is used to define a variable with a local scope. A variable declared using let can only be used in the block, expression or statement in which it is used as well as in sub blocks. The **var** keyword allows a variable to be used globally or within a function block. Variables created with **var** can be accessed any where within the enclosing function

See the article [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/) for more information about using JavaScript arrow functions
