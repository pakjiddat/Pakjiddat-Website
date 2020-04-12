---
title: Adding drag and drop to list items
date: "2017-10-02"
layout: post
draft: false
path: "/posts/adding-drag-and-drop-to-list-items"
category: "html"
tags:
  - "html"
description: "In order to drag and drop HTML list items, we need to set the draggable attribute of the list items to true. We also need to define event handlers on the list items for the following events: dragstart, drop and dragover."
---

In order to drag and drop HTML list items, we need to set the draggable attribute of the list items to true. We also need to define event handlers on the list items for the following events: **dragstart, drop and dragover**.

The **dragstart** event is called when the user starts to drag a list item. In this event, the user should do three things. Firstly set the allowed drag and drop event to 'move'. Secondly save the inner html of the list item and thirdly save the list item object or an id of the list item object.

The **drop** event is called when the user drops a list item. The event handler for this event should first prevent the default drop action of the browser, which is to open the dragged item in a new tab. The saved inner html of the original list item should be fetched and set to the innerHTML property of the current list item. The original list item should be fetched and its innerHTML property should be set to the innerHTML property of the current list item.

The **dragover** event is called when the user drags a list item. The event handler for this event should prevent the default dragover action of the browser, which is to open the dragged item in a new tab.

The following code can be used:

```
/** Listen for dragstart events */
list_item.addEventListener('dragstart', function(ev) {
  /** The allowed event is set to move */
  ev.dataTransfer.effectAllowed          = 'move';
  /** The html content of the list item is saved */
  ev.dataTransfer.setData('text/html', ev.target.innerHTML);
  /** The current list item object is set */
  current_list_item           = ev.target;
}, false);

/** Listen for drop events */
list_item.addEventListener('drop', function(ev) {
  /** The default drop action is prevented */
  ev.preventDefault();
  /** The saved list item html data is fetched */
  var data                               = ev.dataTransfer.getData("text/html");
  /** The current list item html */
  var list_item_html                     = ev.target.innerHTML;
  /** The list item html is set */
  ev.target.innerHTML                    = data;
  /** The original list item html is set */
  current_list_item.innerHTML = list_item_html;
}, false);

/** Listen for drop events */
list_item.addEventListener('dragover', function(ev) {
  ev.preventDefault();
}, false);
```

The above code allows list items to be dragged and dropped. When a list item is dropped, the dropped item and the item on which the drop occurred are swapped.

See the [W3school's guide on Html 5 Drag and Drop](https://www.w3schools.com/html/html5_draganddrop.asp) for more information on HTML 5 Drag and Drop.
