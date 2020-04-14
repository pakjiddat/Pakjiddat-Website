---
title: Tracking Issues with Mantis Bug Tracker
date: "2019-01-02"
layout: post
draft: false
path: "/posts/tracking-issues-with-mantis-bug-tracker"
tags:
  - "software installation and configuration"
description: "Mantis Bug Tracker is web based software that allows keeping track of issues. It is used mainly for tracking bugs in software, but may be used as a general purpose issue tracker for all types of projects."
---

### Introduction
Mantis Bug Tracker is web based software that allows keeping track of issues. It is used mainly for tracking bugs in software, but may be used as a general purpose issue tracker for all types of projects.

[Mantis Bug Tracker](https://en.wikipedia.org/wiki/Mantis_Bug_Tracker) was first released in 2000. It is supported by an active software community and is stable and user friendly.

It is written in Php language and supports several databases including MySQL, MSSQL and Oracle. In this article, I will describe my experience with installing and using [Mantis Bug Tracker](https://www.mantisbt.org/) for tracking software related issues. I will also describe my experience with upgrading Mantis and migrating issues from Jira to Mantis

### Installation
Installation of Mantis Bug Tracker is very simple and takes a couple of minutes. It is well documented in the [online documentation for Mantis](https://www.mantisbt.org/docs/master/en-US/Admin_Guide/html/admin.install.new.html). The pre-requisites for using Mantis Bug Tracker are a Web Server, Php and a database server such as MySQL.

To install Mantis Bug Tracker, we need to first [download the files from SourceForge](https://sourceforge.net/projects/mantisbt/files/mantis-stable/2.18.0/), and then extract them to the document root folder. Next we need to run the installer from the web browser by visiting the url: http://your-domain/path-to-mantis/.

The web based installer will ask a few questions such as the name of the database server, user name and password for the database user and the database table name prefix. After entering the required information, we need to press submit and the installer will create the database tables. This completes the installation process.

The [process for upgrading Mantis Bug Tracker](https://www.mantisbt.org/docs/master/en-US/Admin_Guide/html/admin.install.upgrade.html) is identical to the installation process. To upgrade an existing installation of Mantis, we need to simply install the new version of Mantis and specify the information for the existing Mantis database during the installation.

Once the installation has completed, we can login with user: **administrator** and password: **root**. We will be prompted to remove the **admin** installation folder and change the default password. For those interested in trying out Mantis, a [demo of the current version](https://www.mantisbt.org/bugs/my_view_page.php) is provided.

### Configuration
The [Mantis Admin Guide](https://www.mantisbt.org/docs/master/en-US/Admin_Guide/html/) provides useful information about Mantis. To get started with Mantis, we need to first create a project. Each project contains issues.

#### Issues
The issue is the main feature of Mantis. It contains fields such as **description**, **summary**, **reporter**, **assigned to**, **status**, **resolution**, **steps to reproduce the issue**, **additional issue information** and more. We can also add unlimited **notes**, **attachments**, **tags** and **custom fields** to issues.

#### Projects
A project is a container for issues. Each project can have its own **sub projects**, **custom fields**, **categories** and **versions**. The list of users with access to the project can also be given.

#### Change Log
A useful feature of Mantis is the **Change Log**. It allows us to keep track of our projects. The Change Log shows the list of issues grouped by project version. To use the Change Log we need to first add versions to our project. When reporting an issue, we can select the project version under the "Fixed in Version" and "Product Version" fields. The issue will then appear under this project version on the "Change Log" page.

#### Road Maps
The Road Map shows issues for future versions of our projects. Each project version may be marked as **released**. A project which is not marked as released will show up on the Road Map page along with the relevant issues.

The Road Map page shows a progress bar describing how much progress has been made in completing the project. The progress is calculated by the number of issues completed in the project version. To configure an issue so it shows on the Road Map, we need to select the project version under the "Target Version" field. This field shows only project versions that have not been released.

#### Email Notifications
Another useful feature of Mantis is the ability to get email notifications on issue changes. These notification emails may be configured at a detailed level for user roles. For example each time an issue is updated, an email may be sent to the project developers describing the change.

The Mantis configuration file allows detailed configuration of Mantis including **enable/disable email notification**, **email server settings for SMTP email**, **Logo and title**, **fields to show/hide on the add, edit and view issue pages** and much more. A useful feature of Mantis is that it allows configuration of almost all features at a detailed level.

#### Plugins
A useful feature of Mantis is the ability to customize its features using plugins. The [list of plugins](https://www.mantisbt.org/wiki/doku.php/mantisbt:plugins:start) for Mantis is listed on the Mantis wiki. For most plugins, the installation is as simple as downloading and extracting the plugin files to the **plugins** folder. After that the plugin needs to be enabled from the plugins page.

### Migrating issues from Jira to Mantis
[Jira](https://en.wikipedia.org/wiki/Jira_(software)) is a feature rich Issue Tracker from Atlassian. Like Mantis it has been in use for several years and is in active development.

In the article, [Installing Atlassian products on Google Cloud](/posts/installing-atlassian-products-on-google-cloud), I described my experience with using Jira. Jira has more features than Mantis, but its main drawback is that it takes a lot of server resources. In order to reduce our billings on Google Cloud, we decided to migrate from Jira to Mantis.

To migrate issues from Jira to Mantis, I first selected a project in Jira and enabled the columns that I wanted to export. Next I clicked on the option for exporting to CSV format with current fields. This exported all the issues in the project to a CSV file. I did this for all the projects that I wanted to export.

Next, I installed the [Mantis CSV Import plugin](https://github.com/mantisbt-plugins/csv-import), which allows importing issues from a CSV file. To import the Jira issues, I simply uploaded the CSV files one by one.

After each upload, I was asked to select the field mappings for the issues. The field mappings option allows selecting the fields on the issue page that corresponds with fields in the CSV file. After selecting the field mappings, the issues were imported. The imported process completed but gave an ["Internal Application"](https://mantisbt.org/bugs/view.php?id=25122) error, which I posted to the issue tracker for the plugin.

### Conclusion
Mantis Bug Tracker is very user friendly and easy to use. It is stable, well documented and is supported by an active community. Its useful for keeping track of all types of issues such as those related to Server Management, Website Maintenance and Website Development.
