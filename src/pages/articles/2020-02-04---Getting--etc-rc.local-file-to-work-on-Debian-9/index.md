---
title: Getting /etc/rc.local file to work on Debian 9 (Stretch)
date: "2018-09-05"
layout: post
draft: false
path: "/posts/getting--etc-rc-local-file-to-work-on-debian-9--stretch-"
tags:
  - "server management"
description: "Debian Stretch uses the rc.local service for executing commands on system startup. To use this service we need to run the following commands:"
---

Debian Stretch uses the rc.local service for executing commands on system startup. To use this service we need to run the following commands:

* If the /etc/systemd/system/rc-local.service does not exist, then it should be created with following contents:

```
[Unit]
 Description=/etc/rc.local Compatibility
 ConditionPathExists=/etc/rc.local

[Service]
 Type=forking
 ExecStart=/etc/rc.local start
 TimeoutSec=0
 StandardOutput=tty
 RemainAfterExit=yes
 SysVStartPriority=99

[Install]
 WantedBy=multi-user.target
```

* Give executable permissions to the /etc/systemd/system/rc-local.service file
```bash
sudo chmod +x /etc/systemd/system/rc-local.service
```

* Gve executable permissions to the /etc/rc.local file
```bash
sudo chmod +x /etc/rc.local
```

* Enable the rc-local service to start on boot
```bash
sudo systemctl enable rc-local
```

* Start the rc-local service
```bash
sudo systemctl start rc-local.service
```

* Check the status of the rc-local service
```bash
sudo systemctl status rc-local.service
```

* If the rc.local file does not exit, then create it with the following contents:

```
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

exit 0
```

See the discussion [How to Enable /etc/rc.local with Systemd](https://www.linuxbabe.com/linux-server/how-to-enable-etcrc-local-with-systemd) for more information on getting /etc/rc.local to work on Debian 9
