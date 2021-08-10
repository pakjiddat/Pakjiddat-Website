---
title: Using JavaScript modules
date: "2018-11-25"
layout: post
draft: false
path: "/posts/using-javascript-modules"
tags:
  - "frontend web development"
description: "JavaScript Modules are an implementation of ES6 Modules. They allow a useful way to organize and reuse JavaScript code. JavaScript Modules consist of a set of features that provide module functionality."
---

JavaScript Modules are an implementation of ES6 Modules. They allow a useful way to organize and reuse JavaScript code. JavaScript Modules consist of a set of features that provide module functionality.

The **export** keyword allows exporting functions, constants, variables, class etc. For example:

```js
// lib.mjs
export function Test(param1) {
    return "Hello World !";
}
export const testdata = "Test"
```

The **import** keyword can be used to import exported functions and variables. For example:

```js
// main.mjs
import Test from ./lib.mjs;
Test("test argument");
```

In the above example, the lib.mjs must have a relative path or it should be specified with **http(s)**.

Module files are loaded like normal JavaScript files but with the **type** attribute set to **"module"**. The following example shows how to load a module:

```js
<script type="module" src="main.mjs"></script>
<script nomodule src="fallback.js"></script>
```

In the above example, the **fallback.js** file is loaded only by browsers that do not understand the JavaScript module standard. Browsers that understand module standard ignore the fallback.js script.

Modules are different from normal scripts in that they are always executed in **strict mode**. HTML style comments are not supported in modules. Instead single line comments should be used. Module scripts are loaded with **Cross Origin Resource Sharing (CORS)**. This means the HTTP response that delivers the module code should include the HTTP Header: **Access-Control-Allow-Origin: *** or similar.

Another feature of JavaScript modules is that they are loaded by the browser in deferred mode by default, which means they are downloaded while the page is being parsed. JavaScript module files should have the **.mjs** file extension, but it is not required. The important thing is that the file is served with **content-type** of **text/javascript;**.

Dynamic import allows loading JavaScript modules from within scripts. The following example shows how to load JavaScript modules dynamically:

```js
<script type="module">
  (async () => {
    const moduleSpecifier = './lib.mjs';
    const {repeat, shout} = await import(moduleSpecifier);
    repeat('hello');
    shout('Dynamic import in action');
  })();
</script>
```

See the article [Using JavaScript modules on the web](https://developers.google.com/web/fundamentals/primers/modules) for more information about using JavaScript modules.
