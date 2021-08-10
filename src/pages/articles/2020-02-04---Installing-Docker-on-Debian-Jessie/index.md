---
title: Installing Docker on Debian Jessie
date: "2017-11-22"
layout: post
draft: false
path: "/posts/installing-docker-on-debian-jessie"
tags:
  - "software installation and configuration"
  - "virtualization"
description: "Docker is a solution for managing light weight containers. To install Docker on Debian Jessie, we need to first install packages to allow apt to use a repository over HTTPS. We can do this using the command:"
---

Docker is a solution for managing light weight containers. To install Docker on Debian Jessie, we need to first install packages to allow apt to use a repository over HTTPS. We can do this using the command:

```bash
sudo apt-get install \
     apt-transport-https \
     ca-certificates \
     curl \
     gnupg2 \
     software-properties-common
```

Next we need to add Docker's official GPG key using the command:

```bash
curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | sudo apt-key add -
```

After that we need to install the apt repository using the command:

```bash
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
   $(lsb_release -cs) \
   stable"
```

Next we need to install Docker Community Edition using the command:

```bash
sudo apt-get install docker-ce
```

Next we can test the installation by running the hello world Docker Container. We can do this using the command:

```bash
sudo docker run hello-world
```

See the [official Docker installation guide for Debian](https://docs.docker.com/engine/installation/linux/docker-ce/debian/) for details on installing Docker on Debian Jessie
