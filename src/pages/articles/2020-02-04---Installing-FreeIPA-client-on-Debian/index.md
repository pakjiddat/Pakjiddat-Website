---
title: Installing FreeIPA client on Debian
date: "2016-08-25"
layout: post
draft: false
path: "/posts/installing-freeipa-client-on-debian"
category: "centralized user management"
tags:
  - "centralized user management"
description: "Recently I had the opportunity of installing FreeIPA client on servers running the Debian operating system. I will share my experience in this blog post. FreeIPA is an excellent centralized user management system from FreeIPA."
---

### Introduction
Recently I had the opportunity of installing FreeIPA client on servers running the Debian operating system. I will share my experience in this blog post. FreeIPA is an excellent centralized user management system from [FreeIPA](http://www.freeipa.org).

It is free and open source. FreeIPA has lot of features other than user management such as DNS, Certificate management, Encrypted Authentication and more. In my earlier blog post titled [FreeIPA - An open source centralized user management system](/posts/freeipa---an-open-source-centralized-user-management-system), I have described the installation and configuration of FreeIPA server

### Installing FreeIPA Client
FreeIPA server and client are very easy to install on Centos and Fedora. [Configuring a Linux system as an IDM Client](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html/identity_management_guide/installing_the_ipa_client_on_linux), is a useful guide from RedHat on installing FreeIPA clients on RedHat based systems.

Installing FreeIPA on other operating systems is a lot more difficult. Even though RedHat provides a guide titled [Manually configuring a Linux client](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/5/html/configuring_identity_management/linux-manual), I was not able to get it to work on Debian. [The HowTo guides](http://www.freeipa.org/page/HowTos) on the FreeIPA wiki describes the process of installing FreeIPA on non Red Hat based operating systems and integration with different applications. However these guides were not useful.

Ubuntu provides [FreeIPA server and client packages on Launchpad](https://launchpad.net/freeipa). Ubuntu is based on Debian, but is not Debian so I went on searching for a solution for Debian. I came across a thread titled "freeipa-client on Debian Wheezy" on the Ubuntu FreeIPA mailing list. It was posted by one of the contributors of the Ubuntu FreeIPA project. He created a package for Debian and provided a repository for easy installation.

Here is how to install FreeIPA client on Debian.

```
# First add the following 2 lines to /etc/apt/sources.list file:
deb http://apt.numeezy.fr wheezy main
deb-src http://apt.numeezy.fr wheezy main

# Then install the package signature verification key using:
wget -qO - http://apt.numeezy.fr/numeezy.asc | apt-key add -

# Update your package lists:
apt-get update

# Set your server host name to a fully qualified domain name. e.g server.domain.com
hostname server.domain.com
vi /etc/hostname
# Install FreeIPA client
apt-get install -y freeipa-client

# Create folder for storing certificate database
mkdir -p /etc/pki/nssdb

# Create empty database for storing certificates
certutil -N -d /etc/pki/nssdb

# Create folder
mkdir -p /var/run/ipa

# Remove existing FreeIPA client configuration
rm -f /etc/ipa/default.conf

# Run the script for installing FreeIPA client
ipa-client-install --no-ntp --no-dns-sshfp --mkhomedir

# Enable auto creation of LDAP user folders
echo 'session required pam_mkhomedir.so' >> /etc/pam.d/common-session

# Add following lines to /etc/nsswitch.conf file or update existing lines
passwd: files sss
group: files sss
shadow: files sss
# Reboot you server
reboot
```

### Conclusion
After that you should be able to login to your server as a LDAP user. The user needs to be created on your FreeIPA server. I was able to get FreeIPA client working on Debian running Proxmox. In case you run into problems you an check out the [bug list on Ubuntu FreeIPA forums](https://bugs.launchpad.net/ubuntu/+source/freeipa/+bug/1280215)
