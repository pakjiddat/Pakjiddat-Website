---
title: Customizing Redmine layout
date: "2017-03-13"
layout: post
draft: false
path: "/posts/customizing-redmine-layout"
tags:
  - "javascript"
  - "css"
description: "The user interface of Redmine can be easily customizing using the redmine_custom_css and redmine_custom_js plugins."
---

The user interface of Redmine can be easily customizing using the [redmine_custom_css](http://www.redmine.org/plugins/redmine_custom_css) and [redmine_custom_js](http://www.redmine.org/plugins/redmine_custom_js) plugins.

To add a background image to the Redmine login page the following JavaScript code can be used:

```js
$( document ).ready(function() {
  if ($("#top-menu").html().indexOf("Sign out") &lt; 0) {
    document.getElementById('main').classList.add("custom-background");
    document.querySelector("#content > h2").classList.add("hide");
    document.querySelector(".splitcontentleft").classList.add("float-right");    
  }
});
```

The above code checks if the "Sign out" link is present in the header. If it is not present, then it adds a CSS class called "custom-background" to the div with id "main". It also does some minor formatting of the layout. The "custom-background" CSS class may be defined with the help of the redmine_custom_CSS plugin. It can be defined as follows:

```css
.custom-background {
  background: #ffffff url(https://example.com/background.jpg) no-repeat scroll 50px 0 !important;
}
```

We can edit the Redmine top menu bar with the help of the redmine_custom_js plugin. For example the following code adds a new menu item to the top menu bar when the user is logged in:

```js
if ($("#top-menu").html().indexOf("<ul>")>0) {
  var updated_list_items = "<li class='item-0'><a href='https:/example.com/'>Company Name</a></p></li>";
  updated_list_items     = updated_list_items + ($("#top-menu > ul").html());
  $("#top-menu > ul").html(updated_list_items);
}
```

The above code first checks if the list of menu items is present. If it is present, then it creates a new menu item and adds it to the front of the list of menu items.
