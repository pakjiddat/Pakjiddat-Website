---
title: Installing NextCloud, Collabora and Spreed on Debian Jessie
date: "2017-11-14"
layout: post
draft: false
path: "/posts/installing-nextcloud--collabora-and-spreed-on-debian-jessie"
category: "software installation and configuration"
tags:
  - "software installation and configuration"
  - "collaboration tools"
description: "NextCloud is a document management and collaboration system. It allows users to access their images, documents, spreadsheets and other files from any location and any device."
---

### Introduction

[NextCloud](https://en.wikipedia.org/wiki/Nextcloud) is a document management and collaboration system. It allows users to access their images, documents, spreadsheets and other files from any location and any device.

NextCloud is free and open source and is a fork of OwnCloud. It also has an enterprise edition.

NextCloud consists of a server and clients. It can also be extended by apps. NextCloud server has a web interface that allows users to change the server settings and also manage their files. The web interface allows access to all the features of NextCloud. NextCloud clients are desktop and mobile applications that allow access to documents.

### Installation
NextCloud requires about of 512Mb RAM. It supports most modern Linux based operating systems. It requires Php 5.6+. It supports modern database servers including MySQL/MariaDb, PostGres and Oracle. It also supports all major web browsers, desktop and mobile clients.

NextCloud can be installed either from source or from SNAP. Source installation is slightly more difficult. It requires installation of several Php extensions. To install NextCloud from source, we need to first download the [NextCloud files](https://nextcloud.com/install/).

After that we need to create a database and then run the NextCloud installer from a web browser. This will install the NextCloud server. The details of the installation and the different installation options are well documented on the [NextCloud installation guide](https://docs.nextcloud.com/server/12/admin_manual/installation/index.html).

### Apps
NextCloud functionality can be extended with Apps. An App is a plugin that adds a new feature to NextCloud. NextCloud Apps are available from the [NextCloud App Store](https://apps.nextcloud.com/). An App can be installed and enabled from the Apps page.

It is also possible to develop a custom App and upload it to the NextCloud installation folder. NextCloud provides Apps for creating notes, video conferencing, editing office documents, managing tasks, creating diagrams,  file sharing, file versioning and much more.

### Collabora Online
Collabora Online is a LibreOffice based online document editor. It supports all major office document formats including Microsoft and Libre Office documents. Collabora Online is free and open source and works in all modern browsers. It supports collaborative editing and supports integration with other applications such as NextCloud.

Collabora Online server can be installed easily from a Docker image. The following line of code will start a Docker container running Collabora server. It will download the Docker image of Collabora, if not already downloaded. It will start a container running Collabora server listening on port 9980.

```
docker run -t -d -p 9980:9980 -e "domain=example.com" --cap-add MKNOD collabora/code
```

The installation of Collabora Online server with Nginx reverse proxy is described in the article [Running Online Office with Nextcloud and nginx](https://icewind.nl/entry/collabora-online/). The Collabora Online server must be accessible over the internet using HTTPS protocol.

Self signed certificates may not work so a HTTPS certificate should be obtained from a Certificate Authority. A good option for obtaining HTTPS certificates is [Lets Encrypt](/posts/installing-lets-encrypt-ssl-certificates-on-debian-jessie-and-nginx). It provides HTTPS certificates free of cost.

The [Collabora plugin for NextCloud](https://nextcloud.com/collaboraonline/) is easy to configure. It requires the public url of the Collabora server. Once the plugin has been configured, we can start editing office documents from within NextCloud using Collabora Online.

### Spreed Video Conferencing
Spreed is a video conferencing server. It implements the WebRTC protocol, which is supported by most modern web browsers. Spreed supports audio and video chat and conferencing. It also supports screen sharing and text based chat.

Spreed can be installed as a Docker container using the command:

```
docker run --rm --name my-spreed-webrtc -p 8080:8080 -p 8443:8443 -v `pwd`:/srv/extra -i -t spreed/webrtc
```

Installation of Spreed is described on the [Docker repository page for Spreed](https://hub.docker.com/r/spreed/webrtc/).

Once the Spreed server is running, it will listen on port 8443. Like the Collabora Online server it also requires HTTPS. Next we need to enable and configure the Spreed plugin for NextCloud. Configuration involves specifying the public URL of the Spreed server.

### Conclusion
NextCloud is a useful tool for managing documents online. It is easy to install and is well supported by an active online community. It is included in this list of the [Best Cloud Storage tools of 2017](https://www.cloudwards.net/diy-cloud-storage-tools/).
