---
title: Continuous integration and Project Management with Jenkins and Redmine
date: "2017-04-11"
layout: post
draft: false
path: "/posts/continuous-integration-and-project-management-with-jenkins-and-redmine"
tags:
  - "software development"
description: "Recently I had the opportunity of installing and configuring Jenkins Continuous Integration Server and Redmine. Both of these tools are becoming increasingly popular because they simplify and organize the Software Development Process"
---

### Introduction
Recently I had the opportunity of installing and configuring [Jenkins Continuous Integration Server](https://en.wikipedia.org/wiki/Jenkins_(software)) and [Redmine](https://en.wikipedia.org/wiki/Redmine). Both of these tools are becoming increasingly popular because they simplify and organize the Software Development Process

### What is Jenkins
Jenkins Continuous Integration Server is a great tool that provides an interface combining all the steps involved in the Software Build Process.

It can automate many of the tasks that can take up a lot of time and attention of the software developer such as: compiling code, deploying code to different locations, running code tests, committing code to version control repositories, updating issue tracker etc

Jenkins has almost 1,000 plugins that integrate it with other systems such as [Github](https://en.wikipedia.org/wiki/GitHub), [Bazaar](https://en.wikipedia.org/wiki/GNU_Bazaar), [Redmine](https://en.wikipedia.org/wiki/Redmine), [Bitbucket](https://en.wikipedia.org/wiki/Bitbucket) etc. Jenkins is a server based system written in Java that runs in a Servlet Container such as [Apache Tomcat](https://en.wikipedia.org/wiki/Apache_Tomcat). It can be accessed from the browser as well as the command line.

Jenkins itself does not perform tasks such testing or compiling code, it only provides a front-end for code testing and compilation tools. For example it allows us to add tools and scripts and run them from a user friendly interface.

### Installing Jenkins
Jenkins runs on port 8080 by default. To run Jenkins over https, you can easily configure Apache with mod_proxy so it serves Jenkins over https.

Installation of Jenkins is very simple. On Redhat based systems you can use the command **yum install jenkins** to install the Jenkins server. The Jenkins wiki describes the [installation steps](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins) in detail.

### Running builds in Jenkins
Jenkins user interface is very easy to follow. You create projects and then configure them by specifying scripts that need to run when the project is built.

After a project is configured it can be run by simply clicking on a button. This is called running a build. A build essentially runs the scripts that are configured in a project. The result of the build is indicated by a circle. If the circle is red then the build is said to have failed. If the circle is green then the build passed. If one of the scripts in the project returns an error code then the build fails.

### Use Case: Deploying WordPress with Jenkins

#### Deployment Scenario
I had used Jenkins to simplify WordPress deployment. I was developing WordPress themes and plugins. I had setup a development site where I did the development work. There were two copies of the live site that were load balanced. Each site was behind a varnish caching server. So every time the development site was updated, both live sites had to be updated and all varnish caches had to be cleared.

Furthermore JavaScript and CSS files had to be copied over to the Content Delivery Network Server. Also the cache files of the live sites had to be cleared as well.

#### Deployment Script
Manually clearing cache files and copying content from CDN took a lot of time and effort. I decided to write a script for automating the deployment. The script takes following parameters:

* user name of a support user account with sudo privileges. this account should exist on all servers
* host name of the live server
* password for the support user
* password for MySQL user on live server
* password for MySQL user on dev server
* user who owns the WordPress files on live server. this is usually same as the user under which Apache runs. e.g Apache or www
* deployment option. this option indicates what needs to be copied to the live server. It can have following values:  **'all'** implies copy all WordPress files and database, **'database_only'** implies copy only the database to the live servers, **'custom_theme_and_plugin_files_only'** implies copy only the custom WordPress theme and custom WordPress plugin files. I use this option when I make some small changes to the custom plugins or theme. Its useful because it only copies the plugin and theme files.
* deployment type. this can have two values. **"dev_to_live"** which copies the website from dev site to live sites and **"live_to_dev"** which copies the website from live sites to dev site.


#### Adding the script to Jenkins

I wanted to run this script from a user friendly interface, so I decided to add it to Jenkins. To add the script to Jenkins I followed these steps:

 * Created a new project and then under the project configuration I checked the option **"This build is parametrized"**. I added a single parameter called **"deployment_option"**. This parameter specifies what needs to be deployed. It corresponds to the **"deployment option" **parameter in the script. It allows the user to specify what needs to be deployed. e.g theme and plugin files or database.
 * Clicked on **"Add build step"** and then selected **"Execute Shell"**. After that I entered the path to the deployment script. I added two build steps, one for each live server. Each build step deploys the website to a live server.
 * After that I clicked on **"Post build action"** and then **Email-Notification**. Then I entered my email address.  This sends me an email in case a build fails.
 * After that I checked **"Trigger builds remotely (e.g., from scripts)"**. This generated a string token. After that I clicked on save. Thats all I had to do to configure Jenkins to deploy my WordPress site.

After that each time I wanted to deploy my WordPress site, I would first click on the project name and then **"Build with parameters"** option. I then updated the **deployment_option** parameter depending on what I want to deploy and then click on build. After that Jenkins runs the deployment script.

While the script is running the status shows as a blinking dot. Once the script has run, the dot changes to a stable red or green depending on whether the deployment script returned an error or not.

### Redmine
[Redmine](https://en.wikipedia.org/wiki/Redmine) is a well known web based Project Management application, written in Ruby language. Its features include:

* Issue Tracking
* Flexible role based access control
* Gantt Chart and Calendar
* News
* Documents
* File Management
* Web feeds and email notification
* Per Project Wiki and forums
* Simple Time Tracking
* Custom fields, Integration with well known version control systems including [SVN](https://en.wikipedia.org/wiki/Subversion_(software), [CVS](https://en.wikipedia.org/wiki/Concurrent_Versions_System), [GIT](https://en.wikipedia.org/wiki/Git_(software)), [Mercurial (software)](https://en.wikipedia.org/wiki/Mercurial_(software)), [Bazaar (software)](https://en.wikipedia.org/wiki/Bazaar_(software)) and [Darcs](https://en.wikipedia.org/wiki/Darcs)
* LDAP authentication
* Several plugins that can be used to extend Redmine

Redmine has an excellent user interface and is very easy to use. I used Redmine for organizing the development of a website based on WordPress. I found the Issue Tracker, Time Tracker and Document manager features to be very user friendly with lots of features.

#### Installing Redmine
Installation of Redmine is not as simple as with Jenkins. The Redmine Wiki describes the [installation steps](http://www.redmine.org/projects/redmine/wiki/redmineinstall) in detail.

### Conclusion
Both Redmine and Jenkins have plugins that allow integration with each other. Both tools are popular especially with large software development teams.
