---
title: Upgrading from Debian Jessie to Debian Stretch
date: "2018-06-28"
layout: post
draft: false
path: "/posts/upgrading-from-debian-jessie-to-debian-stretch"
tags:
  - "server management"
  - "cloud computing"
description: "Debian 9, also known as Debian Stretch is currently the latest stable version of the Debian operating system. It was released on 17th June 2017 as successor to Debian 8 also known as Debian Jessie."
---

### Introduction
Debian 9, also known as [Debian Stretch](https://wiki.debian.org/DebianStretch) is currently the latest stable version of the Debian operating system. It was released on 17th June 2017 as successor to Debian 8 also known as Debian Jessie.

Under the [Debian release cycle](https://en.wikipedia.org/wiki/Debian#Release_cycle), stable versions of the Debian operating system are released every two years. Updates are provided for a total of three years. The Debian Security Team is responsible for providing security updates for the Debian operating system. Once a release has reached its end of life, the [Debian LTS (Long Term Support) team](https://wiki.debian.org/LTS) takes over the job of providing security updates.

Debian Jessie which was released on 26th April 2017, reached its end of life on 17th June 2018. While it is still possible to receive security updates after this period, it is recommended to upgrade to the next stable release which is Debian Stretch. Google Cloud support sent notifications to its customers asking them to upgrade to Debian Stretch as soon as possible.

Debian Stretch contains numerous bug fixes as well as new updated versions of popular programming languages and servers. Upgrading to Debian Stretch is highly recommended. In this article I will describe my experience with upgrading the operating system of a server based in Google Cloud from Debian Jessie to Debian Stretch. I learned a few important lessons which should benefit system administrators.

### Performing the upgrade
The process for upgrading from Debian Jessie to Debian Stretch is described in the [Debian release notes](https://www.debian.org/releases/stable/amd64/release-notes/ch-upgrading.en.html). Although the upgrade guide is very detailed, the main steps are as follows:

* #### Backup data and configuration information
You should ensure that all useful data on your server is backed up before starting the upgrade.
* #### Inform users in advance and prepare for downtime on services
You should inform the users of your system about the downtime. Also prepare for downtime of the services running on the system, such as intranet websites.
* #### Update the operating system packages on the current system
This requires installing updates to packages and removing unused packages. This can be accomplished with the commands: **apt-get update** followed by **apt-get upgrade**. After running these two commands, all packages installed on your system through the Debian package manager will be updated to the latest version. You should also remove unused packages using the command: **apt-get autoremove**.
* #### Update apt sources
The file **/etc/apt/sources.list** contains URLs of package repositories. The URLs should be updated so they point to the repositories containing Debian Stretch packages. Apt files for custom repositories which are in **/etc/apt/sources.list.d** should also be updated.
* #### Perform minimal system upgrade
This step involves installing minimum updates. This step is needed because the full upgrade process installs new version of all packages and also removes obsolete packages. It can sometimes remove useful packages.

It is therefore recommended to first perform a minimal upgrade before performing the full upgrade. The minimal upgrade can be performed using the commands:

```bash
apt-get update
apt-get upgrade
apt-get autoremove
```

* #### Perform the full upgrade
The full upgrade installs new versions of all packages. It also resolves dependencies between packages and may install new required packages and remove obsolete packages.

The full upgrade can be done using the command:

```bash
apt-get dist-upgrade
```

While installing new versions of packages, it may prompt the user to choose whether to overwrite existing configuration files with newer versions or to keep the current version.

It may also provide an option for checking difference between new and current versions of the configuration files. After the full upgrade has completed, obsolete packages should be removed using the command:

```bash
apt-get autoremove
```

followed by a system reboot.

### Problems with updating packages
The upgrade process described in the Debian documentation is easy to follow and should complete without issues. I was able to complete the operating system upgrade without problems. However I ran into issues when updating certain packages.

The Debian package repository usually provides old versions of programming languages and applications which are stable and tested for Debian but are not the current stable version.

The server I was upgrading had the following packages installed through custom repositories: R, PHP, MySQL and Postgresql. I thought it would be a good idea to upgrade these packages to the latest version.

Unfortunately, I did not consider the possibility that the applications that depend on these packages may not work with the newer package versions.

For instance the web based email management application, Mautic does not work with PHP 7.2. Also LimeSurvey does not seem to support MySQL 8.0. As a result several applications stopped working after the upgrade.

### Conclusion
The saying: "**Dont fix what is not broken**", is a useful reminder to system administrators. Updating packages may seem like a good idea, but its consequences should first be determined, since it can cause important applications to malfunction.
