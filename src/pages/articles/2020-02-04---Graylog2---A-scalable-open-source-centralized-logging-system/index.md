---
title: Graylog2 - A scalable open source centralized logging system
date: "2017-11-14"
layout: post
draft: false
path: "/posts/graylog2---a-scalable-open-source-centralized-logging-system"
category: "software installation and configuration"
tags:
  - "software installation and configuration"
description: "In this blog post I will describe my experience with using an open source centralized logging system called Graylog2. Graylog2 is an excellent log management system. It is based on well known open source tools such as Mongodb and Elasticsearch."
---

### Introduction
In this blog post I will describe my experience with using an open source centralized logging system called [Graylog2](http://www.graylog2.org). Graylog2 is an excellent log management system. It is based on well known open source tools such as [Mongodb](http://www.mongodb.org/) and [Elasticsearch](http://www.elasticsearch.org/). It allows I.T administrators to collect logging information from almost any source, including Linux and Windows computers.

Graylog2 works by collecting log messages from different sources. The log messages are saved in a central database. This database is queried and the query results are displayed on a nice web interface. Alerts can be configured that notify the administrator in case certain terms appear in search logs.

### Installing Graylog2
Graylog2 installation is very simple. It requires a Linux server with Java. Graylog2 provides package repositories for Debian, Ubuntu and Centos based Linux distributions.

Installing Graylog2 is as simple as installing the package repository and then entering the command:

```
yum install graylog2-server graylog2-web
```

on Centos and

```
apt-get install graylog2-server graylog2-web
```

on Debian and Ubuntu. After installation a few fields need to be changed in the Graylog2 configuration files and thats all!. The installation is described in the [Graylog2 documentation](http://docs.graylog.org/en/1.2/pages/installation/operating_system_packages.html).

The standard Graylog2 installation involves 2 main components graylog2-server and graylog2-web. Large scale deployments of Graylog2 are more complex and involve a component called Graylog2-radio.

### Conclusion
Graylog2 is a scalable log management system that can handle Terabytes of data. It is a useful tool for collecting and analyzing log data.
