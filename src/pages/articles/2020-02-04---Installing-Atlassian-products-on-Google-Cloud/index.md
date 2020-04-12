---
title: Installing Atlassian products on Google Cloud
date: "2017-11-14"
layout: post
draft: false
path: "/posts/installing-atlassian-products-on-google-cloud"
category: "software installation and configuration"
tags:
  - "software installation and configuration"
  - "collaboration tools"
description: "Atlassian is a software company that develops products for software developers and project managers. Its main products are an Issue Management system called Jira and a Document Management and Collaboration platform called Confluence."
---

### Introduction
Atlassian is a software company that develops products for software developers and project managers. Its main products are an Issue Management system called **Jira** and a Document Management and Collaboration platform called **Confluence**.

Other products by Atlassian include a group chat system called **Hip Chat**, An Identity Management System called **Crowd**, A Version Control System for Source Code called **Bit Bucket** and a Continuous Integration platform called **Bamboo**.

In this article I will describe my experience with installing, configuring and integrating Jira, Confluence, Crowd and Hip Chat. We used the cloud version of Hip Chat. The other products were self hosted and installed on a separate LXC container on a Google Cloud instance. Each product was accessed through a Nginx proxy server.

Atlassian provides two versions of each product. A cloud version which is hosted by Atlassian and a server version which can be hosted by us. Atlassian products are written in pure Java and are run from a Tomcat container.

Multiple Atlassian products cannot be run from a single Tomcat container. All products require the latest installation of Java Development Kit. (JDK). Atlassian products require significant hardware resources.

Installation of the products is well documented and easy to follow. The Atlassian support staff is helpful and its forum is informative. All Atlassian products have a minimum fee of 10 USD per year. According to Atlassian, this amount is donated entirely to Charity. All Atlassian products support addons. Addons can be used to integrate Atlassian products with each other and with third party applications.

### Jira Issue Management
Jira is an issue management platform. It can be used for issue tracking, bug tracking and project management. Jira is offered in three packages. Jira Core, which is the base software. Jira Software, which is intended for use by software development teams and Jira Service Desk, which is intended for I.T support and Help Desk staff. All three Jira packages may be used together. Jira functionality can be extended with the help of addons.

#### Installing Jira
Jira requires about 2 Gb RAM. Installation of Jira is very simple and is described in this [Jira Installation Guide](https://confluence.atlassian.com/adminjiraserver073/installing-jira-applications-on-linux-861253030.html). To install Jira, we need to first download the installer. The installer is run from the command line and it prompts for a few questions such as the installation directory, TCP ports etc.

Once the installer has run, Jira should be accessible from a web browser on port 8080. We then have to run the setup wizard. The setup wizard has an automated install option and a manual install option. If we select the manual install option, then we are first asked to select a database type and enter our database credentials.

Next we will be asked to enter the general site information such as site name, base URL for the site etc. After that we need to enter our license. Then we need to enter the admin account information. After that we need to enter the mail server information. The Jira should now be ready to use.

#### Jira Features
The main features of Jira are project management and issue tracking. A project contains issues. Issues can be viewed on a Kanban board or as a list. Issues can have custom fields and can be searched using different criteria. Issues may also be updated in bulk. Jira provides dashboards which give a summary of the issues. Jira users can be managed locally or from a directory server such as Atlassian Crowd. Crowd supports user management and Single Sign On (SSO) for Jira.

Capture for Jira is an addon for Jira that allows creating Jira issues from a Google Chrome extension. For example a software developer who is working on fixing a bug on a web page, can create an Issue in Jira using the Jira Chrome extension. The extension displays a screenshot of the web page that the developer is working on. The developer may annotate this screenshot. The developer can then create a new Jira issue with the screenshot as an attachment

### Confluence Document Management
Confluence is a document management system. It provides spaces within which documents are managed. A space is a grouping of functions related to document management. For example within a space, we can create wiki pages, write blog posts or post questions and answers.


#### Installing Confluence
Confluence requires about 6 Gb RAM. Installation of Confluence is very simple and is described in this [Confluence Installation Guide](https://confluence.atlassian.com/doc/installing-confluence-on-linux-143556824.html). To install Confluence, we need to first download the installer.

The installer is run from the command line and it prompts for a few questions such as the installation directory, TCP ports etc. Once the installer has run, Confluence should be accessible from a web browser on port 8090. We then have to run the setup wizard. In the first step, we will be asked to select the installation type. We can choose either production or evaluation. The production option requires an external database, while in the evaluation option the database is included with the installation. In the next step we will be asked to enter our license.

In the next step we will be asked to select a database type and enter our database credentials. Next we need to choose if we want to populate our site with example data. Next we need to choose how we want to manage our users. The available options are managing the users from Confluence or managing them from Jira. Next we need to enter the admin account information. Next we need to enter the mail server information. The Confluence should now be ready to use.

#### Confluence Features
Confluence allows us to manage documents, write blog posts, post questions and answers and more. All Confluence features are grouped into spaces. Confluence also allows importing content from other Atlassian products using Application Links. Application links is an addon that allows Atlassian products to import content from other Atlassian products. For example we can display Jira issues on a Confluence page using a Jira Issue Macro. This requires that both the Jira and Confluence are connected with Application Links

### Crowd Identity Management
Crowd is an identity management platform. It provides centralized user management and Single Sign on for all Atlassian products. It also provides an OpenId server called CrowdId, which allows integrating third party applications using the OpenId protocol.

#### Installing Crowd
Crowd requires about 256 Mb RAM. Installation of Crowd is very simple and is described in this [Crowd Installation Guide](https://confluence.atlassian.com/crowd/installing-crowd-24248834.html). To install Crowd, we need to first download the archive file. Next we need to specify the location of the Crowd home directory. This can be done by editing the file: **{CROWD_INSTALL}\crowd-webapp\WEB-INF\classes\crowd-init.properties**. The next step is to connect Crowd to an external database. Next we need to run the startup script start_crowd.sh in the Crowd installation directory. This will start Crowd on port 8095

#### Crowd Features
Crowd allow us to manage our users from a central location. These users can be authenticated by different applications. Each application must be registered in Crowd. Users in Crowd are stored in directories. Crowd supports the following types of directories:

* **Internal**. An Internal directory stores authentication and authorization information in the Crowd database
* **Delegated authentication**. Delegated authentication directories store the users and groups in Crowd, but delegate the authentication to an external LDAP server
* **Connector**. A connector directory is a LDAP connector that stores the user and group information in an external LDAP server
* **Remote Crowd**. A remote Crowd directory uses another Crowd directory stored on a remote Crowd instance
* **Custom**. A custom directory allows developers to implement their own interfaces for connecting custom data stores to Crowd

### Hip Chat
Atlassian Hip Chat allows chatting, video conferencing and screen sharing for teams and businesses. Hip Chat supports rooms where software developers can discuss work. All Atlassian products link with Hip Chat. For example the Jira Hip Chat integration allows developers to add chat rooms to a Jira issue. When the issue is updated, a notification is sent to the chat room on Hip Chat. Confluence and Bit Bucket have similar integrations for Hip Chat. For example each time a Confluence page is updated, a notification can be sent to a room. Similarly, when a commit is made to a repository in Bit Bucket, a notification can be sent to a chat room in Hip Chat.

### Conclusion
Atlassian products are suitable for the enterprise and software development teams. The products are very well integrated with each other and have very useful features.
