---
title: Responsive website design with Twitter Bootstrap
date: "2017-04-11"
layout: post
draft: false
path: "/posts/responsive-website-design-with-twitter-bootstrap"
tags:
  - "responsive website design"
description: "Designing your website so it is accessible on all type of devices is a popular topic and is often referred to as Responsive Website Design. This blog post describes my experience of developing a website according to Responsive Website Design principles."
---

### Introduction

Designing your website so it is accessible on all type of devices is a popular topic and is often referred to as Responsive Website Design. This blog post describes my experience of developing a website according to [Responsive Website Design](http://en.wikipedia.org/wiki/Responsive_web_design) principles.

### Optimizing your website for mobile devices

These days a lot of website visitors use mobile devices. Mobile devices are usually small with much less resources than a desktop computer. A website that loads normally on a desktop computer may load very slowly on a mobile device. For example some buttons may be too close to each other or may be to small to select.

There are different ways in which you can provide a good web browsing experience to mobile users of your website. You can construct a separate version of your website for mobile devices and redirect mobile users automatically to the mobile version.

Another option is to construct an application for mobile devices that can be downloaded from an App Store like Google Play. The drawback of these two approaches is that you need to maintain separate versions of your website for different users. My customer wanted a single website that works equally well on desktop computers and mobile devices. The solution was to construct the website based on Responsive Website Design principles.

### Using the Responsive web framework, Twitter Bootstrap
My approach was to use a Responsive web framework for developing the website. I decided to use [Twitter Bootstrap](ttps://getbootstrap.com/). Twitter Bootstrap is a very popular web framework based on HTML 5

It provides several components that work equally well on desktops and mobile devices. Downloading the Twitter Bootstrap library and using one of its examples as the layout for the website was simple

### The Problem
The main problem was that the customer wanted the footer and left sidebar of his website to look like the ones on [Digital Ocean](https://www.digitalocean.com/).

### The solution: Use browser detection code
The answer to our problems was to use code that detects the size of the web browser. Most modern libraries support browser detection. I used following browser detection options:

#### [CSS Media Queries](http://www.w3schools.com/cssref/css3_pr_mediaquery.asp)
CSS Media Queries are supported in CSS3. They allow us to use certain CSS statements depending on the dimensions of the device. They provide a very simple way of getting your website to look good on mobile devices. For example the following CSS Media Query code will cause the browser to use certain CSS classes if the width of the browser is 600px or less:

```css
/** Condition */
@media screen and (max-device-width: 600px), screen and (max-width: 600px) {
/** CSS classes used if condition is true */
*[class=mobilewrapper]{width:100%!important; height:auto!important;}
*[class=w320]{width:320px!important; height:auto!important;}
*[class=split]{width:320px!important; float:left!important; display:block !important;}
*[class=left-sidebar-container]{display:none;}
*[class=center-sidebar-container]{display:block;}
*[class=toc_container_mobile]{display:block;}
*[id=comments-box]{background: #DCE2ED;padding: 7px;border: #ACB1BA solid 1px;margin-right: 0%;width:100%;}
}
```

In this way you can use different CSS classes depending on the width of the device. One of the main changes that HTML 5 introduced was to force the use of CSS classes instead of the style attribute. This makes it much easier to change the presentation of a website using CSS Media Queries.

#### Browser detection using JQuery
You can also detect the device width using JQuery. If you are using JQuery to create certain user interface elements, then you may want to use different JQuery code depending on the device.

The article titled [Detecting Browser Window Size/Resize with jQuery](http://www.sweet-web-design.com/wordpress/detecting-browser-window-size-resize-with-jquery/1614/) has a good description of how to detect browser width using JQuery.

#### Browser detection using PHP

If you are using PHP and you want to use different server side code depending on the type of mobile device, then you can use the [mobiledetect](http://mobiledetect.net/) library. This is an excellent library written in PHP that detects the user agent that is trying to access your web page. For example you can use the following code to detect if the website visitor is on a mobile device:

```php
// Include and instantiate the class.
require_once 'Mobile_Detect.php';
// Include and instantiate the class.
$detect = new Mobile_Detect;
// Any mobile device (phones or tablets).
if ( !$detect->isMobile() )
```

### Other options for Responsive Website Design
Another useful library that can be used in Responsive Website Design is [Modernizr](http://en.wikipedia.org/wiki/Modernizr). This is a JavaScript library that can be used to detect the HTML 5 and CSS3 features available to a visitor of your website. You can then change your JavaScript or CSS code depending on the features available to the user. For e.g if HTML 5 canvas features is available to a user then you can use canvas related code.

It is also a good idea to make your website accessible to visually impaired users. A large number of internet users are visually impaired and use helper devices such as [Brail](http://en.wikipedia.org/wiki/Braille) to access the internet. [Design Websites For Blind/Visually Impaired, Deaf & Disabled Visitors](http://www.hobo-web.co.uk/design-website-for-blind/) and [Tips and Tricks to Improve Web Accessibility](http://www.afb.org/info/accessibility/creating-accessible-websites/tips-and-tricks/235) are useful articles that describe how to make your website accessible for visually impaired users.

You can check your website on your mobile phone or test it using online tools. Tools such as [Google's Mobile Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly/) and the [Responsive View in Firefox browser](https://developer.mozilla.org/en/docs/Tools/Responsive_Design_View) can be used for checking the accessibility of your website on mobile devices.

### Conclusion
Responsive website design is a useful skill that can greatly improve the accessibility of your website. Websites are becoming increasingly popular and it is important for web masters to design websites that are accessible to all users.
