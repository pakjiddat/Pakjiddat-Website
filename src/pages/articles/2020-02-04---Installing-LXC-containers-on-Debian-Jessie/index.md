---
title: Installing LXC containers on Debian Jessie
date: "2017-04-11"
layout: post
draft: false
path: "/posts/installing-lxc-containers-on-debian-jessie"
tags:
  - "virtualization"
  - "software installation and configuration"
description: "Containers are light weight virtual machines that can be used to isolate processes. Containers implement operating system level virtualization. This means that all containers running on a host will share the kernel of the host operating system."
---

### Introduction
Containers are light weight virtual machines that can be used to isolate processes. Containers implement operating system level virtualization. This means that all containers running on a host will share the kernel of the host operating system.

The main difference between Containers and Hyper-Visors such as XEN and KVM is that the later implements hardware level virtualization. This means a host system running XEN or KVM can run virtual machines with different kernels.

The main container technologies in use today are Docker and LXC/LXD. LXD is a refinement of LXC and is based on LXC. Until recently OpenVZ was a popular choice for containers. It has now been replaced by containers based on CGroups.

CGroups is a new feature of the Linux kernel that allows process isolation. Both Docker and LXC are based on CGroups. Since the Linux kernel now has built in support for containers, old container technologies such as OpenVZ have been largely replaced by Docker and LXC.

### Installation
The installation of LXC on Debian Jessie is very simple and only requires the command: **apt-get install lxc**. The [LXC home page](https://linuxcontainers.org/lxc/getting-started/) has useful information on how to get started with LXC

### Creating new containers
To create a new LXC container, we have to run the command: **lxc-create -t download -n your-container-name**. This will display a list of options for the operating system. Once you have selected your operating system, the template for your selected operating system will be downloaded and the new container will be created.

### Using containers
Here are some commands for using containers:

* To start your container, you have to run the command: **lxc-start -n your-container-name -d**.
* The command **lxc-info -n your-container-name** displays information about the new LXC container.
* To enter the container shell you have to use the command: **lxc-attach -n your-container-name**.
* To stop your container enter: **lxc-attach -n your-container-name**.
* To destroy your container enter: **lxc-destroy -n your-container-name**.


### Setting up networking
The [Debian Wiki LXC page](https://wiki.debian.org/LXC) covers the basics of LXC container management including setting up networking and mounting external folder shares. According to the Wiki, there are three main options for configuring networking on LXC. Using a simple Bridge, Vlan networking and setting up a network based on LibVirt.

### Conclusion
LXC containers are very easy to use. They allow easily testing new software without interfering with the main host. They are also light weight and do not take lot of server resources. LXC containers can be used to logically sub divide your computing work into groups. I use LXC containers for my website development work and find them very useful.
