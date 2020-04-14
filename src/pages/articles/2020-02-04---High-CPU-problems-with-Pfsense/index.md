---
title: High CPU problems with Pfsense
date: "2017-11-14"
layout: post
draft: false
path: "/posts/high-cpu-problems-with-pfsense"
tags:
  - "software installation and configuration"
description: "Recently our Pfsense gateway server was consuming too much CPU. Especially during high network activity. This blog post describes my experience with trying to optimize Pfsense."
---

### Introduction
Recently our Pfsense gateway server was consuming too much CPU. Especially during high network activity. This blog post describes my experience with trying to optimize Pfsense.

Pfsense is a network gateway system. High load on the network gateway can result in all sorts of issues for the client user. e.g slow download speed, problems with VPN connectivity, slow remote desktop connections etc. Hence tuning the network gateway for performance is very important.

Pfsense is based on the FreeBSD operating system, which is similar to Linux. Pfsense has an excellent support forum with thousands of topics related to Pfsense. The support community is large and helpful and you are likely to receive a reply within hours.

### High CPU problem
All the posts related to High CPU use in Pfsense mentioned following factors. Ipv6 traffic, Device polling and Tuning kernel parameters.

I read that tuning kernel parameters is a bad idea unless you are using Pfsense for a very specific purpose. I followed the topic ["Something is causing High CPU load"](https://forum.pfsense.org/index.php?topic=77493.msg422407#msg422407) on the Pfsense forums and blocked IPV6 traffic from the System->Advanced->Networking->Allow IPv6 option. That did not lower the CPU usage.

I then read the articles ["FreeBSD Set Network Polling To Boost Performance"](http://www.cyberciti.biz/faq/freebsd-device-polling-network-polling-tutorial/) and ["Polling and FreeBSD"](https://blog.pfsense.org/?p=115). The articles suggested that on FreeBSD systems with heavy hardware utilization, disabling device polling can reduce CPU usage.

The reason was that normally hardware devices interrupt the CPU each time they have data that needs to be processed. This interruption of the CPU creates an overhead which increases with the number of interrupts.

So if the network traffic is high then the network card will interrupt the CPU and will cause high CPU usage.

### Solution: Enable device polling and Virtio drivers

#### Device Polling
The solution is to enable device polling which disables CPU interrupts. With device polling, the hardware device, e.g network card is polled by the CPU at regular intervals. This reduces the CPU overhead. Enabling device polling is very simple in Pfsense. You just have to disable the "Disable device polling" option under System->Advanced->Networking. This actually helped us a lot. The CPU usage went down from 80% to 40% and the load went down from 4.0 to 3.0.

#### Virtio Drivers
This was still a bit high. Our Pfsense server was running as a virtual machine under Proxmox virtualization platform. Proxmox supports virtio drivers for hard disks and network cards. Virtio drivers allow virtual machines to access the host servers hardware directly and provide performance close to that of physical hardware.

Unfortunately Pfsense does not support Virtio drivers by default. The Pfsense wiki article, ["VirtIO Driver Support"](https://doc.pfsense.org/index.php/VirtIO_Driver_Support), has a useful guide on enabling support for Virtio drivers. We replaced all the virtual network cards with VirtIO based network cards on our Pfsense virtual machine. We then loaded the FreeBSD VirtIO kernel modules as described in the wiki. After enabling support for VirtIO network drivers, the CPU usage became normal and we also got a good increase in network performance.

The instructions for enabling VirtIO drivers are very simple. You have to first load the VirtIO kernel modules by editing the **/boot/loader.conf.local** file. Then you have to disable **TCP offload** features from the Pfsense gui. You can do this by selecting the checkbox options related to TCP offloading.


#### TCP Offloading
[TCP Offloading](https://en.wikipedia.org/wiki/TCP_offload_engine) is a feature provided by some operating systems that transfer TCP/IP processing to the network interface card. Its especially useful on Gigabit and Multigigabit network interface cards.

Transferring TCP/IP processing has the obvious advantage of speeding up network traffic. But it does have its disadvantages. For e.g network cards do not have advanced resource scheduling capabilities and security mechanisms of operating systems.

TCP Offloading is supported by Windows and FreeBSD operating systems. Linux kernel does not support TCP Offloading out of the box and requires special support.

Pfsense allows offloading certain TCP/IP stack functions such as **checksum calculations** and **TCP segmentation**. These functions have to be disabled in order to get the VirtIO drivers to work under Pfsense. Hopefully future releases of Pfsense will have built in support for virtio network cards with support for TCP offloading.

### Conclusion
What actually helped us the most was enabling support for VirtIO network cards. For now our Pfsense server is working well and stable. Tuning your important servers such as Network Gateways is important and can lead to many long term benefits.
