---
title: Bad performance of virtio network drivers on Proxmox
date: "2018-05-20"
layout: post
draft: false
path: "/posts/bad-performance-of-virtio-network-drivers-on-proxmox"
tags:
  - "server virtualization"
description: "This blog post is about my experience with trying to optimize network performance on a virtual machine managed by the Proxmox virtualization platform."
---

### Introduction
This blog post is about my experience with trying to optimize network performance on a virtual machine managed by the [Proxmox virtualization platform](https://www.proxmox.com/). I described my experience with using Proxmox in an earlier article titled [Proxmox - An open source Virtualization Platform](/posts/proxmox---an-open-source-virtualization-platform).

The conclusion of the article was that Proxmox is an excellent virtualization platform which supports LXC, OpenVZ and KVM virtual machines. It can be used to host a cloud platform delivering all kinds of services. Proxmox has an excellent user interface that allows managing virtual machines. Proxmox is very easy to install and administer. It also has an excellent support forum where you can get help on Proxmox related issues.

### Problems with accessing websites
The issue was that I had installed a database management script called [PhpMyAdmin](http://www.phpmyadmin.net/) on a Proxmox KVM virtual machine. I was not able to access the script from a web browser. Finding the cause of the issue took me several days!.

#### Possible issues
I had to consider a lot of issues. SELinux, Apache web server configuration, Gateway NAT configuration and TCP MTU settings on all the network devices. I even tested the bandwidth on the virtual machine. All those factors could have caused the issue. The most obvious cause of the issue seemed to be TCP MTU settings on a network device.

#### Problems with MTU
We had updated MTU settings on some of our servers with the hope of improving network performance. TCP MTU is the maximum size of data that can be transmitted in a single TCP/IP packet. TCP MTU is a very basic network parameter that should not be changed unless you know what you are doing. I thought that had to be the cause of the issue. I reset the MTU to default value on all the network servers, virtual machines, switch and gateway. But that did not help !. I was still getting a blank page when trying to access PhpMyAdmin from a browser.

The page would take time to load and would end up blank. I ran [Wireshark](https://www.wireshark.org/) on my local computer and checked the network packets. Some of the packets were being re-transmitted so there seemed to be a problem in the network. I then tested the bandwidth on the virtual machine using [Iperf](https://iperf.fr/) network performance testing tool. Iperf showed bandwidth of only 3Kbps!.

#### Solution: Problems with Virtio Network Interface Card
I then decided to try my luck with changing the network interface card type from Virtio to E1000. E1000 is a stable Intel network driver. Virtio gives the virtual machine access to the local host hardware and is supposed to be much faster then E1000. In this case it proved to be the opposite. As soon as I replaced the Virtio network card with E1000 the bandwidth on the virtual machine jumped up to 5Mbps !. And guess what the PhpMyAdmin started working !.

### Conclusion
Changing the MTU on a network can make it difficult to troubleshoot network related problems. Its best to keep the MTU at its default value. Virtio network drivers usually have excellent performance. We were using VLANs with our virtual machine so that could have been a factor. I could not find the issue mentioned on the Proxmox forums so I reported it on [Proxmox Bug tracking system](https://bugzilla.proxmox.com/show_bug.cgi?id=583). Its a good idea to contribute to the open source community, especially if you are a big user of open source software.

If you are interested in website monitoring applications, then checkout the [Free Website Monitor App](https://play.google.com/store/apps/details?id=com.freewebsitemonitor). It allows you to monitor the status of your websites from your phone.
