---
title: Linux Server Security - Quick Tips
date: "2019-04-16"
template: post
draft: false
slug: "/posts/linux-server-security---quick-tips"
category: "server management"
tags:
  - "server management"
  - "cyber security"
description: "Following are some quick tips related to Linux Server Security:"
---

Following are some quick tips related to Linux Server Security:

#### [Whitelisting devices and files for Rootkit Hunter](https://mmcgrath.fedorapeople.org/rkhunter.conf)
Some programs like postgresql create virtual memory devices under /dev/. Rootkit Hunter may raise warnings for these devices. To whitelist a device under dev the ALLOWDEVFILE directive can be used. This value of this directive is a single device path. Wildcard (*) may be used inside the device path. Multiple instances of the ALLOWDEVFILE directive are allowed.

Some programs such as Odoo ERP can update your **/etc/passwd** and **/etc/group files**. RKhuRootkit Hunter may report a warning for these file changes. To whitelist the file the **RTKT_FILE_WHITELIST** directive can be used. The value of this directive is the full path to the file to be whitelisted. If certain strings within the file need to be whitelisted, then the string name can be appended to the file path, with a colon before the string. e.g **RTKT_FILE_WHITELIST=/etc/passwd:postgres** will whitelist the postgres user entry inside **/etc/passwd file**

#### [NodeJs permission denied error](http://sourcode.net/sh-1-node-permission-denied/)
The error: sh: 1: node: Permission denied, usually occurs because the node binary does not allow execution with root privileges. To correct the error we need to run the commands:

```bash
npm config set user 0
npm config set unsafe-perm true
sudo npm install -g sm
```

#### [Configuring SFTP and SSH access for LXC Containers](https://linux.die.net/man/1/redir)
The **Redir** command allows redirecting TCP connections. It takes as argument, the listen address and port and the connect address and port. The listen address and port are the IP address and port at which the redir script will listen on. The connect IP address and port are the IP address and port that the redir command will connect to and forward the incoming TCP connection.

The redir command is very useful for forwarding ports. For example it can be used to forward SSH connections to a container running inside a server. The server needs to run the redir command which will forward the SSH connection to the SSH server running on the container.

The following command may be used: **redir --laddr=0.0.0.0  --lport=1001 --caddr=192.168.1.10 --cport=22 &.** The '&' at the end causes the redir command to run in the background. It listens on port **1001** and all available IP addresses on the server. It redirects the TCP connection to IP address **192.168.1.10** and port **22**, which is the standard SSH port. The SFTP/SSH client would need to establish a connection on port 1001 and IP address of the server.

#### [PrivateTmp systemd option prevents access to tmp folder](https://serverfault.com/a/786213/375645)
Systemd startup configuration files use the option **PrivateTmp** to prevent processes from sharing **tmp** folder.
When this option is set to true, a private tmp folder is created for each process. So if a process attempts to write to the /tmp or /var/tmp folder, the changes will be made only to the process's private tmp folder and not the system wide /tmp and /var/tmp folders. This option may be set to true in the system startup file for Apache web server on Ubuntu and Linux Mint. For example in: **/lib/systemd/system/apache2.service**.

#### [Fixing Rootkit Hunter lwp-request warning](https://mmcgrath.fedorapeople.org/rkhunter.conf)
RKhunter may give the following error about **lwp-request** script:

```bash
Warning: The command '/usr/bin/lwp-request' has been replaced by a script: /usr/bin/lwp-request: Perl script text executable
```

This warning may be ignored because lwp-request is a valid Perl script. It can downloaded from the [lwp-request page on CPAN](https://metacpan.org/pod/lwp-request). To supress the warning we need to whitelist the **lwp-request** file. We can do this by adding the following configuration option to **/etc/rkhunter.conf**. **SCRIPTWHITELIST=/usr/bin/lwp-request**. This was suggested in an answer to the question: [rkhunter gives me a warning for “/usr/bin/lwp-request” - what should I do? [Debian 9]](https://unix.stackexchange.com/questions/373718/rkhunter-gives-me-a-warning-for-usr-bin-lwp-request-what-should-i-do-debi) on unix.stackexchange. It was orginally suggested in the article [rkhunter warning [SOLVED]](https://forums.linuxmint.com/viewtopic.php?t=238110) on the Linux Mint forums.

#### [Rootkit Hunter SSH version warning](https://unix.stackexchange.com/questions/194087/rkhunter-warning-about-ssh-root-access-when-that-access-is-not-allowed-on-the-sy)
Rootkit Hunter may give the following error related to root user login configuration:

```bash
Warning: The SSH and rkhunter configuration options should be the same:
         SSH configuration option 'PermitRootLogin': prohibit-password
         Rkhunter configuration option 'ALLOW_SSH_ROOT_USER': no
```

This warning is given, when the root user configuration in the SSHD server configuration is different from the root user configuration in **/etc/rkhunter.conf** or **/etc/rkhunter.local.conf**. To suppress this error, we need to set the **ALLOW_SSH_ROOT_USER** in the Rootkit Hunter configuration to the same value that we set for the **PermitRootLogin** configuration in **/etc/ssh/sshd_config**.
