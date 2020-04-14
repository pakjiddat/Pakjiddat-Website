---
title: FreeIPA - An open source centralized user management system
date: "2016-10-24"
layout: post
draft: false
path: "/posts/freeipa---an-open-source-centralized-user-management-system"
tags:
  - "centralized user management"
description: "This blog post is about FreeIPA, a very useful open source centralized user management solution from Red Hat. I had the opportunity of installing FreeIPA in a virtualized environment. I want to share my experience in this blog post."
---

### Introduction
This blog post is about [FreeIPA](http://www.freeipa.org/), a very useful open source centralized user management solution from Red Hat. I had the opportunity of installing FreeIPA in a virtualized environment. I want to share my experience in this blog post.

FreeIPA can be considered as the Linux equivalent of Active Directory. IPA stands for Identity, Policy and Audit. FreeIPA is actually a lot more than a centralized user management system. Along with user management it also provides integrated DNS, Certificate Authority and Access Control.

FreeIPA is a collection of the following open source tools: A Linux (Fedora), 389 Directory Server (LDAP), MIT Kerberos, NTP, DNS, Dogtag (Certificate System). It also supports Active Directory sync. FreeIPA uses LDAP for storing its data which includes DNS, host and user information.

### Why use FreeIPA

#### Centralized user management
Why would you want to use FreeIPA?. Well if you have hundreds of Linux based servers, for example in a virtualized environment, it would be really useful to manage users for all your servers from one place. FeeIPA lets you do that. FreeIPA provides a web interface and command line tools to manage users all from one place. Since FreeIPA uses LDAP for user management you can connect it to any LDAP client. Most open source tools support LDAP.

#### Quick and easy installation
Installation of FreeIPA has to be done once on the server and once for each client to be managed. Both client and server installations are easy and take less than 15 minutes. In less than 15 minutes you can have a centralized user management solution for free !. And it comes with a nice GUI as well !. Of course customizing and learning about FreeIPA will take some time. Red Hat has a useful guide titled ["Linux Domain Identity, Authentication, and Policy Guide"](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Linux_Domain_Identity_Authentication_and_Policy_Guide/index.html), that explains all aspects of FreeIPA including installation and administration.

### Installation and Configuring

#### Installing FreeIPA Server
Red Hat derived operating systems, e.g Centos and Fedora have FreeIPA in the default package repositories. Installing FreeIPA is as simple as entering the command :

```
yum install ipa-client
```

on Centos. The following command should be entered on Fedora

```
yum install freeipa-client
```

To install FreeIPA on other Linux systems you will have to install from source.

#### Configuring FreeIPA server
After installation the command:

```
ipa-server-install
```

has to be run. This starts the FreeIPA installer, which configures the FreeIPA. The configuration can be run interactively or silently by passing command line options. [Installing an IDM Server](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Linux_Domain_Identity_Authentication_and_Policy_Guide/installing-ipa.html), describes the complete configuration steps.

#### Installing FreeIPA client
To install the FreeIPA client on Centos you have to run:

```
yum install ipa-client
```

On Fedora run:

```
yum install freeipa-client
```

On other Linux operating systems you will have to follow the manual installation steps given in the Red Hat documentation.

#### Configuring FreeIPA client
After installation run the command:

```
ipa-client-install
```

to start the configuration. The client side of FreeIPA is based on SSSD Linux Daemon. SSSD is a caching daemon that sits between services such as Linux authentication service and the authentication storage. [SSSD](https://fedorahosted.org/sssd/) intercepts the request sent by the service and can return a cached response or it can send the request to another service such as a FreeIPA server. See [Setting up systems as IDM clients](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Linux_Domain_Identity_Authentication_and_Policy_Guide/setting-up-clients.html) for complete information on installing the FreeIPA client.

### Conclusion
Once the client installation is complete, you can manage all your users, DNS, hosts, certificates and more from the FreeIPA web interface. FreeIPA is a great tool that combines several well known Linux solutions into an integrated identity management platform. It is very easy to install and configure. You don't have to know the workings of the tools that are internally used by FreeIPA such as bind, open LDAP, DogTag. But learning about these tools will give you a better idea of how the FreeIPA works.
