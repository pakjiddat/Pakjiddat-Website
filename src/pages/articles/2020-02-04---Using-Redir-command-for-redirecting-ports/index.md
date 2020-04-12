---
title: Using Redir command for redirecting ports
date: "2017-11-22"
layout: post
draft: false
path: "/posts/using-redir-command-for-redirecting-ports"
category: "command line tools"
tags:
  - "command line tools"
description: "Redir is a very useful command line script that allows port redirection. The script listens on the given TCP port and forwards incoming connection to the given IP address and port"
---

[Redir](https://linux.die.net/man/1/redir) is a very useful command line script that allows port redirection. The script listens on the given TCP port and forwards incoming connection to the given IP address and port.

One use case for the Redir command is to setup SSH access for a container that is running inside a host system. For example if you are running LXC containers on a server and you want to be able to SSH to a container from outside the server, then you can use the redir command to redirect incoming connections on SSH port 22 or some other port to the SSH port of your container.

The following redir command listens on all available IP addresses and port 1000. It redirects all incoming connections to port 22 on host 192.168.1.6. The '&' at the end of the command allows the command to run in the background.

```
redir --laddr=0.0.0.0  --lport=1000 --caddr=192.168.1.6 --cport=22 &
```
