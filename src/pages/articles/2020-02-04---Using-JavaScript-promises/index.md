---
title: Using JavaScript promises
date: "2018-11-05"
layout: post
draft: false
path: "/posts/using-javascript-promises"
tags:
  - "frontend web development"
description: "A Promise is defined as an object representing the eventual completion or failure of an asynchronous operation. When creating a Promise object, we have to pass a function called executor as the constructor parameter. The function should accept two functions as arguments called resolve and reject."
---

A **Promise** is defined as an object representing the eventual completion or failure of an asynchronous operation. When creating a Promise object, we have to pass a function called **executor** as the constructor parameter. The function should accept two functions as arguments called **resolve** and **reject**.

The **resolve** function should be called by the executor to resolve the Promise. The **reject** function should be called to reject the promise. The following code shows how to create a Promise object:

```js
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

promise1.then(function(value) {
  console.log(value);
  // expected output: "foo"
});
```

The above code starts a timer for 300 ms. When the timer expires, the Promise is marked as resolved. Once the Promise has been resolved, a function is called which prints the value passed to the resolve function.

The **then** function is used to call functions that are called after a Promise has been resolved or rejected. It takes two parameters, the function to be called after the Promise has been resolved and the function to be called after the Promise has been rejected. It returns a Promise object. This allows chaining functions that need to be called asynchronously.

The catch function allows exceptions thrown inside the executor function to be handled. It takes a single parameter, which is the function to handle the error. The following example shows how the catch function works:

```js
var promise1 = new Promise(function(resolve, reject) {
  throw 'Uh-oh!';
});

promise1.catch(function(error) {
  console.log(error);
});
```

See the article [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for more information about using JavaScript promises.
