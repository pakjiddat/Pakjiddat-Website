---
title: Securing Linux servers with SeLinux, ClamAV, SpamAssassin and RkHunter
date: "2018-01-28"
layout: post
draft: false
path: "/posts/securing-linux-servers-with-selinux--clamav--spamassassin-and-rkhunter"
tags:
  - "server management"
  - "server security"
description: "Securing your servers is a very important task that can save your organization a lot of problems. Recently there have been a lot of cases where insecure servers belonging to high profile organizations have been exploited and used for nefarious purpose. It is therefore important to secure your servers."
---

### Introduction
Securing your servers is a very important task that can save your organization a lot of problems. Recently there have been a lot of cases where insecure servers belonging to high profile organizations have been exploited and used for nefarious purpose. It is therefore important to secure your servers.

Recently I had the opportunity of securing Linux based servers using the tools [SELinux](https://en.wikipedia.org/wiki/Security-Enhanced_Linux), [ClamAV](https://en.wikipedia.org/wiki/Clam_AntiVirus), [SpamAssassin ](https://en.wikipedia.org/wiki/SpamAssassin)and [RkHunter](https://en.wikipedia.org/wiki/Rkhunter).

### Securing your Linux servers using SELinux
[SELinux](https://en.wikipedia.org/wiki/Security-Enhanced_Linux") is a mandatory access control system for operating systems based on the Linux Kernel. It is implemented as a Linux kernel security module.

#### Mandatory access control vs Discretionary access control
Mandatory access control implies the system administrator enforces access control for resources. This is in contrast to Discretionary access control, where the access control is enforced by the owner of the resource.

Discretionary access control is the default in Linux. It involves assigning permissions on files using the commands **chmod** and **chown**. SELinux is applied after the normal discretionary access control. If access to a resource is denied by discretionary access control system, then SELinux is not even consulted.

#### Similarity with AppArmor
SELinux is similar to AppArmor, which is used by SuSe and Ubuntu operating systems. AppArmor is also implemented as a Linux kernel security module and provides mandatory access control but the main difference with SELinux is that it works with file system paths whereas SELinux works with Inodes.

SELinux uses extended attributes of file systems so it does not work on file systems that do not support extended attributes such as file systems mounted over NFS. Most users find SeLinux more difficult to administer. However SELinux offers more fine grained control and is included by default in the [Linux Mainline Kernel](https://en.wikipedia.org/wiki/Linux_kernel#MAINLINE).

#### SELinux Contexts
The term SELinux context is often referred to as SELinux label. The [Gentoo Wiki has excellent information about SELinux](https://wiki.gentoo.org/wiki/SELinux). According to the wiki, SELinux uses contexts to identify resources. A context has 3 and sometimes 4 parts. These parts are:

* ** SELinux user**
* **SELinux role**
* **SELinux type**
* **SELinux sensitivity**

The SELinux user and role is usually same for different uses and processes. In most cases the SELinux type differentiates the security context. It is sometimes referred to as the SELinux context. The SELinux sensitivity is also called Multi-level security. It provides classification of data. e.g strictly confidential data, confidential data, internal data and public data.

An example of a SELinux context is: **user_u:user_r:user_t:s0**. Contexts are applied to all system resources including sockets, ports, files and directories.

SELinux also adds a new option usually a -Z switch to resource monitoring tools such as **ls, id, ps and stat**. For example to view the SELinux context of the current user, use the command **id -Z. **To view the SELinux context of files use the command: **ls -Z file_name**.

The SELinux security system checks all resource access against a policy. If the policy disallows the access, then the access is denied and a message is logged to a file such as **/var/log/audit.log**.

#### Activating SELinux
SELinux is activated by default. To check if its activated use the command **getenforce**. To enable SELinux temporarily use the command **setenforce 1**. To permanently enable/disable SELinux edit the file **/etc/selinux/config**.

Many system administrators choose to disable SELinux because it causes problems with certain applications. I think this is a big mistake, because SELinux is not designed to block applications but to secure them. A basic understanding of SELinux can easily help to troubleshoot these problems.

#### Changing SELinux Context
The most common system administration task for SELinux is to allow a process access to a file or directory. e.g Apache web server has access to only files and directories with a certain SELinux context. If you want to allow Apache access to other files or directories then you need to update the SELinux context of those files and directories.

To update the SELinux context of a file or directory temporarily we can use the following command:

```bash
chcon -t net_conf_t /etc/puppet-resolv.conf
```

This command sets the context of the file **puppet-resolv.conf** to **net_conf_t**.

To make the change permanent we need to update the SELinux user space definition list and then relabel the files. We can update the user space definition list with the command:

```bash
semanage fcontext -a -t net_conf_t "/etc/puppet-resolv\.conf"
```

To relabel the list we use the command:

```bash
restorecon -R /etc/puppet-resolv.conf /usr/lib/portage/bin
```

This will permanently change the SELinux context of the file. Errors caused by SELinux can be seen in the file **/var/log/audit.log**.

The [Centos Wiki](http://wiki.centos.org/HowTos/SELinux) also has some useful information on SELinux. According to the wiki we can use the **setroubleshoot** package for troubleshooting SELinux related issues. This package provides the **sealert** command which gives a user friendly version of the contents of the **audit.log file**.

### ClamAV
[ClamAV](https://en.wikipedia.org/wiki/Clam_AntiVirus) is a well known anti virus program that is available for several operating systems including Windows, Linux, BSD, AIX and Solaris. ClamAV contains the following components: command-line scanner, automatic database updater and a scalable multi-threaded server.

ClamAV also contains a [Milter interface](https://en.wikipedia.org/wiki/Milter) that allows applications that support the Milter extension such as Postfix and Sendmail to use the ClamAV for checking for viruses.

The ClamAV website has complete information on [installing ClamAV](http://www.clamav.net/doc/install.html). There are many on-line tutorials that describe how to use ClamAV. For example "[Automate ClamAV to Perform Daily System Scan and Send Email Notifications on Linux](https://www.lisenet.com/2014/automate-clamav-to-perform-daily-system-scan-and-send-email-notifications-on-linux/)" and "[How to Install ClamAV and Configure Daily Scanning on CentOS](https://www.centosblog.com/how-to-install-clamav-and-configure-daily-scanning-on-centos/)".

### Rootkit Hunter
[Rootkit Hunter](http://rkhunter.sourceforge.net/) or Rkhunter is a well known tool that scans for rootkits, backdoors and possible local exploits. It does this by comparing file signatures of well known files with signatures in an on-line database. If the signatures do not match then the Rkhunter reports an error.

Rkhunter installation is simple and is well documented on [Installation Rootkit Hunter (rkhunter) on CentOS 5 and 6](http://www.woktron.com/secure/knowledgebase/79/Installation-Rootkit-Hunter-rkhunter-on-CentOS-5-and-6.html).

### SpamAssassin
[SpamAssassin](https://en.wikipedia.org/wiki/SpamAssassin) is a well known spam filtering program that can be run on different operating systems including Linux and Windows and is compatible with most email servers. SpamAssassin can be run as a standalone server or integrated with email servers.

The SpamAssassin wiki has a useful [guide for installing SpamAssassin](http://wiki.apache.org/spamassassin/SingleUserUnixInstall). Installation of SpamAssassin is simple. On Centos it can be installed with the command **yum install spamassassin.**.

#### Integrating SpamAssassin with Postfix
To integrate SpamAssassin with Postfix we need to first edit the file **/etc/mail/spamassassin/local.cf** and configure the score for spam messages, the text to append to the email subject, whether to move the email to the inbox or delete the email and the spam score for all email that is sent out by SpamAssassin.

After editing the configuration file, we need to add a system user for SpamAssassin and then configure Postfix so it uses SpamAssassin. After that we need to run a cron job that updates the SpamAssassin rules and reloads SpamAssassin.

Installation of SpamAssassin and integration with Postfix is described on [Integrating SpamAssassin into Postfix using spamd](http://wiki.apache.org/spamassassin/IntegratedSpamdInPostfix), [Integrating SpamAssassin into Postfix using spampd](http://wiki.apache.org/spamassassin/IntegratePostfixViaSpampd) and [SpamAssassin Integration with Postfix, using Amavis](http://wiki.apache.org/spamassassin/IntegratedInPostfixWithAmavis).

Integration with other Mail Transfer Agents is described on [Integrated into several varieties of MTA](http://wiki.apache.org/spamassassin/IntegratedInMta). The article [Installing and configuring Spamassassin on CentOS](http://www.rackspace.com/knowledge_center/article/installing-and-configuring-spamassassin-on-centos) contains useful information on how to configure SpamAssassin with Postfix.

### Conclusion
Securing your server is a very important task that should always be considered during server administration. A secure server can save you and your organization lots of problems.
