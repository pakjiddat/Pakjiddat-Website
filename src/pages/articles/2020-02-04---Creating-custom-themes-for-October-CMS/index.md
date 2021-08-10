---
title: Creating custom themes for October CMS
date: "2017-11-22"
layout: post
draft: false
path: "/posts/creating-custom-themes-for-october-cms"
tags:
  - "web development"
description: "October CMS is a content management system based on Laravel Php Framework. It allows developing websites and web applications. It supports custom themes and plugins. In this article I will describe my experience with developing a custom theme for the October CMS."
---

### Introduction
October CMS is a content management system based on Laravel PHP Framework. It allows developing websites and web applications. It supports custom themes and plugins. In this article I will describe my experience with developing a custom theme for the October CMS.

### Installation
To install the October CMS, we need to first ensure that our server meets the minimum requirements. October CMS requires PHP 7 and higher and the following PHP extensions: PDO, CURL, OpenSSL, Mbstring, Zip and the PHP GD library.

The first steps in the installation process is to download the installation zip file to the web root directory. The zip file should be unzipped and write permissions should be given to the extracted files and folders. Next the install.php script should be opened in the browser. This will start the installation wizard. The wizard will ask for the database information as well as the admin user name and password. The wizard will then download the main files. Once the wizard ends, the installation files should be removed from the server.

October CMS supports task scheduling. For this it requires adding the following entry to the crontab file:

```
* * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1
```

### Features
The [main features of the October CMS](https://octobercms.com/features) are described on the October CMS website. October CMS is built on top of the Laravel PHP framework.

It supports the Twig template engine which is used to render web pages. It supports building pages using page components. A page component can be an item such as list of most recent posts. The October CMS can be extended using plugins. It has an easy to use administrative interface and supports easy creation of back-end pages for plugins.

The October CMS provides a simple Ajax framework. It also provides the **Builder plugin**, which allows easily creating fully functional plugins. The October CMS uses file based templates. It also includes a built in asset combiner which allows combining CSS and JavaScript files.

The October CMS provides a marketplace for third party plugins and themes. Another useful features of the October CMS is that it allows plugin and core updates to be installed easily. It also has a translate plugin that allows easy translation of content

### Developing custom themes
Developing a custom theme for October CMS is quite easy. The CMS provides a built in theme called demo. A good starting point for developing the custom theme is to copy the demo theme folder and change the name of the folder to the new theme name.

The theme folder contains the following subfolders:

* **assets**. This folder contains the theme assets such as CCS files, JavaScript files, Images and Fonts.
* **content**. This folder contains the textual content of the website pages
* **layouts**. This folder contains the layout files for the theme. A layout file is a file with .htm extension. It contains the basic HTML page and placeholders for pages and partials. The top of the layout file has a configuration section that can contain information such as the description of the layout. The configuration section is read by the CMS and ends with '**==**' on a new line.
* **pages**. This folder contains the page files. A page file has a .htm extension. It also starts with a configuration section which can contain information such as the page title, URL and layout. The page file is rendered in the given layout and is applied to the layout automatically when the given URL is accessed by the user.
* **partials**. This folder contains partial files. A partial file is a file ending with .htm that can be reused in other layouts, pages or partials. Examples of partial files are header and footer files that are common to several pages.
* **readme.md and theme.yaml**. The readme.md file contains information about the theme in markdown format. The theme.yaml file contains theme information that is used by the CMS. Both files should exist in the theme root directory

The templates files inside the layout, page and partial folders can contain upto three sections, which are configuration, PHP and Twig sections. Each section should end with '&lt;b&gt;==&lt;/b&gt;' on a new line.

Each theme can be managed from the October CMS back-end. The back-end allows editing the template files in a HTML editor as well as placing the theme in maintenance mode.

### Conclusion
The October CMS is a feature rich CMS that is easy to use and extend. It is suitable for developing websites and web applications
