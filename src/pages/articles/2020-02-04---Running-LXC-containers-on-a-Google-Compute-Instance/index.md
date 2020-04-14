---
title: Running LXC containers on a Google Compute Instance
date: "2017-04-11"
layout: post
draft: false
path: "/posts/running-lxc-containers-on-a-google-compute-instance"
tags:
  - "server virtualization"
description: "Google Cloud Platform is a Google product that provides services related to Cloud Computing. Services provided by Google Cloud include Compute, Storage and Databases, Networking, Big Data, Machine Learning and more."
---

### Introduction
[Google Cloud Platform](https://cloud.google.com/) is a Google product that provides services related to Cloud Computing. Services provided by Google Cloud include Compute, Storage and Databases, Networking, Big Data, Machine Learning and more.

The Compute service includes Compute Engine, App Engine and Container Engine. Compute Engine allows management of virtual machines. App Engine is a powerful platform for building scalable web and mobile applications. Container Engine allows management of Docker Containers.

This article describes how to run multiple websites on Google Cloud using an approach that is based on LXC containers.

### Running multiple applications in the cloud
If you want to run several applications in the cloud, one option is to run the applications on a single Docker Container or a single Compute instance. But what if the applications are based on different platforms such as (Linux, Apache, MySQL, PHP) LAMP stack and (MongoDb, Express, AngularJs, NodeJs) MEAN stack. You may want to keep your LAMP and MEAN applications separate. One option is to run the applications on multiple compute instances.

If you have a small budget then this may not be possible. Another option is to run the applications within separate containers running on a single compute instance. LXC is a good choice for containers because it is present in the default package repository of most Linux distributions. It is also lightweight and consumes very little system resources.

### Configuring networking for LXC containers
The installation of Linux Containers (LXC) is straight forward and is described in [Installing LXC containers on Debian Jessie](/posts/installing-lxc-containers-on-debian-jessie). There are different options for configuring networking for LXC containers.

The approach I used is based on **libvirt** and is described in the [Debian Wiki article on LXC networking](https://wiki.debian.org/LXC/LibVirtDefaultNetwork). The libvirt network creates a bridge networking device on the main host. It also runs a DHCP server and a service called DNSMasq. The DNSMasq service provides DNS services to the containers. The containers run DHCP client services which are used to fetch the ip address from the DHCP server. The ebtables bridge firewall is also used. The main steps involved are as follows:

* **Installing Libvirt.** This can be done with the command **apt-get install libvirt-bin**
* **Configuring the default network**. This involves editing the default.xml configuration file for the default libvirt network. The file requires the start and end DHCP ip addresses of the LXC containers and the ip address of the bridge interface
* **Start the libvirt default network.**The libvirt default network is started using the command **virsh net-start default**. Use the **ifconfig -a** command to verify the existence of the bridge interface
* **Edit the container network configuration**. Edit the file: **/var/lib/lxc/a_container/config**, where a_container is the name of your container. It should have a networking section similar to the following:

```
# Network configuration
lxc.network.type = veth
lxc.network.flags = up
lxc.network.link = virbr0
lxc.network.hwaddr = 00:FF:AA:00:00:03
lxc.network.ipv4 = 0.0.0.0/24
```

* **Set the containers to auto start**. To auto start the containers each time the host server reboots, each container's configuration file should have following lines:

```
# Autostart
lxc.start.auto = 1
lxc.start.delay = 5
```

The line **lxc.start.delay** is used to start the container after a delay of 5 seconds. This is done so that there is an interval between the starting of containers. For some reason this did not work for me and all the containers did not start on boot, so I had to add following to **/etc/rc.local**:

```
lxc-start -n a_container -d
```

### Running multiple websites behind Nginx proxy server
It is possible to run multiple websites on different containers. These containers can run on a single host. The websites can be served by a single instance of Nginx running on the main host.

The Nginx web server acts as a reverse proxy server and serves content from the different websites running on the containers. To configure Nginx as a reverse proxy server for a website the following configuration file can be used:

```
server {
  listen 80;
  listen [::]:80;

  root /var/www/html;

  # Add index.php to the list if you are using PHP
  index index.html index.htm index.nginx-debian.html;
  server_name hostname-of-your-website;

  location / {
    proxy_set_header Host $host;
    proxy_pass http://private-ip-address-of-your-container$uri$is_args$args;
  }
}
```

The above configuration file should be created inside the **/etc/nginx/sites-available** folder. A symbolic link to the file should be added to **/etc/nginx/sites-enabled**.

### Conclusion
This article described an approach for running multiple websites on a single Google Compute Instance. It suggests running the websites on different containers and accessing the websites through a single instance of Nginx web server. This approach can easily be used on other Cloud Computing platforms such as Amazon Web Services (AWS) and Microsoft Azure.
