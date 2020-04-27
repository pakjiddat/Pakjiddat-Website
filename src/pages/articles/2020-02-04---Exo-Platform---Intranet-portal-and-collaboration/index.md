---
title: Exo Platform - Intranet portal and collaboration
date: "2017-11-22"
layout: post
draft: false
path: "/posts/exo-platform---intranet-portal-and-collaboration"
tags:
  - "software installation and configuration"
  - "collaboration tools"
description: "Exo Platform is an Intranet portal with collaboration features written in Java language. It is available as open source. It allows employees to collaborate effectively and productively. Its main features are an activity stream, documents, wiki, calendar, forums, contacts and spaces."
---

### Introduction
Exo Platform is an Intranet portal with collaboration features written in Java language. It is available as open source. It allows employees to collaborate effectively and productively. Its main features are an **activity stream, documents, wiki, calendar, forums, contacts and spaces**.

### Installation
Exo Platform installation is well documented in this [Installation and Startup guide](https://docs.exoplatform.org/PLF50/PLFAdminGuide.InstallationAndStartup.html). The Exo Platform is installed using a Docker image. Developers can install the Exo Platform from source code using the [Exo Platform GitHub repository](https://github.com/exoplatform/platform-public-distributions).

#### Installing as a Docker image
The [Installing eXo Platform Community Edition](https://docs.exoplatform.org/PLF50/PLFAdminGuide.InstallationAndStartup.CommunityEdition.html) guide describes how to install Exo Platform community edition from a Docker image. The [Exo Platform page on DockerHub](https://hub.docker.com/r/exoplatform/exo-community/) is a useful resource for installing Exo Platform community edition.

To install the Exo Platform from Docker image, we need to run the command:

```bash
docker run -d -p 8080:8080 --name=exo exoplatform/exo-community:latest
```

This will download the latest community edition of Exo Platform and start it on port 8080.

By default the Exo Platform uses HSQL database. It is recommended to use MySQL database for production environments. The database connection information, port numbers and other parameters can be set by passing environment variables to the Docker container. For example the command:

```bash
docker run -d -p 8080:8080 --name=exo -e EXO_ADDONS_LIST="exo-tasks:1.0.0,exo-answers" exoplatform/exo-community:latest
```

will install the task and answers addons and start the Exo Platform on port 8080. The different customization options are described on the [Exo Platform page on DockerHub](https://hub.docker.com/r/exoplatform/exo-community/).

#### Installing from source
To install the Exo Platform from source we need to clone the [Exo Platform source code repository](https://github.com/exoplatform/platform-public-distributions). In order to install from source, we need to have Apache Maven installed.

Apache Maven is a build tool for Java. Once we have installed the Apache Maven, we need to change to the cloned source code repository. Next we need to run the command:

```bash
mvn install
```

This will start the build process which will create the required executable scripts. The build process installs the Exo Platform as a Tom Cat application.

To start the Exo Platform we need to run the command:

```
plf-community-tomcat-standalone/target/platform-community-{CURRENT_VERSION}/platform-community-{CURRENT_VERSION}/start_eXo.(sh|bat)
```

This will start the Exo Platform on the default port 8080 with **HSQL** as the database

The platform can be configured by editing the configuration files in the conf folder located in the same folder as the executable scripts. For example the file **server.xml** contains configuration information for the HSQL database.

To use MySQL instead of HSQL, we need to replace the HSQL configuration lines in server.xml with the contents of server-mysql.xml. This is described in the [database configuration guide](https://docs.exoplatform.org/PLF50/PLFAdminGuide.Database.html).

When we start the Exo Platform for the first time, we should use the command: **start_eXo.sh**. This will run the application in the foreground allowing us to see if there are any errors. The application can be stopped using the command: **stop_eXo.sh**. To run the application in the background we can use the command: **start_eXo.sh -b**.

### Addons
The addon command is used to manage the Exo Platform addons. To list the available addons, we need to run the command: **./addon list** from the same folder as the **start_eXo.sh** command.

This will list all the addons that can be installed on the currently installed version of the Exo Platform. An addon can be installed using the command:

```bash
./addon install exo-tasks:1.2.4
```

This will install the addon exo-task version 1.2.4. To install addons in a Docker based installation, we need to pass environment variables to the docker run command.

The Exo Platform has some useful addons such as **exo-tasks, exo-chat and exo-onlyoffice**. These addons are still under development for the current v5 of the Exo Platform. Stable version of these addons are available for v4.4 of the Exo Platform.

The exo-task addon adds project and task features to the Exo Platform. The exo-chat addon adds text messaging and document sharing features. The video-calls addon adds video chat features to the exo-chat addon allowing groups to video chat. The exo-chat addon integrates with the calendar, task and wiki features allowing tasks and events to be posted to the calendar and wiki.

The exo-onlyoffice addon allows office documents such as Power Point Presentations, Word Documents, SpreadSheets etc to be opened within Exo Platform. The addon basically opens the documents using the API of an Only Office server. The Only Office server needs to be installed before using this addon.

### Features
Exo Platform has two main sections. One is the company intranet and the other are spaces. Spaces are groups that may be created for special purposes. For example one space may be created for each department in a company.

Both the company intranet and spaces support **activity streams, documents, wiki, calendar, forums and contacts**. The task addon can be used to add task and project capabilities to both the company intranet and spaces.

The Exo Platform also allows creating multiple sites. Each site can belong to a specific product or company department. All features of the Exo Platform can be customized and configured from the administration area. The administration area also allows managing gadgets and portlets.

Gadgets and Portlets are small applications that can be added to pages or the Dashboard. Before a Gadget or Portlet can be used, it has to be added to one or more categories. This can be done by going to: Administration --> Application.

### Conclusion
The Exo Platform is a comprehensive feature rich application for developing Intranet portals. It has excellent [documentation](https://docs.exoplatform.org) and is being actively developed
