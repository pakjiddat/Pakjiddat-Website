---
title: Proxmox - An open source Virtualization Platform
date: "2016-08-25"
layout: post
draft: false
path: "/posts/proxmox---an-open-source-virtualization-platform"
category: "server virtualization"
tags:
  - "server virtualization"
description: "This blog post is about my experience with using Proxmox Virtualization Platform. Proxmox is an excellent open source virtualization platform from the German company Proxmox Server Solutions GmbH. It is used by tens of thousands of users."
---

### Introduction
This blog post is about my experience with using [Proxmox Virtualization Platform](http://proxmox.com/). Proxmox is an excellent open source virtualization platform from the German company Proxmox Server Solutions GmbH. It is used by tens of thousands of users.

### Proxmox Features

#### Centralized Web Interface
You have to first install Proxmox from an ISO file that you can download from the Proxmox website. Proxmox needs to be installed on each server that needs to run virtual machines. Proxmox allows you to manage all your virtual machines and hosts from a single web interface.

Proxmox is a very good option for building your own private cloud. Proxmox supports [KVM](http://www.linux-kvm.org/) and [OpenVZ](http://openvz.org/) virtual machines. The current Proxmox version which is 4.0 no longer supports OpenVZ virtual machines. Instead it supports LXC containers.

#### Support for KVM virtual machines
KVM virtual machines consume fixed CPU and Memory and can run any operating system that supports virtualization, including FreeBSD, Linux, Windows etc. KVM virtual machines can run network gateways, NAS servers, monitoring servers. Basically any server that can be installed from ISO.

You can have all your mail servers, DNS, database, NAS servers etc all running as virtual machines. Installing a server is as simple as uploading the server ISO file to your Proxmox server and following the installation instructions

#### Support for OpenVZ virtual machines
OpenVZ virtual machines are light weight containers that share the host servers hardware resources. They only support Linux operating system. The latest version of Proxmox no longer supports OpenVZ. Instead it supports a similar container technology called LXC which stands for Linux Containers.

#### Easy Administration
Unlike other cloud platforms such as AWS and OpenStack, Proxmox is very easy to use and requires no expert knowledge. Creating virtual machines is as simple as clicking a button and filling out a short form.

The Proxmox user interface is very simple and easy to use. It does have complex features such as distributed storage, user privileges and backups, but the complex features are well hidden. To see resource usage statistics such as CPU and Memory of a virtual machine, all you have to do is click on a virtual machine and then click on the summary tab.

Changing RAM and Memory is as simple as clicking on the hardware tab and editing text fields. You can also easily take backups of virtual machines. Proxmox has fine grained user permissions that allow you to configure the actions that users are allowed to take. For example, permissions to start and stop virtual machines.

### Conclusion
Proxmox is a very flexible and easy to use virtualization solution. It is an excellent option for hosting a private cloud. By simplifying server administration, Proxmox makes it easy to publish innovative services on the internet at low cost. Virtualization removes the need for large number of expensive servers in institutions and companies. It forms the backbone of cloud services.
