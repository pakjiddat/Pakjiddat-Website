---
title: Using cookies in Javascript
date: "2017-12-16"
layout: post
draft: false
path: "/posts/using-cookies-in-javascript"
tags:
  - "frontend web development"
description: "Cookies allow websites to store information on the user browsers. They are usually used to store website session related information."
---

Cookies allow websites to store information on the user browsers. They are usually used to store website session related information. To set a cookie using JavaScript we can use:

```js
document.cookie="cookie_name=cookie_value";
```

Multiple cookie values should be separated by ';'.

The cookie string can contain the date of expiry of the cookie as well as the URL path for which the cookie is valid. By default the cookie belongs to the current page. An example of setting a cookie using JavaScript:

```js
document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
```

To fetch the value of a cookie we can assign the document.cookie property to a variable. For example: **var cookies = document.cookie**. We will then have to parse the values of the individual cookies

To delete a cookie, we need to set the value of the cookie to an empty string and the value of the expires property to the required value

[Cookies in JavaScript: Ultimate Guide](https://www.guru99.com/cookies-in-javascript-ultimate-guide.html) is a useful guide that describes the relevance of cookies and how to create, access and remove cookies in JavaScript.
