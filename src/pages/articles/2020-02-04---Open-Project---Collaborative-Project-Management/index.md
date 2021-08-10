---
title: Open Project - Collaborative Project Management
date: "2017-11-14"
layout: post
draft: false
path: "/posts/open-project---collaborative-project-management"
tags:
  - "software installation and configuration"
description: "Open Project is an online project management application with collaboration features. It is one of the most popular open source project management software."
---

### Introduction
Open Project is an online project management application with collaboration features. It is one of the most popular open source project management software.

Open Project is written in Ruby and Angular Js. It is similar to [Redmine](/posts/installing-and-configuring-redmine) but has more features out of the box. For example features such as Agile & Scrum and Mobile support are not present in Redmine by default but may be added using plugins. Also Redmine has better support for managing software projects, while Open Project supports all types of projects.

### Features
Open Project provides support for all stages in a project's life-cycle. Starting from Project conception and initiation to Project definition and planning, Project launch, Project performance and control and finally the Project closing stage.

Features provided by Open Project include: **Gannt Chart, Calendar, Roadmap, Issue Tracking, Activity Streams, Meetings, Agile & Scrum, Cost Reports, Budgets, Wiki, News and Forum**. Open Project functionality can be enhanced using plugins. Open Project has an enterprise edition with more features than the community edition. It also has support for mobile devices.

### Installation
Open Project installation is very simple and is described in the [Open Project Installation Guide](https://www.openproject.org/download-and-installation/#installation). To install Open Project on Debian Jessie we need to first install the packager.io repository signing key using the command:

```bash
wget -qO- https://dl.packager.io/srv/opf/openproject-ce/key | sudo apt-key add -
```

Next we need to install the HTTPS support for apt using the command:

```bash
apt-get install apt-transport-https
```

After that we need to add the OpenProject package source to the package manager source list. This can be done using the command:

```bash
sudo wget -O /etc/apt/sources.list.d/openproject-ce.list https://dl.packager.io/srv/opf/openproject-ce/stable/7/installer/debian/8.repo
```

After that we can install the OpenProject software using the commands:

```bash
apt-get update
apt-get install openproject
```

This should install Open Project to the folder: **/opt/openproject**.

### Configuration
Once the installation has ended, we need to configure the Open Project using the command:

```bash
openproject configure
```

This will start the configuration wizard.

The configuration wizard will prompt the user for a number of questions such as the MySQL server information, Git/Sub version integration options, Email configuration, HTTPS certificate settings, Web server configuration options and more. The configuration wizard also allows us to enter a path prefix for the openproject installation URL.

Before starting the configuration wizard, we should have the MySQL database connection information, email settings and location of the HTTPS certificate files. If we don't have this information with us, then we can cancel the wizard at any stage and then run it again. The wizard will resume from where it was interrupted. If we want to start the configuration process again we can issue the command: **openproject reconfigure**.

When the configuration process ends, it starts the openproject server on port 6000. It also configures all the required virtual host settings for Apache, if this option was selecting during the configuration. We should now be able to login to our Open Project installation at the URL that was specified during the configuration process.

The default login information is **admin/admin**. Once the user enters this information, he will be asked to enter a new admin password

### Conclusion
Open Project is a useful project management tool. It supports all stages of a Project's life-cycle. Its design is user friendly with support for mobile devices. Its a good choice for managing projects
