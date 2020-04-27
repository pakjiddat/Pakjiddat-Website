---
title: ES6 brings new features to JavaScript
date: "2018-11-08"
layout: post
draft: false
path: "/posts/es6-brings-new-features-to-javascript"
tags:
  - "javascript"
description: "The ES6 standard has introduced several changes to JavaScript. These changes include Classes, Proxies, Promises, Modules, Iterators and Generators and more"
---

The ES6 standard has introduced several changes to JavaScript. These changes include [Classes](/research/all/using-classes-and-objects-in-javascript), Proxies, Promises, Modules, Iterators and Generators and more

The **for of** syntax allows iterating over an array. The following example shows how it works:

```js
var array = [4, 5, 3, 7, 9];

//'i' refers to the values of the array indexes
for(var i of array)
{
    console.log(i); //4, 5, 3, 7, 9
}
```

The spread operator which is **"..."** allows expanding an array. It can be used to allow functions to take indefinite number of arguments. For example:

```js
//args variable is an array holding the passed function arguments
function function_one(...args)
{   
    console.log(args);
    console.log(args.length);
}

function_one(1, 4);
function_one(1, 4, 7);
function_one(1, 4, 7, 0);
```

ES6 also allows functions to return multiple values. It allows a function to return a numerically indexed array. Its values can be assigned to multiple variables. For example:

```js
function function_name()
{
    return [6, 2, 3, 4, 5, 3]; //here we are storing variables in an array and returning the array
}

var a, b, c, d, e, f;

[a, b, c, d, e, f] = function_name();
```

The **const** keyword is used to declare constant variables. A variable prefixed with **const**, cannot be updated. Also we cannot declare more than one variable with same name and scope as constant

See the article [ECMAScript 6 Complete Tutorial](http://qnimate.com/post-series/ecmascript-6-complete-tutorial/) for more information about the new ES6 features
