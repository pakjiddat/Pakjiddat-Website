---
title: Adding scroll to top button to a Gatsby website
date: "2020-04-26"
layout: post
draft: false
path: "/posts/adding-scroll-to-top-button-to-gatsby-website"
tags:
  - "headless cms"

description: "Scrolling to top is a useful feature for Blogs. It allows readers to scroll to the top of the page any time with a single click of a button. In this article I will describe how to add a scroll to top button to a Gatsby website."
---

### Introduction
Scrolling to top is a useful feature for Blogs. It allows readers to scroll to the top of the page any time with a single click of a button. In this article I will describe how to add a scroll to top button to a Gatsby website.

### Client side script
To add scroll to top feature, we need to add a button and a JavaScript file. The JavaScript file will be used client side. Create a file called gatsby-browser.js in the root folder. It should have following contents:

```js
/** The SideBarBtns class */
class SideBarBtns {

  /** Used to register the scroll event handler */
  Initialize() {
    /** When the user scrolls down 300px from the top of the document, show the buttons */
    window.addEventListener("scroll", this.ToggleButtons)
    /** Event handler for toogle toc button */
    document.getElementById("toggle-toc-btn").addEventListener("click", this.ToggleTocBox);
    /** Event handler for scroll to top button */
    document.getElementById("scroll-btn").addEventListener("click", this.ScrollToTop);
  }

  /** Displays/Hides the buttons */
  ToggleButtons() {
    /** If the current current scroll is 300px or more */
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      /** The scroll to top button is displayed */
      document.getElementById("scroll-btn").style.display = "block";
      /** The toggle toc button is displayed */
      document.getElementById("toggle-toc-btn").style.display = "block";
    } else {
      /** The scroll to top button is hidden */
      document.getElementById("scroll-btn").style.display = "none";
      /** The toggle toc button is hidden */
      document.getElementById("toggle-toc-btn").style.display = "none";
    }
  }

  /** When the user clicks on the button, scroll to the top of the document */
  ScrollToTop() {
    /** The user is scrolled to the top of the page */
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  /** When the user clicks on the button, make the toc box invisible */
  ToggleTocBox() {
    /** If the toc box is hidden */
    if (document.getElementById("tox-box").style.display === "none") {
      /** The toc box is displayed */
      document.getElementById("tox-box").style.display = "block";
    } else {
      /** The toc box is displayed */
      document.getElementById("tox-box").style.display = "none";
    }
  }
}


exports.onRouteUpdate = () => {
  /** The SideBarBtns object is created */
  let sidebarbtns = new SideBarBtns();
  /** If the current page is an article page */
  if (document.getElementById("scroll-btn")) {
    /** The SideBarBtns object is initialized */
    sidebarbtns.Initialize();
  }
}

```

The above file will be automatically included by Gatsby.

### Adding the scroll to top button
Next add the following scroll to top button to your post template file:

```html
<button id="scroll-btn" className="sidebar-btns" title="Scroll to top"></button>
```

### Styling the button

Add the following CSS styles to the local **style.scss** file of your post template component.

```css
.sidebar-btns {
  display: none;
  position: fixed;
  bottom: 50px;
  right: 10%;
  z-index: 99;
  font-size: 1.125rem;
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
  padding: 0.9375rem;
  border-radius: 0.25rem;
  background-image: url("/arrow-up.svg");
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  background-position: center;
}

#scroll-btn {
  right: 15%;
  background-image: url("/arrow-up.svg");
  background-color: burlywood;
}
```

The arrow-up icon which is used as the button background can be downloaded from:

```bash
https://pakjiddat.netlify.com/arrow-up.svg
```

The icon should be placed in a folder called static in the root folder.

### Conclusion
In this blog post I have described how to add scroll to top button to a Gatsby blog. The button's style can be changed by editing the given CSS code.
