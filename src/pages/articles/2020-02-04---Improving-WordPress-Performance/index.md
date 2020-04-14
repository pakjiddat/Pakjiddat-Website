---
title: Improving WordPress Performance
date: "2018-06-23"
layout: post
draft: false
path: "/posts/improving-wordpress-performance"
tags:
  - "wordpress"
  - "website testing"
description: "Recently I had the opportunity of working on improving the performance of a WordPress website for a customer. I will describe my experience in this blog post. Slow website loading times can distract your website visitors and discourage them from visiting your website again."
---

### Introduction
Recently I had the opportunity of working on improving the performance of a WordPress website for a customer. I will describe my experience in this blog post. Slow website loading times can distract your website visitors and discourage them from visiting your website again.

It is best to conduct a thorough performance tuning of your website **before** it is launched to the public. You can create a development version of your website and test it for performance. After it has been tested you can make the website live.

### The popularity of WordPress
[WordPress](http://wordpress.org) is a very popular platform for hosting different types of websites. According to the article, [What Code You Should Learn](http://www.whoishostingthis.com/blog/2014/09/04/learn-to-code/), over 19% of all websites are based on WordPress. WordPress has over 25,000 plugins and themes that perform just about any task you can expect of a website. [14 Surprising statistics about wordpress usage](https://managewp.com/14-surprising-statistics-about-wordpress-usage) has some interesting statistics about WordPress.

### Improving WordPress performance
There are many factors that can slow down your WordPress website. Knowing exactly what is slowing down your website can be difficult. Fortunately there are several free on-line tools that can help you troubleshoot website performance problems.

### Process for tuning WordPress performance
The process I used for tuning the performance of a WordPress website is very simple and can be described as follows. You need to run one or more on-line tools that analyze the performance of your website. These tools provide recommendations on how to improve your website. Implement these recommendations and run the tools again. Then implement the recommendations of these tools again. Continue doing this until the tool gives a good performance figure for your website.

### Tools for performance tuning
Some of the tools used for performance tuning are:

* #### [Dotcom monitor](https://www.dotcom-tools.com/website-speed-test.aspx/)
  This is a useful service that checks your website in real web browsers in over 20 locations. It gives average load time and waterfall of your website for each location as well as an overall average loading time and waterfall for your website.

  A waterfall is a chart that provides detailed information about the resources on your website. For example it gives the size and loading time of each CSS, JavaScript and image file. It helps you to pinpoint the exact resource that is slowing down your website.

  With this tool you can also find out how much time your website takes to load for visitors from certain countries. The tool allows you to select the type of browser to be used for testing. Currently it supports Google Chrome, Firefox, Internet Explorer versions 7 and above, Iphone, Ipad, Ipod, IpadMini.

* #### [Google webmasters mobile friendly tool](http://www.google.com/webmasters/tools/mobile-friendly/)
  This is a useful service that gives a measure of mobile friendliness of your website. The tool also provides reasons why your website is not mobile friendly. For example "Text is too small to read", "Links too close together", "Mobile view port not set". Mobile friendliness is now an important criterion in Google search rankings. This was recently announced by Google in the article ["Get Ready For Google's New Mobile Ranking Signal"](http://www.webpronews.com/get-ready-for-googles-new-mobile-ranking-signal-2015-01)

* #### [Google Pagespeed](http://developers.google.com/speed/pagespeed/insights/)
  This is a useful service that runs Google Pagespeed tool on your website. The tool describes how your website runs on mobile devices and desktops.

  For mobile devices, the tool provides a score out of 100 for User Experience and Speed. It also highlights the areas in which your website is lacking and gives recommendations. The tool also gives an overall Pagespeed score out of 100 for Desktop devices.

* #### [GTmetrix](http://gtmetrix.com)
  This is a very useful service that provides a Performance Report of your website. It gives following information: Page Speed Grade, Y Slow Grade, Page load time, Total page size, Total number of requests and a Breakdown. The Breakdown gives recommendations on how to improve the page load time.

  It basically just gives the recommendation of the [Google Page Speed tools](https://developers.google.com/speed/pagespeed/) and [YSlow](http://yslow.org/). You can also export the performance report as PDF.

* #### [Pingdom Website Speed Test](http://tools.pingdom.com/fpt/)
  This is an excellent tool that gives a detailed description on the requests done to load a web page. For each request made for downloading a resource such as a CSS file, the tool gives detailed information such as time taken to load the resource including breakdown of the time taken and the size of the resource. The breakdown of the time taken includes time taken for DNS, Connect, Send, Wait and Receive and Total.

  The main features of the tool are a performance grade out of 100, number of requests made by the browser, page load time and page size. The tool also gives detailed information about the Waterfall, Performance grade, Page analysis and History.

  The level of information provided by all these tools is amazing. Although all tools provide similar information, it is good to run your website on all the tools so you get an overall measure of your website's performance

### Conclusion
Ensuring good performance of your website is very important, especially if your website is the public image of a company and is visited by many visitors.

Ensuring good performance of a website requires thorough research. Website performance improvement is a useful skill to learn that is well worth the effort.
