---
title: Developing a Twitter Crawler
date: "2017-04-11"
layout: post
draft: false
path: "/posts/developing-a-twitter-crawler"
category: "social media analysis"
tags:
  - "social media analysis"
description: "Recently I had the opportunity of developing a web based Twitter analytics application for a client. The application is called HQFollowBack. During the development of the application I learned how to use software development tools and apply software development techniques for solving certain problems."
---

### Introduction
Recently I had the opportunity of developing a web based Twitter analytics application for a client. The application is called HQFollowBack. During the development of the application I learned how to use software development tools and apply software development techniques for solving certain problems. I will share my experience in this blog post.

I had developed HQFollowBack a few years ago. However since then Twitter upgraded their API to version 1.1 which was not backward compatible with the previous version. As a result the HQFollowBack application stopped working. My client had invested considerable time and effort in the development of the application and did not want his efforts to go to waste. We had to upgrade the HQFollowBack application so it works with the new Twitter API.

I had written the HQFollowBack application at a time when I did not have much experience with commercial software development. The application was not easy to maintain, and as a result could not be easily updated to use the new Twitter API.

I decided to rewrite the application from scratch. It proved to be a good learning experience. Although I had a few years of experience with commercial web development, this was the first time I really paid attention to software development tools and methodologies.

### Software development methodologies:
During the development of the application I used the following software development methodologies and tools:

#### [Dont repeat yourself (DRY)](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
This is a Software Development Methodology that requires elimination of repetitive work. I applied this methodology in the following way:

The application has one entry point, so all requests pass through one function. The function routes the requests to different objects such as the Search and Stats objects. These objects are responsible for the search and statistics related functions of the application.

The idea was to simplify the application as much as possible. Instead of having multiple controllers,models and views, the application simply uses a single routing function that dispatches the request to the correct handler function. All requests are handled in the same way by simple handler functions.

One of the handler functions displays the user interface. It simply reads a template file and replaces place holders in the file with the correct values.

The application is basically a crawler that extracts information from Twitter. In the first version of the application it used an invisible Iframe for running the crawler code. This is not an efficient approach.

The new version of the application is 100% Ajax based. So once it loads in the browser there is no need to refresh the browser. I think this is a good structure for developing crawler applications that need to run from the browser.

#### Dividing the work into small components
My approach to developing the application was to divide the work requirements into small sections that could be completed in 1 or 2 days. I created a simple to do list with following fields.

* **Issues**. Problems faced during development
* **To Do**. List of tasks that need to get done
* **Done**. List of tasks completed
* **Reference**. List of website links that were useful during application development

#### Function caching
I think function caching is a useful feature especially in applications that do a lot of data reading. For example an application that reads data from databases or from public APIs can greatly benefit from function caching.

Function caching allows the output of a function to be cached. When the function is called for the first time, it saves its output to a cache. The next time it is called it simply returns the content of its cache. I implemented function caching in the application which greatly improved its performance.

