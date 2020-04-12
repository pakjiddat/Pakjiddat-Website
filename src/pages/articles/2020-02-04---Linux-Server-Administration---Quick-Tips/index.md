---
title: Linux Server Administration - Quick Tips
date: "2019-04-03"
layout: post
draft: false
path: "/posts/linux-server-administration---quick-tips"
category: "quick tips"
tags:
  - "quick tips"
  - "server management"
description: "Following are some quick tips related to Linux Server Administration:"
---

Following are some quick tips related to Linux Server Administration:

#### [Recover deleted files on ext3/ext4 file system using Photorec](http://www.cyberciti.biz/tips/linux-ext3-ext4-deleted-files-recovery-howto.html)
Photorec is part of testdisk package. To install testdisk package on Debian use **apt-get install testdisk**. To run photorec enter the command photorec.

#### [Force grub2 to not use UUID](http://askubuntu.com/questions/257425/can-i-force-grub2-update-not-to-use-uui)
When restoring backup of virtual machine, the backup process may create a new disk with a new UUID. In such cases it may be useful to update grub2 so it uses the disk physical path instead of the disk UUID.

The server may not reboot if the UUID of the new disk is different from the UUID of the old disk. One possible solution is to ensure that /etc/fstab file uses physical paths instead of UUID. Another solution is to update grub configuration so it uses physical device paths e.g /dev/xvda1 instead of UUID of disk.

#### [How to Backup and Restore LXC containers](http://stackoverflow.com/questions/23427129/how-do-i-backup-move-lxc-containers)
It describes how to backup and restore LXC containers. One option for backing up a LXC container is to create a tar acrhive using the commands:

```
lxc-stop -n ContainerName;
cd /var/lib/lxc/ContainerName/
tar --numeric-owner -czvf container_fs.tar.gz ./*
```

The backup of the container may be restored using the command:

```
rsync -avh container_fs.tar.gz user@server_name:/var/lib/lxc/
tar --numeric-owner -xzvf container_fs.tar.gz ./*
```

#### [Installing memcached for Php 7](http://php.net/manual/en/book.memcached.php)
Memcached is an extension for Php that allows accessing the Memcached daemon from Php. A similar extension called Memcache is also available but it is out dated and does not support Php 7.

To install Memcached for Php 7 we need to first fetch the source code from GitHub by cloning the php7 branch. Then we need to compile it from source using the following commands:

```
git clone -b php7 https://github.com/php-memcached-dev/php-memcached.git
phpize
./configure
make
make install
```

**NOTE:**. The Php memcached extension has now been updated to support Php 7.x. To install the Php memcached extension the following command can be used: **pear install memcached**.

