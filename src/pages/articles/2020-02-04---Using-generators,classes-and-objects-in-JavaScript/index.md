---
title: Using generators, classes and objects in JavaScript
date: "2018-11-08"
layout: post
draft: false
path: "/posts/using-generators--classes-and-objects-in-javascript"
tags:
  - "frontend web development"
description: "All values in JavaScript are objects except for primitive values which have no methods and properties."
---

#### JavaScript Objects
All values in JavaScript are objects except for primitive values which have no methods and properties.

JavaScript defines 5 primitive data types, which are: **string, boolean, null, undefined and number.**

A JavaScript object is a collection of named values which are called properties. An object property can be a primitive, function or an object.

An object method is an object property containing a function definition.

Examples of creating JavaScript objects:

```js
var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
```

```js
var person = new Object();
```

```js
/** The Object.create creates an object from an existing object */
const me = Object.create(person);
```

JavaScript objects are said to be mutable or changeable. When an object is assigned to another object, the assignment is done by reference. A new object is not created.

All JavaScript objects are descendants of the built in **Object**. All objects inherit properties that are in **[Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)**. These properties may be overridden by the objects. For example **toString()** method.

#### JavaScript classes
**ES6** introduced a new keyword **class**, which allows creating classes using syntax that is common to most programming languages. The [class syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) also allows inheritance. The class syntax is just a wrapper for **object.prototype**. It is implemented using the built in **object.prototype** property.

A major different between function declarations and class declarations is that functions are hoisted while classes are not. When we say that function declarations are hoisted, it means that a function can be called before it is defined, while a class cannot be used before it is defined. Following example shows how to declare and use a JavaScript class:

```js
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.area = (width *height);
  }
  get area() {
    return this.calcArea();
  }
  set area(new_area) {
    this.area=new_area;
  }
}
const p = new Rectangle(10, 4);
let area = p.area;
p.area   = 20;
```

The **constructor** keyword defines a function that is automatically called when an object is instantiated. The **get** and **set** keywords allows functions to be called when a property is read or updated.

Functions prefixed with **static** keyword are called on the class. They cannot be called on an instance of the class. The **extends** keyword allows a class to inherit properties and methods from another class. The **super** function should be the first line of code in the class constructor. It calls the parent class constructor.

The W3school website provides useful information about [JavaScript classes and objects](https://www.w3schools.com/js/js_object_definition.asp).

#### Using Generators in JavaScript
Generators were introduced in ES6. One of the benefits of Generators is that they allow efficient handling of large arrays. JavaScript implements generators using the **yield** keyword and **function*** function declaration.

The **function*** denotes a generator function. Within the function, the yield keyword can be used. The following code describes how to use generators in JavaScript:

```js
function* collection_name()
{
    yield 1;
    yield 3;
    yield 5;
    yield 7;
}

for(let count of collection_name())
{
    console.log(count);
}
```

See the part 10 of the tutorial [ECMAScript 6 Complete Tutorial](http://qnimate.com/javascript-yield-keyword-and-function-syntax/) for more information about using Generators in JavaScript
