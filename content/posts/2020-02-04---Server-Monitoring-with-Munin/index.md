---
title: Server Monitoring with Munin
date: "2017-04-14"
template: post
draft: false
slug: "/posts/server-monitoring-with-munin"
category: "server monitoring"
tags:
  - "server monitoring"
description: "Server monitoring is a useful task that is performed by server administrators. Server monitoring involves keeping a check on the various parts of a server such as its CPU, Memory, Hard Disk, Network Traffic, Services and more. Server monitoring can avoid problems that can disrupt services."
---

### Introduction
Server monitoring is a useful task that is performed by server administrators. Server monitoring involves keeping a check on the various parts of a server such as its CPU, Memory, Hard Disk, Network Traffic, Services and more. Server monitoring can avoid problems that can disrupt services. For example a timely alert for a failing hard disk can allow the server administrator to replace the hard drive before its too late.

Munin is a well know server monitoring tool that allows monitoring all aspects of a server. Although it is regarded as a network monitoring tool, it can do much more than monitor network traffic. It can infact monitor most services. These services may be on switches, routers or servers. Munin uses [Round Robin Database (RRD) tool](https://en.wikipedia.org/wiki/RRDtool) for storing the data.

Munin works by collecting data from the services being monitored. This data is stored in RRD files. The data in these files is then displayed on graphs. [Round Robin Database (RRD) tool](https://en.wikipedia.org/wiki/RRDtool) is a standard for storing data which varies with time such as network bandwidth, CPU load, temperature etc.

### Architecture
The Munin architecture consists of three main parts. The Munin master, the Munin Node and Munin plugins. The Munin master and nodes have a client server relationship. In a typical Munin installation, there is one Munin master and one or more Munin nodes. The Munin nodes may collect data from remote devices such as switches, routers, firewalls, gateways etc using standard protocols such as SNMP and SSH.

The job of the Munin master is to poll the Munin nodes at regular intervals for data. It stores the data in RRD files. It sends alerts in case the data values exceed certain thresholds. For example it can send an email if the CPU usage exceeds a certain value.

The Munin master also generates graphs from the data. It consists of following components: **munin-cron** is the main script that runs the Munin master. It is run every 5 minutes by default. It calls the scripts **munin-update** which collects data from Munin nodes and munin-limit which checks if the data values are within the threshold limits.

The Munin node runs on one or more servers as a cron job. It listens on TCP port 4949. It executes the Munin plugins and returns the data for each plugin to the Munin server.

Munin Plugins are basically scripts that return the time series data for the service being monitored as well as information on how to graph the data. Munin plugins can be written in any programming language, although they are usually written in Perl.

### Installation
Munin can be installed either from source code or from package repositories. The [Munin installation guide](http://munin.readthedocs.io/en/latest/installation/index.html) strongly recommends installing from package repositories.

On Centos, Munin is part of the default package repositories and can be installed with the command:

```bash
yum install munin munin-node
```

This will install the latest stable version of Munin. As of now the stable version of Munin is 2.0.30. The development version of Munin is 2.999.6. The development version has a much better user interface as can be seen from this [demo](http://demo.munin-monitoring.org/).

### Configuration
After installing Munin, the next step is to configure it so it monitors the required services. To configure Munin we need to add the host names of the Munin nodes in the Munin server configuration file. This is usually **/etc/munin/munin.conf**.

We also need to copy the plugin files to the Munin service directory which is /etc/munin/plugins. The service directory contains symbolic links to the actual plugins files. There are two types of Munin plugins. The core plugins which are part of the Munin installation and the [Third party plugins](http://gallery.munin-monitoring.org/contrib/) which are developed by various contributors.

The core plugins are part of the Munin installation and are usually located in /usr/share/munin/plugins. To Install a Munin plugin, we simply have to create a symbolic link inside the service directory which points to the actual plugin file. For example:

```bash
ln -s /usr/share/plugins/http_loadtime /etc/munin/plugins/
```

After that we need to restart the Munin node service using the command:

```bash
service munin-node restart
```

The munin-node service needs to be restarted after changes to the Munin configuration files or plugins. Third party plugins may be downloaded to any location. They can be installed by simply adding a symbolic link to the actual plugin file.

A Munin plugin usually monitors one service. However it is possible for a Munin plugin to monitor several services. A Munin wildcard plugin can monitor several services. By convention the name of a wildcard plugin ends with **"_"**. For example the mysql_ core plugin is a wildcard plugin. It monitors several services such as MySQL network traffic, MySQL slow queries, mysql innodb buffer pool etc.

To get the list of services monitored by a wildcard plugin we can run the command:

```bash
munin-run plugin_name suggest
```

The **munin-run** command allows us to test run the plugin. To monitor one of the services supported by the mysql plugin for example the mysql slow queries, we can use the following command:

```bash
ln -s /usr/share/munin/plugins/mysql_ /etc/munin/plugins/mysql_slow
```

We can have several plugins that all point to the same mysql_ plugin file.

### Troubleshooting
Munin errors are stored in log files located at **/var/log/munin** and **/var/log/munin-node**. The most important log files to monitor are: **/var/log/munin/munin-update.log**, which contains log messages reported by the Munin master during data collection and **/var/log/munin-node/munin-node.log**, which contains log messages reported by the Munin node.

Sometimes Munin log files report plugin timeout errors. An interesting approach to fix such problems was discussed on Server Fault. The question is titled: ["Munin mysql plugins results inconsistent, with IPC::Sharelite store() error: Identifier removed"](https://serverfault.com/questions/542232/munin-mysql-plugins-results-inconsistent-with-ipcsharelite-store-error-ide). It discussed errors reported by the Munin mysql_ wildcard plugin.

This plugin uses shared memory for storing data. Sometimes access to the shared memory can be blocked by a semaphore. The solution to the problem was to use strace tool to find the semaphore id and then use the command:

```bash
ipcrm -s semaphore-id
```

to remove the semaphore. This solution was very useful for me as it fixed all the errors reported by Munin node.

Munin provides a web interface which displays the graphs of the monitored services. Configuring the web interface can be a bit tricky because of SeLinux or server management tools such as Plesk or Cpanel.

The current version of Munin which is 2.0.30 contains a virtual host configuration file for Apache server which simplifies the task of configuring the web interface. This configuration file may need to be updated depending on the Munin installation paths.

The development version of Munin contains a built in web server called munin-httpd which handles the task of serving html files and graph images. The munin-httpd can easily be served over a reverse proxy server such as Nginx or Apache.

Munin graphs and HTML files can be generated in two ways. They can either be generated at regular intervals using the **munin-graph** and **munin-html** scripts or they can be generated on demand using the cgi scripts **munin-cgi-graph** and **munin-cgi-html**. Since graph generation can consume significant amount of CPU and Memory, some users may prefer to generate the graphs on demand. Configuration of on demand graph generation requires modification of the Apache virtual host configuration file and can be a bit tricky.

### Conclusion
Munin can monitor almost any time related activity with the help of plugins. There are Munin plugins for monitoring different types of services such as LDAP, Snort, Bind Dns, Mysql, Apache etc.

There is even a Munin plugin for monitoring the PageSpeed score of a web page. While Munin runs only on Linux based operating systems, it can monitor services running on Windows operating system. Munin is a very useful Server Monitoring tool with many features.
