---
title: Installing Rocket Chat and Wekan on Ubuntu Server
date: "2017-04-11"
layout: post
draft: false
path: "/posts/installing-rocket-chat-and-wekan-on-ubuntu-server"
tags:
  - "collaboration tools"
description: "Rocket Chat and Wekan are useful online collaboration tools. Both tools are open source and can be downloaded and installed for free."
---

### Introduction

[Rocket Chat](https://rocket.chat/) and [Wekan](https://wekan.github.io/) are useful online collaboration tools. Both tools are open source and can be downloaded and installed for free.

Rocket Chat is a chat application similar to Slack, while Wekan is a Kanban application similar to Trello. Rocket Chat and Wekan are easy to use and can be used for collaborative project management. In this article I will describe how to install and configure Rocket Chat and Wekan.

Both Rocket Chat and Wekan are based on the open source Meteor JavaScript framework. Both applications are well documented and are supported by an active community.

### Rocket Chat Installation
Rocket Chat consists of a service and clients that connect to the service. The service has several installation options. It can be installed on the Rocket Chat Cloud or on a Platform as a Service (PAAS) such as AWS, Heroku, Sandstorm.io, Automation Tools etc. It can also be installed as a Docker Container or manually from source code. Rocket Chat clients are available for several platforms including iPhone and Desktops clients for Windows and Linux. The easiest way to access the Rocket Chat service is from a web browser, which requires no installation.

I had installed the Rocket Chat service from source. The Rocket Chat documentation has [guides for installing from source on different operating systems](https://rocket.chat/docs/installation/manual-installation/). I followed the Ubuntu server installation guide. After installing the Rocket Chat service, I was able to access the service from a Linux desktop client and web browser. Both clients worked well without issues.

Rocket Chat has following dependencies: **nodejs, mongodb, curl and graphicsmagic**. It requires **nodejs version 0.10.43 or higher**. nodejs can be installed using **Node Package Manager (npm)**. The main issue I had was installing Rocket Chat over https behind Apache web server. Furthermore the installation had to use a subfolder url. Fortunately the Rocket Chat documentation covers this installation case very well.

### Rocket Chat Installation Issues
After installing Rocket Chat I had problems with getting the [Jitsi.Meet](https://jitsi.org/Projects/JitsiMeet) video chat function to work. Jitsi Meet is an open source WebRTC application that allows video conferencing. Jitsi Meet video conferencing is integrated into Rocket Chat channels and direct chat. I had problems with getting the Jitsi Meet video function to work. I had to add following rules to Apache virtual host configuration:

```
ProxyPass /packages http://localhost:1000/chat/packages
ProxyPassReverse /packages http://localhost:1000/chat/packages
```

After that the Jitsi Meet feature started working but only on Firefox browser. Chrome browser gave a permissions error. I posted the error on the Rocket Chat GitHub issue tracker ([Issue 3973](https://github.com/RocketChat/Rocket.Chat/issues/3973), [Issue 3952](https://github.com/RocketChat/Rocket.Chat/issues/3952) ).

### Customizing Rocket Chat
Rocket Chat can be easily customized by replacing the logo, favicon and login page banner. The favicon can be uploaded in different sizes and types including SVG. Rocket Chat also allows adding custom CSS code. I used it to style certain parts of the login screen.

### Wekan Installation
Wekan like Rocket Chat is based on meteor. [Installation of Wekan](https://github.com/wekan/wekan/wiki/Install-and-Update) is well documented on their website. Wekan can be installed from Sandstorm, Docker, Binaries or Source Code. I chose the last option, i.e installing from source code.

### Wekan Installation Issues
I had to install Wekan over https behind Apache web server. The URL had to be a sub folder. This type of installation is not documented in the Wekan Wiki. The installation was mostly successful, but had one bug. When I clicked on a card it showed a "Page not found" error. I decided to post the issue on the Wekan Github issue tracker ([Issue 666](https://github.com/wekan/wekan/issues/666)). Another drawback of Wekan is that it does not have an admin section from where we can manage users. Its a useful tool but does not have as many features as Rocket Chat.

### Startup scripts for Rocket Chat and Wekan
Both Rocket Chat and Wekan are started in the same manner. i.e using the command: **node main.js**. This  command starts a server that listens on the given port and URL. The port, URL and database information is given to the application as environment variables. To manage the Wekan and Rocket Chat services more easily, I decided to use the forever service.

The forever service allows managing services based on NodeJs. On Ubuntu it can be installed using the command: **apt-get install forever**. Installation and configuration of the forever service is described in Step 4 of the guide: [How To Install, Configure, and Deploy Rocket.Chat on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-install-configure-and-deploy-rocket-chat-on-ubuntu-14-04).

### Conclusion
Both Rocket Chat and Wekan are useful tools that can be used for collaboration and project management. Integration of these tools would be a great feature that has been much requested.
