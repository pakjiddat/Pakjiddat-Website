---
title: Containerization - Quick Tips
date: "2019-08-16"
layout: post
draft: false
path: "/posts/containerization---quick-tips"
tags:
  - "quick tips"
  - "server virtualization"
description: "Following are some quick tips related to Docker and LXC/LXD containers:"
---

Following are some quick tips related to Docker and LXC/LXD containers:

#### [Getting console output of Docker container](https://stackoverflow.com/questions/33083385/getting-console-output-from-a-docker-container)
To get the console output of a Docker container, enter the following command:

```
docker logs [container-id]
```

To get the console output in real time use the -f switch

#### [Running Docker container in detached mode](https://docs.docker.com/engine/reference/run/#detached--d)
To run a Docker container in detached mode, use the -d switch. For example:

```
docker run -d [image-name]
```

#### [Running a Docker container on server boot](https://docs.docker.com/engine/reference/run/#restart-policies---restart)
The Docker restart policy determines how a Docker container should be restarted once it exits. The restart policy is specified using the --restart flag. The default value of this flag is "no". To automatically start the container each time the Docker daemon starts, the restart flag should be set to "always". For example:

```
docker run --restart="always" [image-name]
```

This can be used to automatically run Docker containers when the server boots.

#### [Listing LXC containers](https://linuxcontainers.org/lxc/manpages/man1/lxc-ls.1.html)
To list LXC containers, the **lxc-ls** command should be used. It supports flags for listing running and stopped containers. For example to list all running LXC containers, use the following command:

```
lxc-ls --running
```
