---
title: Monitoring CPU and Memory usage on Linux
date: "2017-04-11"
layout: post
draft: false
path: "/posts/monitoring-cpu-and-memory-usage-on-linux"
category: "server management"
tags:
  - "server management"
description: "CPU and Memory monitoring is an important system administration task. It provides valuable information that can be used in resource planning and alert notifications."
---

### Introduction
CPU and Memory monitoring is an important system administration task. It provides valuable information that can be used in resource planning and alert notifications.

For example if CPU and Memory usage is consistently high then the system administrator may want to consider moving his system to a server with more resources. He may also want to get a notification by Email or SMS so he can take action before his system is damaged.

### Configuration
Linux based operating systems provide the virtual file system **/proc**. It contains information provided by the kernel, including information on CPU and RAM usage. The files **/proc/cpuinfo** and **/proc/meminfo** provide information on CPU and Memory respectively.

The contents of these files can be checked on a regular basis from a simple script. A notification email may be sent in case usage exceeds a given threshold.

### Monitoring CPU
CPU usage can also be monitored with the top command which is part of most Linux distributions. The following bash command returns the CPU usage:

```
cpu_usage=$(top -b -d1 -n1|grep -i "Cpu(s)"|head -c21|cut -d ' ' -f3|cut -d '%' -f1);
```

### Monitoring RAM
Memory usage can be extracted from the **/proc/meminfo** file using the following command:

```
# the total memory. the MemTotal row is extracted using awk. the second column of this row is then extracted and saved to total variable
total=$( awk '/MemTotal/ {print $2}' < /proc/meminfo )
# the available memory. the MemAvailable row is extracted using awk. the second column of this row is then extracted and saved to available variable
available=$( awk '/MemAvailable/ {print $2}' < /proc/meminfo )
# the formula for calculating percentage of available memory is piped to bc command. the output of bc command is saved to memory_available variable
memory_available=$(echo "($available*100/$total)" | bc)
```

CPU and Memory monitoring is very import on production servers. Some hosting providers like Google Cloud Platform (GCP) automatically shut down your server if the CPU and Memory usage appears suspicious.

Recently a server that I had been managing on GCP was suspended because of "suspicious activity". The only thing that I could think of that could have caused the problem was ClamAV anti virus. It runs once a day and scans the server files for viruses. It caused a spike in CPU usage.

GCP showed a high CPU warning for the instance on the Google Console page. I did not take the warning seriously and as a result the instance was suspended. We had to pay 100 USD to restore our instance. I set up a bash script for monitoring the CPU and RAM usage. It runs every 15 minutes as a cron job. The script reported high memory usage but I did not take the error seriously.

That proved to be a big mistake because GCP again suspended our instance and we had to pay 100 USD to restore it. This time I checked the server again and found out that the server was running LXC containers and each container was running its own instance of the ClamAV anti virus.

This was not needed since the main server that ran the containers was already running the ClamAV anti virus and it checks the container files for viruses. After I removed the anti virus from the containers, the Memory and CPU usage patterns because normal and so far we have not received a warning from GCP.

### Conclusion
CPU and Memory monitoring is an important system administration task that can prevent big problems for the system administrator. Although there are log monitoring tools and services such as GrayLog, Splunk and Google's Log Stack, I prefer to use monitoring scripts that I find more dependable.
