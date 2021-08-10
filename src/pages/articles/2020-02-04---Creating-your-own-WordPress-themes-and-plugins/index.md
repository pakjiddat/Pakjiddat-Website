---
title: Creating your own WordPress themes and plugins
date: "2017-04-11"
layout: post
draft: false
path: "/posts/creating-your-own-wordpress-themes-and-plugins"
tags:
  - "web development"
description: "WordPress is a great platform for building innovative applications. You can not only build standard websites with WordPress but you can also create complex applications full of features."
---

### Introduction
WordPress is a great platform for building innovative applications. You can not only build standard websites with WordPress but you can also create complex applications full of features.

WordPress has many plugins and themes that can help you meet the requirements of even the most ambitious of customers. Recently I had the opportunity of creating custom WordPress themes and plugins for a customer. I will describe my experience in this blog post.

### Twitter Bootstrap for meeting initial requirements
Initially my customer had asked for a simple website that describes the products and services of the company. That was easy I thought. All I had to do was to download a simple HTML template and enter the content provided by the customer. I like the twitter [Bootstrap](http://getbootstrap.com/) framework. It is a responsive framework, which means it is designed to be accessible from devices with different sizes. I really like their [Jumbotron](http://getbootstrap.com/examples/jumbotron/) example and decided to use it as the template for the website.


### Using web based code editor
The customer wanted to enter the content by himself so I had to make it easy for him to edit the HTML. I installed a web based code editor called [https://icecoder.net](IceCoder). This is an excellent tool that allows you to easily edit code straight from the web browser without installing any software on your local computer.

IceCoder is written in PHP and like most PHP applications is easy to setup. All you need to do is to download it on your server and extract the downloaded file into a folder.

### Organizing the code
I created the files: **header.php** and **footer.php**. I removed the header and footer HTML code from the Bootstrap example and moved it into these two files. Now if we wanted to create a web page it had to include the header and footer files. Once I had done that, the customer could easily create new web pages.

### Setting up the development and production sites
We moved the website to a dev domain and put the main website in maintenance mode. I downloaded a sample [maintenance mode web page](http://www.land-of-web.com/rocket_coming_soon/index.html). It had an option called notify us, which was not working. I tried to connect it to [MailChimp](http://mailchimp.com/).

### Placing the production site in maintenance mode
MailChimp is an excellent service for managing newsletters and email campaigns. I decided to connect their [API](http://en.wikipedia.org/wiki/Application_programming_interface) to the maintenance mode web page. So while the customer's website was being developed under the dev domain the live domain showed a coming soon web page.

Users who wanted to be notified by email when the website will be live could enter their email address. MailChimp would take care of notifying us and also the users.

### Moving over to WordPress
Like most customers, this customer wanted more features. Like contact forms, ability to create articles etc. I knew from past experience that this was probably the tip of the iceberg. More requirements could easily come up. I needed a [content management system (CMS)](http://en.wikipedia.org/wiki/Content_management_system), that had lots of plugins and was easy to use. [Drupal](https://www.drupal.org/) was one option, but I did not find it easy to use. I decided to use [WordPress](http://wordpress.org/). It turned out to be a good choice.

### Migrating site to WordPress
The customers website was ready but now it had to be moved to WordPress. The best way to do this was to create a new theme for WordPress and then create new WordPress pages. After that it would be easy to copy content from old website to the new website. WordPress.org has excellent guides on creating new WordPress themes and plugins.

Like many web developers I tried to find an easier way and instead of reading about WordPress themes, I searched for a free WordPress theme based on Bootstrap. I came across a useful article called ["How to build a responsive WordPress theme with Bootstrap](http://blog.teamtreehouse.com/responsive-wordpress-bootstrap-theme-tutorial)". It shows how to create theme based on Twitter Bootstrap for WordPress.

The tutorial was very useful. After following it, It was much easier to read the WordPress guides on [themes](http://codex.wordpress.org/Theme_Development) and [plugins](http://codex.wordpress.org/Writing_a_Plugin). I got a good understanding of WordPress and felt much more confidant about meeting the customers requirements.

### Meeting the customer's requirements
The customer wanted a website like [Digital Ocean](https://www.digitalocean.com/). My first reaction was that this is out of my scope. However the customer was patient and sent his requirements in small bits and pieces.

Meeting those requirements with the help of WordPress plugins turned out to be quite easy. Some of the requirements could be met using plugins, But some of the requirements required creating our own plugins. For example the requirement of custom login page could be met with the [Custom Login](https://frosty.media/plugins/custom-login/) plugin.

But how could we have tutorials, questions and projects that looked like the [Digital Ocean community](http://digitalocean.com/community/tutorials) section. We were able to meet this requirement by using WordPress custom post types.

[Custom post types](http://codex.wordpress.org/Post_Types) are a great feature of WordPress that allow us to add new types of posts. These custom types are fully integrated into WordPress and are supported by hundred of plugins. Custom post types also support hierarchies so we can have child types of a custom post type. For example if you want to create a Hotel Management System using WordPress, then you can use Custom Post Types. A Hotel can be a custom post type. A room can be a sub type of the hotel and so on.

We were able to easily create custom post types for tutorials, questions and projects with the help of the [Custom Post Type UI plugin](https://wordpress.org/plugins/custom-post-type-ui/). We then needed to display them in tabs. [Easy Responsive Tabs plugin](https://wordpress.org/plugins/easy-responsive-tabs/) was the solution.

Now we needed a way to query the tutorials, questions and projects and display them inside the tabs. I installed the [display posts shortcode](https://wordpress.org/plugins/display-posts-shortcode/) for displaying custom posts. With this plugin all you need to do for displaying your custom posts is to add a short code to a page. WordPress then replaces the short code with the list of articles in your custom post type.

We needed the custom posts to look stylish like on Digital Ocean. We decided to clone the plugin and modify it according to our needs. After that we were able to easily display tutorials, questions and projects inside tabs.

### Conclusion
Within a few weeks, I was able to create a WordPress site that looked like Digital Ocean. Best of all I learned a lot about WordPress development. I think the main reason for meeting the customer requirements was close collaboration with the customer.
