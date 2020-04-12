---
title: Installing Ghost on Debian Stretch
date: "2020-01-24"
layout: post
draft: false
path: "/posts/installing-ghost-on-debian-stretch"
category: "headless cms"
tags:
  - "headless cms"
description: "Ghost is an open source blogging platform similar to WordPress. It is based on a modern web architecture and has very good performance and security. It is very popular and is used by major corporations including Mozilla, NASA, Apple and more."
---

### Introduction
[Ghost](https://en.wikipedia.org/wiki/Ghost_(blogging_platform)) is an open source blogging platform similar to WordPress. It is based on a modern web architecture and has very good performance and security. It is very popular and is used by major corporations including Mozilla, NASA, Apple and more.

### Ghost Architecture
Ghost is based on the Node.js platform. It is completely written in JavaScript. It is easy to install and use. According to the [Ghost website](https://ghost.org/), the performance of Ghost is 19 times that of WordPress.

#### The Jamstack
Ghost is based on an modern architecture for websites known as [Jamstack](https://jamstack.org/). The JAM stands for JavaScript, APIs and Markdown. A Jamstack is essentially a static website which uses API calls to load content.

Static site generators such as Jekyll, Next, Nuxt and Gatsby are used to develop Jamstack sites. A Jamstack site consists of plain html pages containing CSS and JavaScript only. The HTML pages can be deployed to a content delivery network (CDN) and delivered to browsers efficiently and with minimum latency.

Jamstack sites do not require a web server. They usually load much faster and are more secure than websites with a backend such as WordPress and Drupal. Jamstack sites provide a better developer experience since they decouple features. They are also cheaper to scale.

#### Ghost components
Ghost consists of 3 main components. A Node.js based API, an admin client based on Ember.js and a frontend theme layer based on Handlebars.js. Ghost is also a headless CMS, which means the backend and frontend are decoupled and can be used independantly of each other. Content published using the Ghost admin can be displayed on a frontend site created using a framework such as [Next](https://nextjs.org/), [Nuxt](https://nuxtjs.org/) or [Gatsby](https://www.gatsbyjs.org/). The frontend site contains only HTML pages and is termed as the Jamstack site.

#### Ghost storage
Ghost uses the [Bookshelf.js ORM](http://bookshelfjs.org/) for accessing the data. This allows a wide range of databases to be used with Ghost. Sqlite3 and MySQL databases are officially supported and recommended for development and production use respectively. Ghost uses the local file system for storing images. Other storage types are supported such as S3, Content Delivery Networks (CDNs), databases, Google Cloud Storage and more.

### Installing and running Ghost
Ghost has several installation options. Ghost Pro is a fully managed platform as a service which allows your Ghost site to be managed and run on the cloud. Ghost may also be installed locally from source for development, deployed within a Docker container or installed locally as a site.

[A local installation of Ghost](https://ghost.org/docs/install/local/) requires a [recent version of Node.js](https://ghost.org/faq/node-versions/). Node versions 8, 10 and 12 are supported. Ghost requires about 1 GB of RAM. Ubuntu Operating system versions 16.04 and 18.04 are officially supported.

To install Ghost as a local site run the command: **npm install ghost-cli@latest -g**. This will install the Ghost command line interface tool as a global NPM application. To create a new site, simply change to the installation directory of your choice and enter the command: **ghost install local**. This will create a new installation of a Ghost site.

Next enter the command: **ghost start**. This will start a web server on **port 2368**. You should be able to access the Ghost site on: **http://localhost:2368**. The Ghost Admin can be accessed on: **http://localhost:2368/ghost**. To stop the Ghost server enter the command: **ghost stop** from the folder containing the Ghost site.

### Configuring Ghost
Ghost can be configured by simply editing configuration files. By default Ghost is installed in development mode with **SQLite3** database. To switch to production mode set an environment variable using the command: **NODE_ENV=production node index.js**. The configuration file for development mode is **config.development.json**, while the configuration file for production mode is: **config.production.json**. The configuration files are in JSON format. The main configuration options are **URL, database and mail**. The [Ghost configuration guide](https://ghost.org/docs/concepts/config/) describes the different Ghost configuration options.

### How to use Ghost

#### Ghost workflow
The workflow for using Ghost as a headless CMS is very simple. The user authors the content using the Ghost admin client. The content is then provided to a frontend framework such as Next, Nuxt or Gatsby using the Ghost API. The frontend framework then generates the static HTML pages.

#### The Ghost admin
The Ghost admin is a simple frontend, which uses the Ghost Admin API for saving and retrieving content. The Ghost admin can be accessed from the URL: **http://your-domain/ghost**. The Ghost admin allows creating posts and pages. It also allows creating tags and users.

The settings area allows installing the front-end theme. The theme can be installed by uploading a zip file.The Ghost admin allows managing the navigation menu items. It also allows importing and exporting content and deleting all content

#### The Ghost API
Ghost provides a content API as well as an admin API. The content API allows front-end frameworks to access content. The admin API allows content authoring applications to post content. This allows publishers to use their favorite authoring application, without being concerned with the front-end. The Ghost API decouples the front-end and admin features and allows Ghost to work as a Headless CMS.

#### Ghost themes
[Ghost themes](https://ghost.org/docs/api/v3/handlebars-themes/) are based on the Handlebars template language, which provides a separation between the HTML and the dynamic JavaScript. The Handlebars language uses helpers to insert dynamic content. Quality free and paid Ghost themes can be purchased from the [Ghost marketplace](https://ghost.org/marketplace/).

### Ghost features
Ghost provides mobile and desktop apps for authoring content. It also has built in support for SEO, Accelerated Mobile Pages (AMP), Detailed Structured data and Subscription by RSS, Email and Slack.

Ghost has hundreds of [integrations](https://ghost.org/integrations/) with popular tools and services, including Discourse, Slack, Google Analytics, Zapier and more.

Ghost has a built in [membership and subscription feature](https://ghost.org/members/). It allows website owners to generate revenue by providing paid membership and subscription services. The membership and subscription feature is currently an experimental feature that needs to be enabled from the Ghost admin.

### Publishing Ghost sites using Netlify
[Netlify](https://www.netlify.com/) is a service that automates deployment of Jamstack sites. It provides a continous delivery workflow for publishing Jamstack sites. The Ghost has an [integration plugin for Netlify](https://ghost.org/integrations/netlify/) that allows Ghost sites to be deployed using the Netlify service.

To use Netlify, the user has to publish the markdown files containing the website content to an online version control repository such as GitHub or BitBucket. When the user makes a commit, Netlify fetches the markdown files and runs a command which generates the static html pages. The html pages are then deployed to a content delivery network (CDN). Netlify allows custom domains, HTTPs and has a free plan.

### Conclusion
Ghost is light weight CMS built on modern web technologies. It is a headless CMS and can be integrated with other frameworks and services. It is good option for use as a simple blog, single page applications or small company website.
