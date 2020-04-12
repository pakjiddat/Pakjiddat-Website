---
title: Samba - An open source File Server and Active Directory Controller
date: "2016-11-03"
layout: post
draft: false
path: "/posts/samba---an-open-source-file-server-and-active-directory-controller"
category: "centralized user management"
tags:
  - "centralized user management"
  - "server management"
description: "Recently I had the task of setting up central user management for Windows servers. This blog post describes my experience with trying to setup central user management for Windows servers in an open source Linux based environment."
---

### Introduction
Recently I had the task of setting up central user management for Windows servers. This blog post describes my experience with trying to setup central user management for Windows servers in an open source Linux based environment.

My client is fond of free and open source tools, so I had to find a free and open source tool that provides central user management for Windows based servers. After some searching on the internet, I came across [Samba](http://www.samba.org/).

Samba is basically a file sharing server that can be used by all devices that support [SMB/CIFS](http://en.wikipedia.org/wiki/Server_Message_Block). These include Linux and Windows based servers. Version 4 of Samba, which was released in 2012 had a new feature that allowed it to function as an Active Directory Domain Controller.

This is a very useful feature as it allows Windows based hosts to authenticate against Linux based Samba Authentication Server. This opens up the possibility of cross platform user management, which is very useful in a heterogeneous I.T environment with different operating systems.

### Installation and configuration
Configuring Samba to work as an Active Directory Domain Controller is simple. Installing and configuring the Samba server and configuring a Windows server to authenticate against the Samba server takes less than 20 minutes.

Instructions on configuring Active Directory on Samba are given on the [Samba Wiki](https://wiki.samba.org/index.php/Joining_a_Windows_Client_to_a_Domain). [Instructions on connecting a Windows client to a Samba AD DC](https://wiki.samba.org/index.php/Joining_a_Windows_Client_to_a_Domain) are also given. Of course if you have specific requirements then you can read the articles on the [Samba Wiki](https://wiki.samba.org/index.php/User_Documentation) or read the Samba [mailing archives](https://lists.samba.org/). To install Samba and configure it as a Domain Controller follow these steps:

#### Install Samba
I used the samba package repository provided by SerNet. SerNet provides package repositories for the major Linux distributions. Create an account on [SAMBA+](https://samba.plus/). Then download and install the package repository and package signing key. Follow the given instructions.

Then install the Samba packages. For Centos enter the following command:

```
yum install -y sernet-samba sernet-samba-ad sernet-samba-client
```

Enter following commands to verify correct installation. **Samba -V** and **smbclient -V**. These commands return the version of Samba server and Samba client that was installed. Its best to install the latest version.

* #### Provisioning The Samba Active Directory
  This configures Active Directory Domain Controller. It also configures Kerberos on the server. Kerberos is a mechanism for encrypting authentication information. It is used by Active Directory Domain Controller to provide secure authentication to the domain clients. [The Kerberos website](http://web.mit.edu/kerberos/) has useful information on Kerberos configuration.

  To start the Samba AD DC provisioning enter the following command:

  ```
  samba-tool domain provision --use-rfc2307 --interactive
  ```

  You will then be asked about the following:

  * **Samba Realm** (Set this to a sub domain of your main domain. e.g WIN.EXAMPLE.COM)
  * **Domain** (Set this to the first part of your Samba Realm. e.g WIN)
  * **Server Role** (Set this to dc since we are trying to set up a domain controller)
  * **DNS Backend** (Set this to SAMBA_INTERNAL)
  * **DNS forwarder IP address** (Set this to NONE or the IP address of your DNS forwarder)
  * **Administrator password** (Set this to the admin password for your domain controller)

  If all goes well the command will end without errors. You can read more about the Provisioning command on ["Setup a Samba Active Directory Domain Controller"](https://wiki.samba.org/index.php/Samba_AD_DC_HOWTO#Provisioning_The_Samba_Active_Directory).

* #### Start samba.
  Setup a startup script for Samba. You can use the [Samba4/InitScript](https://wiki.samba.org/index.php/Managing_the_Samba_AD_DC_Service_Using_Systemd). Start Samba. e.g on Centos enter the command:

  ```
  systemctl start samba-ad-dc
  ```

* #### Test Samba Domain Controller
  Enter the command:

  ```
  smbclient -L localhost -U%
  ```

  It should return some information about your Samba configuration. Enter the command: 

  ```
  smbclient //localhost/netlogon -UAdministrator -c 'ls'
  ```

  This command will connect you to the netlogon share, using the Domain Administrator account, created during provisioning. If these commands fail then check the Samba AD DC [Troubleshooting guide](https://wiki.samba.org/index.php/Samba_AD_DC_Troubleshooting).

* #### Configure DNS configuration file
Add the IP address of your DNS server. This DNS server must have the correct DNS records created. Following DNS records need to be created for your DNS zone. Your DNS zone is same as the Realm name you gave during provisioning. Login to your DNS server and create the following records for your DNS zone:

* Create a record with the name _ldap._tcp and type SRV. use priority 0, weight 100, port 389 and the name of your Samba server.
* Create a record with the name _kerberos._udp and type SRV. use priority 0, weight 100, port 88 and the name of your Samba server.
* Create a record with the host name of your Samba server and type A. Use the ip address of your Samba server.
* Create a record with the name _ldap._tcp.dc._msdcs and type SRV. use priority 0, weight 100, port 389 and the name of your Samba server.

* #### Verify DNS configuration.
  Enter the following commands on your Samba server to verify correct working of the DNS. If you receive any errors, check your system log.

  * host -t SRV _ldap._tcp.WIN.EXAMPLE.COM.
  * host -t SRV _kerberos._udp.WIN.EXAMPLE.COM.
  * host -t A addc.WIN.EXAMPLE.COM.
  * host -t A WIN.EXAMPLE.COM.

* #### Kerberos Configuration.
Kerberos configuration can be quite complex. Thankfully the Provisioning tool takes care of the Kerberos configuration. During provisioning the file**/usr/local/samba/private/krb5.conf** is generated. Location of this file can vary depending on your system. Copy the file **krb5.conf** to **/etc/krb5.conf**. This is the main kerberos configuration file. You can read more about [configuring Kerberos](https://kb.iu.edu/d/aumh) on the Kerberos website.

* #### Testing Kerberos
Obtain a Kerberos ticket by using the kinit command. Enter following: **kinit administrator@WIN.EXAMPLE.COM**. You will then have to enter the administrator password that you gave during provisioning. To verify that the command worked enter the command: **klist**. It should return the Kerberos ticket that you just created.

* #### Time Synchronization
  Use NTP (Network time protocol) on your Samba server and Windows clients. This ensures that the time on the Server and Clients is synchronized. This is very important for correct working of Kerberos.

  Samba does not have a full fledged forum but instead uses a [mailing list](https://lists.samba.org/). You can ask a question by posting to a mailing list. I was interested to know if its possible to synchronize FreeIPA users with Samba AD DC users. I asked on their [general samba mailing list](https://lists.samba.org/archive/samba/) and also mentioned my experience with installing Samba.

### Conclusion
Samba is an excellent open source tool that offers the possibility of managing Linux and Windows users from a single tool. Samba is usually used as a file sharing server in enterprises and is a useful tool to learn.

### References:

* [Kerberos general information](https://help.ubuntu.com/community/Kerberos)
* [Kerberos keytab management](https://kb.iu.edu/d/aumh#list)
* [Kerberos server installation and basic configuration](http://www.thegeekstuff.com/2014/05/install-kerberos-server/)
* [Kerberos configuration related to Samba](https://help.ubuntu.com/community/Samba/Kerberos)
* [Samba Active Directory Domain Controller installation guide](https://wiki.samba.org/index.php/Samba_AD_DC_HOWTO)
