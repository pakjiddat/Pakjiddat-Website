---
title: Installing Editoria book publishing platform
date: "2019-03-09"
layout: post
draft: false
path: "/posts/installing-editoria-book-publishing-platform"
category: "software installation and configuration"
tags:
  - "software installation and configuration"
description: "Editoria is a web based tool for publishing books. It allows editors and authors to collaborate on book publishing. Editoria is being developed by the University of California Press and the California Digital Library in partnership with the Coko Foundation."
---

### Introduction
Editoria is a web based tool for publishing books. It allows editors and authors to collaborate on book publishing. Editoria is being developed by the University of California Press and the California Digital Library in partnership with the Coko Foundation.

[Editoria's goal](https://editoria.pub/about-us/) is to provide a modern web based publishing platform that is more efficient, then current desktop based book publishing software. Editoria provides a web based workflow tool for styling, copyediting, author review, and proofreading.

Editoria is available as open source software and can be downloaded and installed by anyone free of cost. It is based on NodeJs library.  In this article I will describe my experience with installing Editoria on Debian 9 (Stretch) operating system

### Installation
Editoria is based on several [PubSweet](https://gitlab.coko.foundation/pubsweet) components. It also uses PostgreSQL database. Installation and configuration of Editoria is simple, but unfortunately is not well documented.

Editoria requires NodeJs version **8.3** and above. Version **8.9** worked for me. [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/) are also required for running the PostgreSQL database server.

#### Installing project dependencies
The first step in installing Editoria is to clone the source code repository on GitLab using the command:

```
git clone https://gitlab.coko.foundation/editoria/editoria.git
```

The next step is to install the project dependencies using the [Yarn](https://yarnpkg.com/en/) package management tool for NodeJs. Yarn can be installed using the command: **npm install -g yarn**. To install the dependencies for the Editoria, run the command **yarn** from the root folder of the source code.

The next step is to change directory to application folder which is **packages/editoria-app** and create the configuration file: **config/local-development.json**. This was not possible since the **packages/editoria-app** folder did not exist. A similar [issue](https://gitlab.coko.foundation/editoria/editoria/issues/238) was mentioned on the Editoria issue tracker. The solution as suggested in the issue was to first clone the repository **https://gitlab.coko.foundation/editoria/ucp.git** and then replace the text **https://git@gitlab.coko.foundation/pubsweet/html-epub** with **https://git@gitlab.coko.foundation/pubsweet/html-epub.git**, in the file **yarn.lock**.

#### Configuration
After that the dependencies should be installed with the command: **yarn**. The application folder is the root folder of the source code. Next the configuration file **config/local-development.json** needs to be created. This file contains credentials for configuring the [INK server](https://gitlab.coko.foundation/INK/ink-api). The INK server provides an API for uploading Word files. Without the INK server the user will not be able to upload Word files. I did not install the INK server, so there was no need to edit the configuration file

The next step is to create the configuration file, **config/development.env**. This file contains environment variables such as database server credentials, email server information and the INK server credentials

The environment variables given in the file should be imported with the command: **source config/development.env**.

#### Database server configuration
Next the database server should be started with the command: **yarn start:services**. The command should be run from the root folder. It will start the Docker container containing the PostgreSQL server.

If the command **yarn start:services** fails with the error, that the root role does not exist, then the root role and an admin user should be created within the Docker container. The steps for creating the role and user are described in an answer to the question: [PostgreSQL error: Fatal: role “username” does not exist](https://stackoverflow.com/a/23934693/4508593) on StackOverflow.

To create the database role and user, we first need to get the name of the container using the command: **docker container ls**. Next we need to enter the container command prompt with the command: **docker exec -it {container name} /bin/bash**.

Next we need to switch to user **postgres** and then select the **template1** database from psql prompt. This can be done with the commands:

```
sudo su - postgres;
psql template1;
```

The **template0** and **template1** databases are default databases in PostgreSQL, that are used as templates for creating new databases. The default **postgres** database is intended to be used by users, utilities and third part applications. Next we need to create a role with super user privileges. This can be done with the command: **CREATE ROLE root superuser;**

Next we need to create a user with the command: **CREATE USER username; ** and assign it root role with the command: **GRANT ROOT TO username;**. Next we need to give login access to the user with the command: **ALTER ROLE root WITH LOGIN**.

Once we have created the root role and user, we need to configure the database with the command: **yarn resetdb**. This will prompt for a user name and password. It will also create some database tables. The user name and password specified here should be noted and entered in the **config/development.env** configuration file. After the file has been edited, the environment variables in the file should be imported with the command: **source config/development.env**.

After that we should start the database server again with the command: **yarn start:service**. Next in a new terminal, we can start the main Editoria application with the command: **yarn server**. This will start the Editoria application on **port 3000**. We should then be able to access the Editoria from a browser

### Conclusion
Editoria is an innovative book publishing platform, that allows all people involved with book publishing to collaborate. It is a useful tool for speeding up the book publishing process
