---
title: Resizing Linux root partitions without unmount on Google Cloud
date: "2017-11-23"
template: post
draft: false
slug: "/posts/resizing-linux-root-partitions-without-unmount-on-google-cloud"
category: "server management"
tags:
  - "server management"
description: "Virtual machines often run out of disk space and require resizing. Resizing root partitions without unmounting is always risky. It is recommended to take a backup of the partition's useful data before resizing the partition."
---

Virtual machines often run out of disk space and require resizing. Resizing root partitions without unmounting is always risky. It is recommended to take a backup of the partition's useful data before resizing the partition.

To resize the root partition we need to first increase the disk size in the virtual machine configuration. Next we need to enter the command:

```bash
sudo fdisk /dev/{root_partition_name}
```

This will open the root partition in the fdisk program.

The next step is to print the partition table using the command '**p**'. Note the starting block number of the root partition. Next we need to delete the root partition using the command '**d**'. Next we need to create the root partition using the command '**n**'. We will need to enter the starting block number that we noted earlier. The size of the new partition should be set to the new size. Next we need to write the partition table using the '**w**' command. After that we need to reboot the virtual machine.

See the article [How to resize ext4 root partition live without umount on Linux](https://linuxconfig.org/how-to-resize-ext4-root-partition-live-without-umount) for more information on how to resize Linux root partitions without unmount on Google Cloud
