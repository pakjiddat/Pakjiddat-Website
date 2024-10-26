---
title: Installing Jahia Community SDK on Debian 9
date: "2020-08-15"
template: post
draft: false
slug: "/posts/installing-jahia-community-sdk-on-debian-9"
category: "software installation and configuration"
tags:
  - "software installation and configuration"
  - "applications"
description: "Jahia is a software company which provides enterprise products and services. Its main products are jContent (a content management system), jExperience (combines customer data with customer management for personalized customer experience and jCustomer (an open source customer data platform). These products are combined in innovative way to provide solutions such as CMS (Customer Management System), PWA (Headless Progressive Web Applications), Customer Portals and more. Jahia provides a 30 day trial period of most of its products and solutions."
---

### Introduction
[Jahia](https://www.jahia.com/) is a software company which provides enterprise products and services. Its main products are jContent (a content management system), jExperience (combines customer data with customer management for personalized customer experience and jCustomer (an open source customer data platform).

These products are combined in innovative ways to provide solutions such as CMS (Customer Management System), PWA (Headless Progressive Web Applications), Customer Portals and more. Jahia provides a 30 day trial period of most of its products and solutions.

Jahia is supported by an active [open source community](https://academy.jahia.com/community). It initiated the [Apache Unomi](https://unomi.apache.org/) project and is an active contributor to the Karaf and Cellar Apache projects, as well as GraphQL Java. Jahia has hundreds of open source repositories on Git Hub.

The [Jahia documentation site](https://academy.jahia.com/documentation) provides useful documentation for end users, system administrators and developers.

The [Jahia module store](https://store.jahia.com/sites/private-app-store/home.html) provides modules that extend Jahia product features.

### Trying out Jahia

From the Jahia website we can download Jahia (currently at version 8) after creating a user account. The [Downloads](https://academy.jahia.com/downloads) section of the website allows downloading Jahia Enterprise and Jahia Community.

The Jahia Enterprise is available for a 30 day trial period. The community edition contains a preinstalled Jahia instance, a demo website and Jahia Studio, which allows managing Jahia modules, website content and more.

To try out Jahia, we can install it as a Docker image using the following commands:

```
docker pull jahia/jahia-dev:8.0.0.0
docker run -p 8080:8080 jahia/jahia-dev:8.0.0.0
```

This provides an Enterprise edition of Jahia for a 30 day period. The Jahia instance can be accessed over port 8080.

The community edition has the following features: Content editing, Digital asset management, Multi-language management, Search, Digital portal building, Engagement, Web marketing, Ouf-of-the-box mobile readiness and advanced multi-channels features and Developer tools which includes Jahia Studio and Integrated Development Tools.

### Jahia system requirements
The [Jahia system requirements](https://academy.jahia.com/documentation/system-administrator/jahia/8/installing-and-configuring-jahia/installing-configuring-and-troubleshooting-jahia/prerequisites-and-system-requirements) are quite demanding. Jahia requires Java JDK version 8 or 11. It requires 4 Gb of RAM and a dual core processor for a development environment and 8 Gb RAM and quad core processor for a production environment.

Java 8 is the default Java version for Debian 9. It may be installed using the command: **apt-get install default-jdk**.

To install JDK version 11, we need to add the backports repository to the apt sources list using the command:

```
echo 'deb http://ftp.debian.org/debian stretch-backports main' | sudo tee /etc/apt/sources.list.d/stretch-backports.list
```

We can then install the JDK 11 using the command: **apt-get install openjdk-11-jdk**. To see which version of Java was installed, enter the command: **java -version**. The article [Install Java on Debian 9 Operating System](https://linuxconcept.com/install-java-on-debian-9-operating-system/) describes how to install Java on Debian 9. Java JDK comes in two flavors called OpenJdk and OracleJdk. Installation of both flavors is described in the article.

Also make sure to set the **JAVA_HOME** environment variable to the path of the JDK installation. On Debian 9 the location of the JDK is **/usr/lib/jvm/java-11-openjdk-amd64**. The variable should be set in /home/[user]/.bashrc file, where [user] is the system user account used to run Jahia. For example add following to /home/user/.bashrc file:

```
export JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"
export PATH=$JAVA_HOME/bin:$PATH
```

### Installing Jahia community
To install Jahia community, we need to first create an account on the Jahia website and then download the community edition zip file. Once the file has been downloaded, it needs to be unzipped. Next we need to run the file **start.sh**. The command should be run as a non root user. After that Jahia should be up and running. It should be accessible on port 8080.

### Jahia features
I downloaded and installed Jahia first as a Docker image. This provided an out of the box preinstalled Jahia enterprise edition. However it had a 30 day trial period. Next I downloaded the Jahia community edition zip file. 

Both Jahia instances are basically a Content Management System (CMS), which allow managing website content from a back-end area. Modules can be used to add features to the website. These modules provide a wide range of features that can make your website function as a simple CMS, or a CRM (customer relationship management).

Jahia has a front-end and a back-end. The front-end is simply the front-end of the default website that was created from the Jahia back-end. The Jahia back-end is also called Jahia Studio. It is accessible over port **8080** on the url **/start**. For example **http://localhost:8080/start**. Jahia Studio allows managing modules, websites, users and groups and more.

The [Jahia module store](https://store.ahia.com/sites/private-app-store/home.html) provide a wide range of features. For example there are modules related to Business and Commerce, Collaboration and Document Management, Content Types, Marketing, Portals, Social Networks and User Generated content, Templating and Extensions and Tools and Utilities.

Depending on the modules installed, your Jahia instance can function as an Ecommerce site, a Blog, as a Social Network or any other type of site that can be created from Jahia modules. The [Jahia documentation on managing modules](https://academy.jahia.com/documentation/system-administrator/jahia/8/server-administration-ui/modules-and-extensions/modules) describes how to create, install and update Jahia modules.

### Conclusion
Jahia is an excellent enterprise content management system. It is very flexible and has a lot of features. It is easy to install and is well documented.
