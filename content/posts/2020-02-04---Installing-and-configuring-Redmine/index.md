---
title: Installing and configuring Redmine
date: "2017-04-11"
template: post
draft: false
slug: "/posts/installing-and-configuring-redmine"
category: "applications"
tags:
  - "applications"
  - "software installation and configuration"
description: "Redmine is a web based project management and collaboration platform. It is based on the Ruby programming language and the Ruby on Rails framework. Its user friendly and easy to install and configure."
---

### Introduction
[Redmine ](http://www.redmine.org/) is a web based project management and collaboration platform. It is based on the Ruby programming language and the Ruby on Rails framework. Its user friendly and easy to install and configure.

It has useful features such as project management, user and role management, issue tracking, wiki, forum, files and document management, time tracking and more. It is well suited for managing Software Development Project but it can easily be used to manage other projects. In this article I will describe my experience with installing and configuration Redmine.

### Installation
Installation of Redmine is easy and is described in the [Redmine Install Guide](http://www.redmine.org/projects/redmine/wiki/redmineinstall). The Redmine wiki has installation guides for different platforms. I followed the guide for installing Redmine from source on Linux. I used MySQL for the database.

The installation worked without problems. The only issue was installing the Redmine in a sub folder. The Url had to look like **https://companyname.org/companyid/projects/**. Sub folder installation of Redmine is described in the guide: [HowTo Install Redmine in a sub-URI](http://www.redmine.org/projects/redmine/wiki/HowTo_Install_Redmine_in_a_sub-URI). It required adding following lines to the end of the **config/environment.rb** file:

```ruby
RedmineApp::Application.routes.default_scope = "/companyid/projects"
Redmine::Utils::relative_url_root = "/companyid/projects"
ActionController::Base.relative_url_root = "/companyid/projects"
```

After that I had to create the folder **/remine_install_path/companyid**. Then I had to add a symbolic link to the public folder using the command:

```bash
ln -s /redmine_install_path/public /redmine_install_path/companyid/projects
```

Next I had to add the following line to the Apache virtual host configuration for the Redmine website: **RailsBaseURI /companyid/projects**. I had run the Redmine website behind Apache web server using the **libapache2-mod-passenger** module.

After the Redmine was installed, I had to login to the Redmine and give the full path of the Redmine url under **Settings->General->Website Name**. I set the path to: **companyname.org/companyid/projects**. The protocol field had to be set to **https**.

### Configuration
Redmine provides a lot of features out of the box related to project management, issue tracking, document management etc. However sometimes we may required additional features or customization that are not provided by the default Redmine installation.

Redmine supports plugins and themes which can be used to enhance the functionality of Redmine. Redmine plugins can be downloaded from the [Redmine Plugin Repository](http://www.redmine.org/plugins) or from [Github](https://github.com/). Redmine plugins can add useful features such as allowing customization of the Redmine menu, Invoicing, Contact Management, adding custom JavaScript and CSS to the website, Issue Templates, Product management, Frequently asked questions, Agile related features and more.

Installation of Redmine plugins is a bit tricky. Each plugin has its own installation guide. Generally Redmine plugins are installed by decompressing the plugin file, then running the command:

```bash
bundle install
```

from the Redmine root directory. After that the command:

```bash
rake redmine:plugins:migrate RAILS_ENV=production
```
is run to import the plugin configuration information to Redmine. Next we may need to restart Redmine using the commands:

```bash
touch tmp/restart.txt
service apache2 restart
```

Installation of Redmine themes is very simple. It requires decompressing the theme file in the public/themes folder. Next Redmine needs to be restarted. The new theme should then show under **Settings->Display->Themes**.

### Conclusion
Redmine is an excellent tool for managing projects. With the help of plugins and themes it can be transformed into systems that provide a wide range of features such as content management, account management, customer management, agile project management and more.
