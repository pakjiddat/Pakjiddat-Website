---
title: Installing HumHub and Communote on Debian Jessie
date: "2017-11-14"
layout: post
draft: false
path: "/posts/installing-humhub-and-communote-on-debian-jessie"
tags:
  - "applications"
  - "software installation and configuration"
description: "HumHub and Communote are both web based social network platforms that allow teams and small organizations to communicate and collaborate using Activity Streams, Messaging, Blogging, Tagging and more. HumHub is based on the Yii Php Framework, while Communote is written in Java."
---

### Introduction
HumHub and Communote are both web based social network platforms that allow teams and small organizations to communicate and collaborate using Activity Streams, Messaging, Blogging, Tagging and more. HumHub is based on the **Yii Php Framework**, while Communote is written in Java.

### Installing Communote
Communote installation is well documented in this [installation guide](https://communote.github.io/doc/install_communote.html) on the communote website. There are two main options for installing Communote on Linux based servers. We can either install Communote from an installation package or from a WAR file.

Both installation options require a database server. Oracle, Microsoft SQL server, PostGres and MySQL database servers are supported.

Both installation options require Java Runtime Environment version 8 and the JDBC driver for the selected Database management system. Installation from WAR file also requires Apache Tomcat server. Both installation options can be completed in a few steps as described in the installation guide.

After the Communote has been downloaded and installed, it can accessed from the browser at http://localhost:8080. The startup page shows a web based wizard that allows the Communote to be configured.

### Installing HumHub
HumHub is written in PHP and like most Php based applications, it is easy to install. The installation is described in this [installation guide](http://docs.humhub.org/admin-installation.html). To install HumHub, we first need to create a new MySQL database. Next we need to download the HumHub files and configure the Apache virtual host for serving the files. The installation can then be completed from the web based installation wizard.

### Communote Features
Communote features and installation are well documented on their [support website](https://support.communardo.de/). Communote is essentially a Micro Blogging platform. It allows users to enter notes which can be viewed in an activity stream. Users can comment on notes and also search within notes. Notes are categorized by topics and tags.

Communote has a client server architecture. The Communote service installed on the server can be accessed from the browser as well as mobile and desktop clients. Communote can be integrated into other applications using embed codes and widgets. The embed code allows Communote activity streams to be embedded in any website, while the widgets allow the a simplified view of Communote to be embedded in other websites. Communote also allows notes to be submitted by email.

Communote functionality can be extended by plugins. Plugins such as language, message queue and single sign on are supported.

### HumHub features
The main feature of HumHub is spaces. A space is a collection of features such as files, users and groups. The features available in a space are determined by the modules that have been activated for the space.

For example modules such as wiki, tasks, polls, sms can be enabled for individual spaces. Each space contains an activity stream by default. A user dashboard shows all activity that has occurred within spaces that the user is subscribed to. The layout of the HumHub is responsive and works on mobile devices and desktop browsers.

### Conclusion
HumHum and Communote are both useful platforms for collaborating and forming social networks. Both platforms are open source and free to use.