#### Error handling and logging
The application is based on Php. It uses the Php functions [set_error_handler](http://php.net/manual/en/function.set-error-handler.php) and [set_exception_handler](http://php.net/manual/en/function.set-exception-handler.php) for registering error and exception handling functions. This allows handling of all applications errors and exceptions.

In case an error occurs, the error handling function is called which logs the error and also sends an email to the administrator. I also added try/catch code blocks to the Php and JavaScript functions. I think its important not to overuse the try/catch code blocks. They should be used only when a specific error needs to be reported. If there is no need to report a certain error, then we can use try/catch code block on the main function that includes all the other functions.

#### [Table Data Gateway](http://en.wikipedia.org/wiki/Table_data_gateway)
This is a design pattern that allows an application to access data through an object. It can be considered as a special case of the Gateway Design pattern. The Gateway Design pattern allows all access to data and configuration information through a single interface or gateway.

This makes it easier to update the application configuration information and methods used to access data. My implementation of the Gateway Design Pattern allows all access to data and configuration through a single object. This object provides helper classes for carrying out different tasks needed by the application. It simplifies the application workflow and makes the code easier to maintain.

#### Custom libraries
I think an important aspect of Software Development is the creation of your own Software Libraries. These days its easy to grab hold of free open source code and use it in your application. While this approach can get the job done, it may make the application difficult to upgrade. Its much better to use code that you understand and have tested.

In the HQFollowBack application I created my own custom library of utility functions that I plan on reusing and improving in future projects.

#### Open Source Libraries

I used following free open source code for developing the HQFollowBack application:

* Php library by [ricardoper](https://github.com/ricardoper/TwitterOAuth) on Github for accessing Twitter API.
* Php library by [esimaken](https://github.com/esimakin/twbs-pagination) for displaying the search results in pages. Colorbox JQuery library by [jacklmoore](http://www.jacklmoore.com/colorbox/example4/) for displaying nice popup boxes.
* Api by [detectlanguage](https://github.com/detectlanguage/detectlanguage-php) for detecting the language of the user Tweets.

#### Code comments
I commented all Php and Javascript code used by the application. I used the [phpDocumentor](http://www.phpdoc.org/docs/latest/getting-started/your-first-set-of-documentation.html) website as a reference on how to document Php code.

#### Development website
I used a separate website for the development of the application. I think its a good idea to do the development work on a separate development site. The live site should always be well tested and functional.


### Software development tools:
I used the following Software development tools for developing the HQFollowBack application:

* #### [Backend testing (phpunit).](https://phpunit.de/)
Phpunit is an excellent tool for unit testing Php code. By regularly running the unit tests I can be sure the application is working. These days applications are more and more dependent on third party tools and APIs. Changes to these external tools can break your application. It is therefore very important to test your application thoroughly and if possible run the unit and function tests automatically.

* #### [Frontend unit testing (Qunit)](https://qunitjs.com/)
Qunit is an excellent tool for unit testing JavaScript code. The Qunit [cookbook](http://qunitjs.com/cookbook) is a one page comprehensive guide on using Qunit. Qunit has good support for unit tests that involve ajax calls. I used Qunit for testing the ajax calls made by the HQFollowBack application.

* #### [Frontend functional testing (Selenium)](http://www.seleniumhq.org/projects/ide/)
Selenium works as a browser automation tool that can be run from programming languages such as PHP or from the Firefox browser itself. Selenium allows recording website activity such as mouse clicks and keyword events. These events can be easily played back.

* #### [Package management (Composer)](https://getcomposer.org/)
Composer is a package manager for PHP. It allows keeping track of third party PHP libraries used in a project. To use Composer you have to create a file called **composer.json** in your project directory. Then you have to add the location of the PHP libraries in composer.json. After that enter the command: **composer install**. This will install the packages mentioned in the composer.json file.

The packages are by default installed to the vendor directory. If the package is updated by its maintainer you can update it in your project by running the command: **composer update.**

By default composer uses the PHP libraries on the [packagist](https://packagist.org/) website, but it can be configured to use other sources as well such as [phpclasses.org](http://www.phpclasses.org/) or [Github](https://github.com/). Composer has an autoload feature that allows all Php libraries to be included in your project using a single include command. e.g **include("autoload.php")** will include all the libraries managed by composer.

* #### [Version Control (GIT)](http://git-scm.com/)
Git is a popular distributed version control system. I used it for keeping track of the different file versions. After completing a feature I saved the changes to the version control repository.

* #### [Issue tracking (Mantis BT)](https://www.mantisbt.org/)
Mantis is a popular free issue tracking system that allows keeping track of issues. I use it for working wit the client. In my bog post titled: [Tracking Issues with Mantis Bug Tracker](/posts/tracking-issues-with-mantis-bug-tracker), I described my experience with configuring and using Mantis.

### Conclusion
There are many other Software Development methodologies such an continuous integration, agile development, lean development etc. I think Its important to use the most suitable methodology for your project instead of using the methodology that is most popular. I learned a lot from the HQFollowBack project. It improved my knowledge of Software Development.
