---
title: Monitoring RAM usage on server
date: "2017-02-10"
layout: post
draft: false
path: "/posts/monitoring-ram-usage-on-server"
tags:
  - "server management"
description: "The RAM on a server can be monitored using /proc/meminfo and awk commands. /proc/ is a special file system created by the Linux kernel which contains kernel related information such as CPU and memory usage. /proc/meminfo contains information about memory usage."
---

The RAM on a server can be monitored using **/proc/meminfo** and awk commands. **/proc/** is a special file system created by the Linux kernel which contains kernel related information such as CPU and memory usage. **/proc/meminfo** contains information about memory usage.

The following bash script can be used to extract memory usage information from **/proc/meminfo**. It uses the **awk** text processing command for parsing memory information. It uses **bc** command for performing floating point operations. The bash scripting language does not support arithmetic operations on floating point numbers so an external tool like **bc** is needed

```bash
# the total memory. the MemTotal row is extracted using awk. the second column of this row is then extracted and saved to total variable
total=$( awk '/MemTotal/ {print $2}' &lt; /proc/meminfo )
# the available memory. the MemAvailable row is extracted using awk. the second column of this row is then extracted and saved to available variable
available=$( awk '/MemAvailable/ {print $2}' &lt; /proc/meminfo )
# the formula for calculating percentage of available memory is piped to bc command. the output of bc command is saved to memory_available variable
memory_available=$(echo "($available*100/$total)" | bc)
# if the available memory is less than 30%
if [ "$memory_available" -lt "30" ];
then
    # the body of the alert email is saved to a temprary file
    echo "Hello Admin. The Memory usage on server is $memory_available%. Please check!" > /tmp/mail_body.txt
    # the mailx command is used to sent the email. it sends the email using gmail server.
    # this is useful on servers that have limited access to email servers such as Google Compute instance
    mailx -s "Memory usage on server is more than 70%. Please check!." -r "reply_email" -S smtp="smtp.gmail.com:587" -S    \<br/>smtp-use-starttls -S smtp-auth=login -S smtp-auth-user="gmail_address" -S smtp-auth-password="gmail_password" -S \<br/>ssl-verify=ignore recepiant_email &lt; /tmp/mail_body.txt
    # the temprary file is removed
    rm -rf /tmp/mail_body
fi
```
