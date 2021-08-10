---
title: Preventing SSH and SQL injection attacks using Fail2ban
date: "2019-09-10"
layout: post
draft: false
path: "/posts/preventing-ssh-and-sql-injection-attacks-using-fail2ban"
tags:
  - "cyber security"
  - "server monitoring"
description: "Fail2Ban is an intrusion detection and prevention tool for Linux operating system. It is written in Python language. It works by checking log files using regular expressions. Entries that match the regular expression are banned by adding the IP address to the system firewall."
---

### Introduction
[Fail2Ban](https://www.fail2ban.org/wiki/index.php/Main_Page) is an intrusion detection and prevention tool for Linux operating system. It is written in Python language. It works by checking log files using regular expressions. Entries that match the regular expression are banned by adding the IP address to the system firewall.

Fail2Ban is usually used to prevent Brute force SSH attacks. It can also be used to prevent attacks on other services such as web server, ftp server, mail server or even a custom service.

### Installation
Fail2Ban can be installed on Debian 9 (stretch) using the command:

```bash
sudo apt-get install fail2ban
```

This configures fail2ban to automatically start on system boot. Fail2ban service can be controlled using the fail2ban-client command. For example the command:

```bash
fail2ban-client start
```

starts the Fail2Ban service. The command:

```bash
fail2ban-client status
```

lists the active Fail2Ban jails.

### Configuration
Fail2Ban uses the concept of filters, actions and jails. A filter defines the regular expression used to search for invalid entries in a log file. An action is taken to ban an IP address that matches a filter. The default action is to add the IP address to the system firewall.

A jail defines the log file to be checked as well as other settings such as the **maxretry**, **bantime** and **findtime**. maxretry defines the maximum number of times the server can be accessed from an IP address, before it is banned. findtime defines the time window within which login attempts are made. For example if 5 login attempts are made within a 10 min findtime value, then the IP address is banned.

By default Fail2Ban is configured to ban failed SSH login attempts. Fail2Ban is pre-configured with jails for various services. However these jails need to be activated and customized if required.

For example to activate and customize the **nginx-botsearch** jail, we need to create the file: **/etc/fail2ban/jail.local**. Alternately we can create this file in **/etc/fail2ban/filter.d** folder. This file should have following contents:

```
[nginx-botsearch]

enabled  = true
logpath  = /var/log/nginx/access.log
filter   = filter-name
maxretry = 2
port     = http,https
```

The **enabled** line indicates that the filter should be active. **logpath** is the path to the Nginx access log file. **filter** indicates that the filter file, **filter-name.conf** should be used. The filter file should be defined in **/etc/fail2ban/filter.d** folder. The following is a sample filter file:

```
# Fail2Ban filter for WordPress
#
#

[Definition]

failregex = ^<HOST> - - \[.*\] "GET \/company\.php.*select count.* HTTP.*"$
```

The **failregex** line indicates the regular expression to use to check for invalid entries in the Nginx access log file. Entries that match the regular expression are banned.

After the filter and jail has been configured, we need to restart the Fail2Ban server using the command: **fail2ban-client stop** followed by **fail2ban-client start**. If the regular expression is working, then we should see some entries in the Fail2Ban log file which is: **/var/log/fail2ban.log**.

Since it can be difficult to develop and test a regular expression for a certain log entry, we can use the **fail2ban-regex** command for testing our regular expression.

The command takes two arguments. The first one is the log file entry. The second argument is the regular expression. The following example shows how to test that a regular expression correctly matches a given log entry. Note that the code should be entered on one line.

```
fail2ban-regex '162.144.34.147 - - [09/Sep/2019:10:02:55 +0000]
 "GET /company.php?id=1019999999999 or
 (select count(*)from(select 1 union select 2 union select 3)x
group by concat(mid((select vErsion()
  limit 0,1),1,0),floor(rand(0)*2))) -- x=x HTTP/1.1" 301 169 "-" "-" "-"'
'^<HOST> - - \[.*\] "GET \/company\.php.*select count.* HTTP.*"$'
```

### Conclusion
Fail2Ban is a very useful tool for preventing server intrusions over a network. It works by checking log files and banning IP addresses that produce invalid entries in the log file. It can also be used to secure network based custom services and applications.

The guide [Use Fail2ban to Secure Your Server](https://www.linode.com/docs/security/using-fail2ban-for-security/) was used as reference for writing this article. It is an excellent resource on how to install and configure Fail2Ban.