#### [Sending email through Gmail server using mailx command](https://support.google.com/accounts/answer/6010255?hl=en)
[Mailx](https://linux.die.net/man/1/mailx) command can be used to send email through the gmail smtp server. For example the following command can be used:

```
mailx -s "Memory usage on server is more than 70%. Please check!." -r "reply_email" -S smtp="smtp.gmail.com:587" -S  \
smtp-use-starttls -S smtp-auth=login -S smtp-auth-user="gmail_address" -S smtp-auth-password="gmail_password" -S \
ssl-verify=ignore recepiant_email &lt; /tmp/mail_body.txt
```

In the above command the "gmail_address" needs to allow access from insecure devices. This [article](https://support.google.com/accounts/answer/6010255?hl=en) explains how to do this.

#### [List users currently logged in](https://www.cyberciti.biz/faq/unix-linux-list-current-logged-in-users/)
To list the currently logged in users, we can use the command: **users**.

#### [Upgrading Rocket Chat to latest version](https://rocket.chat/docs/installation/manual-installation/ubuntu#update)
To upgrade Rocket Chat to the latest version we need to first download the latest version of Rocket Chat using the command:

```
curl -L https://rocket.chat/releases/latest/download -o rocket.chat.tgz
```

After that we need to unzip the file. Then we need to remove the content of the current Rocket Chat folder with the contents of the unzipped file. After that we need to change directory to programs/server and run: **npm install**. If the command fails then we may need to install the node-pre-gyp package using the command: **npm install node-pre-gyp**. After that run the previous command. This should upgrade the Rocket Chat to the latest version.

#### [Problem with copying large files to USB](https://askubuntu.com/questions/348888/how-do-i-solve-error-splicing-files/610357#610357)
If you are trying to copy a large file to a disk that has been formatted with the FAT32 file system or similar, then you might get the error: **"Error splicing file: File too large"**. The error can be corrected by formatting the disk with the ext4 file system.

#### [Migrating Trello issues to Redmine](https://github.com/inequation/trello2redmine)
We can use this script to migrate Trello issues to Redmine: [https://github.com/inequation/trello2redmine](https://github.com/inequation/trello2redmine)
To use the script, we first need to configure it with the Redmine url, project id, default user and a few other parameters. We can run the script with the command:

```
python trello2redmine.py -c
```

#### [Checking Email server for problems](http://mxtoolbox.com/diagnostic.aspx)
The MxToolBox is an online tool that allows checking Email server for problems such as missing PTR records, open relays etc. Its a useful tool for troubleshooting network related problems.

#### [Debugging programs on Linux using strace](https://en.wikipedia.org/wiki/Strace)
Strace is a system tool that is used to debug programs on Linux based operating systems. It uses a feature of the Linux kernel known as ptrace.

Strace as its name suggests is used to trace operating system calls. It can be used to find out if a program is getting stuck because of a missing file or because of shared memory problems. For example it can show the id of the semaphore that is causing the program to fail. This semaphore can then be removed using the ipcrm command. The ipcrm command allows removing System V inter-process communication (IPC) objects and associated data structures from the system.

#### [Increasing number of concurrent connections for Proftp](http://www.proftpd.org/docs/howto/BCP.html)
To set the number of concurrent connections for Proftp, we need to set the following configuration directives in the Proftp configuration file: **MaxInstances, MaxClients, MaxClientsPerHost, MaxClientsPerUser, MaxHostsPerUser**. These directive are set when Proftp is running in standalone mode.

If Proftp is running in inet mode, then **per_source** and **cps attributes** need to be set in the xinetd configuration file.

#### [Using PSCP command for copying files and directories](https://serverfault.com/questions/295565/pscp-upload-an-entire-folder-windows-to-linux)
PSCP is a command that allows uploading files and folders to a remote server. Its benefit is that it does not require rsync to be installed on the remote server. The PSCP command can be used for copying data to a shared hosting platform which does not support rsync and does not provide shell access. It can also be used to transfer data between Windows and Linux servers.

The following command can be used to recursively copy a folder to a remote destination:

```
pscp -r {source_folder} {user_name}@{remote_server}:{remote_folder_path}
```

#### [Finding name server records for domains using Dig](https://stackoverflow.com/questions/38021/how-do-i-find-the-authoritative-name-server-for-a-domain-name)
**Dig** is a useful command line tool which allows retrieving DNS records for a domain.

[Authoritative name servers](https://en.wikipedia.org/wiki/Name_server) are servers that provide DNS information about a domain. An Authoritative name server may be a primary or secondary name server. A primary name server contains definitive and reliable information about a domain. A secondary name server is a slave name server which contains replica of dns records on a primary name server.

To fetch the list of name server records for a domain we can use the command: **dig NS {domain_name}**. If we add the +short flag, then a summary of the information is returned. Other types of DNS records may be fetched similarly.

#### [Plesk Repair Utility](https://docs.plesk.com/en-US/onyx/administrator-guide/plesk-administration/plesk-repair-utility.74649/)
The Plesk repair command is used to automatically diagnose and resolve issues with Plesk. To use the command, login to your Plesk server over SSH and enter the command: **plesk repair ASPECT [OPTION]**. **ASPECT** indicates the service to repair while **OPTION** indicates how the repair should be performed.

**ASPECT** can have several values such as web, mysql, mail, all etc.
**OPTION** can have the values: **Interactive mode**, **Diagnostic mode** or **Repair mode**. The default option which is **Interactive mode**, prompts the user to take action when an issue is found. In **Diagnostic mode**, the issue is indicated but no action is taken. In **Repair mode**, the issue is automatically resolved.

#### [Checking hard disk for bad blocks](https://www.tecmint.com/check-linux-hard-disk-bad-sectors-bad-blocks/)
A hard disk bad block is a section of the hard disk that cannot be read from or written to. To detect bad blocks we can use the badblocks command. For example to scan the hard drive **/dev/sda** for bad blocks, we can run the command: **badblocks -v /dev/sda**.

#### [Listing files and directories sorted by size](https://www.tecmint.com/find-top-large-directories-and-files-sizes-in-linux/)
To find out which files and directories under a given directory are taking up the most space, the following command can be used:

```
du -a /home | sort -n -r | head -n 5
```
