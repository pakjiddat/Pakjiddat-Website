---
title: Validate your WordPress blog using WordPress XML-RPC API, Php Tidy and Nu HTML Checker
date: "2017-04-11"
layout: post
draft: false
path: "/posts/validate-your-wordpress-blog-using-wordpress-xml-rpc-api--php-tidy-and-nu-html-checker"
tags:
  - "web development"
  - "software testing"
description: "WordPress is a very popular platform for hosting websites. Over 74 million websites are based on WordPress. WordPress is also increasingly being used to develop complex web based applications."
---

### Introduction
WordPress is a very popular platform for hosting websites. Over 74 million websites are based on WordPress. WordPress is also increasingly being used to develop complex web based applications.

There is a need for a testing system that allows testing applications and websites based on WordPress. Recently I had the opportunity of setting up a simple testing system for WordPress that validates WordPress blogs using the WordPress XML-RPC API, PHP Tidy and the online Nu HTML Checker. I will describe my experience in this blog post. I will also briefly describe a couple of ways in which you can test server side code of your WordPress plugins.

### What is the importance of Validating your website
Its a good idea to ensure that your WordPress blog conforms to W3C standards. The World Wide Web Consortium (W3C) is the main international standards organization for the World Wide Web. The W3C standard is recognized by all major search engines. Websites that conform to its standards can be understood by search engines and web browses more easily.

Such websites have fewer performance problems and function more reliably across multiple devices. They are also sure to receive a higher ranking on the major search engines.

### Validating your blog using Nu HTML Checker
The W3C validation website contains [several tools](http://w3c.github.io/developers/tools/") that you can use to validate your website pages. These tools include:

* [Nu HTML Checker](https://validator.w3.org/nu/"). It can checks HTML of any document. It supports html5
* [Link Checker](https://validator.w3.org/checklink"). It checks for broken links on your page
* [RDF Validator](https://www.w3.org/RDF/Validator/"). It checks and visualizes RDF documents
* [Mobile Checker](https://validator.w3.org/mobile-alpha/"). It checks the mobile friendliness of your website
* [Internationalization checker](https://validator.w3.org/i18n-checker/"). It checks level of internationalization-friendliness of your website
* [RSS feed validator](https://validator.w3.org/feed/"). Validator for RSS and Atom feeds
* [CSS Validator](https://jigsaw.w3.org/css-validator/"). Checks the CSS of your website
* [Markup Validator](https://validator.w3.org/"). Checks the HTML or XHTML of your website
* [Unicorn](https://validator.w3.org/unicorn/"). Unified validator. HTML, CSS, Links and Mobile validator

The Nu HTML checker can be used to check any website for compliance with the new HTML 5 standard. I created a PHP script that uses the [WordPress XML-RPC API](https://codex.wordpress.org/XML-RPC_Support") for getting list of all pages, posts, custom posts on my blog. The XML-RPC API is very useful and you can use it to easily get list of all pages on your blog. Once you have the list of pages, you can test each page against different W3C standards.

For each post the script validates the post HTML using the [PHP Tidy extension](http://php.net/manual/en/tidy.examples.basic.php") and the Nu HTML Checker. The PHP Tidy extension is a popular extension for PHP that allows repairing and formatting your HTML code. It supports HTML 4 validation but does not support HTML 5.

If a post cannot be validated the test ends with an error. I ran this script with [PhpUnit](https://phpunit.de/") and added it to [Jenkins Continuous Integration Server](https://jenkins-ci.org/"). I scheduled the script to run every day, so the script tests all pages automatically and sends me an email if any of the tests fail.

Setting up projects in Jenkins is quite simple. You can refer to my earlier blog post titled [Continuous integration and Project Management with Jenkins and Redmine](/posts/wordpress-deployment-with-jenkins-and-redmine") for more information on how to add scripts to Jenkins.


### Testing Server Side code of your plugins
Testing a WordPress website using PhpUnit is different from testing websites based on other platforms. WordPress has its own authentication system which prevents testing WordPress plugins and themes like normal PHP scripts. There are 2 main options for testing the server side code of your plugins:

* [WP-CLI](http://wp-cli.org/"). WP-CLI is a command line interface to WordPress. It can be used along with PhpUnit to unit test your WordPress plugins. The WP-CLI website has some useful [documentation on how to test WordPress plugins](https://github.com/wp-cli/wp-cli/wiki/Plugin-Unit-Tests").
* [Extend the WordPress XML-RPC interface](https://codex.wordpress.org/XML-RPC_Extending") inside your plugins. This method allows you to test your plugins using WordPress XML-RPC interface. Basically it allows you to call your test functions using WordPress XML-RPC interface.

### Conclusion
WordPress is a very popular platform for websites. It is important to have a testing system in place that makes it easy to test WordPress based websites.

Ensuring that your website conforms to W3C standards is very useful. It not only improves your SEO score but also ensures compatibility of your website across different devices and browsers.
