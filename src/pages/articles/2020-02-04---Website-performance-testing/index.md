---
title: Website performance testing
date: "2019-02-19"
layout: post
draft: false
path: "/posts/website-performance-testing"
tags:
  - "wordpress"
  - "website testing"
description: "The role of websites has evolved greatly over the last few years. Websites were initially a novel way of presenting information. Over the last few years websites have grown greatly in importance. Websites now may be regarded as the public image of all types of organizations."
---

### Introduction
The role of websites has evolved greatly over the last few years. Websites were initially a novel way of presenting information. Over the last few years websites have grown greatly in importance. Websites now may be regarded as the public image of all types of organizations.

A well developed informative company website is a great asset for the company. Several technologies related to websites have been developed over the years, such as website performance testing, search engine optimization, email marketing etc.

Given the importance of websites, it is important to ensure that a website loads correctly on all types of devices. This is no small task as it involves ensuring that all website components are being loaded correctly. For example CSS, JavaScript files should be loading quickly and in correct sequence. Images should be compressed so that they take less time to load. Web page HTML needs to conform to well known standards such as HTML 5.

The most commonly used tool for measuring website performance is the browsers developer tool bar. All major web browsers such as Google Chrome, FireFox and Internet Explorer have a built in developers tool box which provides detailed information on web page content.

Several online services such as [GTmetrix](https://gtmetrix.com) and [Google Pagespeed](http://developers.google.com/speed/pagespeed/insights/) are available for measuring website performance. These services not only measure various performance metrics but also provide suggestions on how to improve the website performance. It is the job of the website developer to implement these suggestions and ensure good website performance. In this article I will focus on the suggestions for improving website performance.

### Common recommendations given by the tools
Some of the recommendations given by these tools are:

#### Combine external JavaScript and CSS
This implies combining several JavaScript files into one file and several CSS files into one file. This reduces the number of requests sent by the browser and reduces the page loading time. The combined file may then be compressed or minimized which further reduces the loading time.

On WordPress based websites this recommendation can be implemented using a plugin such as [JS & CSS Script Optimizer](https://wordpress.org/plugins/js-css-script-optimizer/). This plugin supports combining and minifying JavaScript and CSS files.

#### Minimize redirects
This involves reducing the use of redirect URLs. Redirect URLs are those URLs that redirect to other URLs. This increases page load times.

#### Minimize DNS lookups
This implies reducing the number of host names that need to be looked up by the browser. This can be implemented by hosting all your web resources under a single host name. Use of a content delivery network (CDN) can also help in this regard.

#### Leverage browser caching
This is a common recommendation given by most of the tools. It implies making use of web browser caching. Web browsers can place resources such as CSS, JavaScript and image files in their local cache. By using resources in its local cache, the web browser has to make fewer requests to the web server.

To make use of browser caching you need to configure your web server so it instructs the web browser to cache files for certain duration. For the [Apache web server](http://www.apache.org/) this can be achieved by entering commands in htaccess file. WordPress provides caching plugins such as [W3 Total Cache](https://wordpress.org/plugins/w3-total-cache/), which have several caching features, including browser caching.

#### Use a Content Delivery Network
This means using a [Content Delivery Network](http://en.wikipedia.org/wiki/Content_delivery_network) for hosting static resources such as JavaScript, HTML, CSS and images. The benefit of this is that the content is delivered more reliable and quickly. CDN services such as Akamai, Cloudflare and Cloudinary can be used to host your static resources.

Cloudinary is a CDN service provider that has a very useful free plan. They also have a plugin for WordPress that allows content hosted on their servers to be accessed from WordPress websites.

#### Put scripts at the bottom.
This implies placing your JavaScript and CSS files at the bottom of your HTML page. It makes sense to delay loading CSS and JavaScript files that are not needed for rendering the page.

These files may even be loaded asynchronously. Loading asynchronously means the file is downloaded and processed while other operations are being carried out. This allows the web page to render more quickly. Delaying the loading of scripts may not always be desirable. For example CSS and JavaScript files needed for rendering a page should be placed inside the head tag so they can be downloaded and processed quickly.

#### Choose &lt;link&gt; over @import
This implies linking your CSS files using links tags instead off CSS @import statements. Using link tags is preferable because certain web browsers load CSS files that are linked using @import statement at the bottom of the page.

#### Gzip and compress components
This implies compressing web page content before it is sent by the browser. Content that is compressed takes less time to be transmitted and also reduces the network bandwidth usage. The W3 Total Cache WordPress plugin has support for compressing content. In Apache web server it can be achieved using the [mod_gzip](http://en.wikipedia.org/wiki/Mod_gzip) module. Once this module has been activated it can be configured using htaccess file.

#### Optimize and correctly display images
This implies ensuring that your images are compressed and are not larger than the required size. Images tend to be large in size and are one of the main bottlenecks of website performance. It is important to compress an image and resize it before serving it on your website.

In WordPress this can be achieved using plugins such as [EWWW Image Optimizer](https://wordpress.org/plugins/ewww-image-optimizer/) or [Smush.it](https://wordpress.org/plugins/wp-smushit/). Both these are excellent plugins that can resize and compress the files in WordPress media library. Alternately you can use [a free online image compression tool](https://www.websiteplanet.com/webtools/imagecompressor/).

#### Minify HTML, CSS, and Javascript
This implies compressing HTML, CSS and JavaScript files before serving them. This makes the file size small and reduces the time needed to download the file. The W3 Total Cache plugin supports file compression.

#### Use CSS Sprites
A CSS Sprite is one large image that contains smaller images. CSS code is used to display images within a CSS sprite. CSS Sprites are specially useful for combining background images into a single image. The benefit of this is that it reduces the number of requests for individual images.

#### Monitor plugin performance
Remove the plugins you don't need. Having too many plugins on your site greatly reduces performance. You can also use the [P3 performance profiler](https://wordpress.org/plugins/p3-profiler/screenshots) plugin to check which plugins are slowing down your website. This tip was suggested in a useful blog post titled "[Speeding up WordPress load from 4.23s to 1.33s [Case Study]](http://startbloggingonline.com/speed-up-wordpress/)".

#### Use online validation tools
The World Wide Web Consortium (W3C) is an organization that manages HTML standards. It has an excellent [on-line tool](http://validator.w3.org/) that can be used to validate HTML documents.

In WordPress you can validate each page and post of your website using the [validated](https://wordpress.org/plugins/validated/) plugin. WordPress also has a useful plugin called [Broken Link Checker](https://wordpress.org/plugins/broken-link-checker/), that can be used to check your website for broken page links.


### Conclusion
Ensuring that the HTML of your website complies with web standards is an important consideration for any website. A website that is standards compliant will not only receive a higher ranking in Google search results but will also render more reliably across different web browsers.

[Performance Unleashed: How To Speed Up WordPress Load Times](http://diythemes.com/thesis/improve-website-pagespeed/) is a useful article that describes how to improve WordPress load times. The optimization tips given in the article can also be applied to websites that are not based on WordPress. [Best WordPress Hosting: Top 10 Comparison & Reviews](https://websitesetup.org/best-wordpress-hosting-performance/) is another useful article which reviews the best WordPress Hosting services.
