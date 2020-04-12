---
title: Backing up and restoring LXD containers
date: "2018-05-01"
layout: post
draft: false
path: "/posts/backing-up-and-restoring-lxd-containers"
category: "server management"
tags:
  - "server management"
  - "command line tools"
description: "LXD containers can be backed up by creating snapshots or by creating an image from the container. The first method which is creating snapshots is useful for taking quick incremental backups of containers. However it does not provide a full backup. The second method allows creating full backup."
---

LXD containers can be backed up by creating snapshots or by creating an image from the container. The first method which is creating snapshots is useful for taking quick incremental backups of containers. However it does not provide a full backup. The second method allows creating full backup.

To take a full backup of a container we need to run the following commands:

```
// generates an image from the container
sudo lxc publish {container_name} --force --alias {image_name}
// saves the image as a file. the file can be copied to secondary storage such as usb
sudo lxc image export {image_name} .
```

To restore the backup, we need to first manually import the image using the following command:

```
sudo lxc image import {file} --alias {image-name}
```

Next we need to launch a container from the image using the command:

```
sudo lxc launch {image-name} {container-name}
```

See the article [How to properly backup+restore LXD containers with ZFS backend?](https://discuss.linuxcontainers.org/t/how-to-properly-backup-restore-lxd-containers-with-zfs-backend/417) for more information on how to backup and restore LXD container
