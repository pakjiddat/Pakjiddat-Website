---
title: Using await and async with Promises
date: "2018-11-08"
template: post
draft: false
slug: "/posts/using-await-and-async-with-promises"
category: "frontend web development"
tags:
  - "frontend web development"
description: "The async keyword is used when declaring functions. A function declared with async must return a promise. If a function is declared with async and it does not return a promise, then the JavaScript engine will automatically convert the return value of the function to a promise object."
---

The **async** keyword is used when declaring functions. A function declared with async must return a **promise**. If a function is declared with async and it does not return a promise, then the JavaScript engine will automatically convert the return value of the function to a promise object. For example the following functions are both valid async functions:

```js
async function f() {
  return Promise.resolve(1);
}
```

```js
async function f() {
  return 1;
}
```

The **await** keyword is used to wait for a promise to resolve. It causes code execution to wait until the promise has been resolved. The await keyword can only be used inside functions declared with async. It cannot be used inside regular functions. The following example shows how to use the await keyword:

```js
async function Test() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait till the promise resolves

  alert(result); // "done!"
}

Test();
```

See the article [Async/await](https://javascript.info/async-await) for more information about using **await** and **async** with JavaScript Promises.
