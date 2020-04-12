---
title: Installing Wireshark on Ubuntu Artful
date: "2017-12-01"
layout: post
draft: false
path: "/posts/installing-wireshark-on-ubuntu-artful"
category: "software installation and configuration"
tags:
  - "software installation and configuration"
description: "Wireshark is a network protocol analyzer which allows inspecting network traffic at different levels. It supports all the well known network protocols and is commonly used for troubleshooting network related problems."
---

### Introduction
Wireshark is a network protocol analyzer which allows inspecting network traffic at different levels. It supports all the well known network protocols and is commonly used for troubleshooting network related problems. In this article I will describe my experience with installing Wireshark and using it for finding problems with web applications

### Installing Wireshark
Wireshark may be installed from source code or from a package management repository. Wireshark installation is described on the [Wireshark download page](https://www.wireshark.org/download.html).

Installation from package management repository is the simplest option but does not allow the same level of customization as installing from source code. Installing from package management repository on Debian and Ubuntu requires running the commands:

```
sudo apt-get update
sudo apt-get install wireshark-gtk
```

To install from source code, we need to first download the Wireshark source code. We have two options for installing Wireshark from source code. Either we can compile the code and generate a binary file or we can generate a package for the current operating system. The latter option is more suitable for installing Wireshark on several computers with identical operating system.

### Compiling the source code
Wireshark supports two graphical interfaces. One is based on **GTK+**, while the other is based on **QT**. To generate the Wireshark binary based on GTK+, we need to run the following command:

```
sudo apt-get install pkg-config
sudo apt-get install gtk+-3
apt-get install libgtk-3-dev
sudo apt-get install libpcap-dev
./configure --with-gtk=yes
make
make install
```

After running the **make** command, the wireshark-gtk binary file will be generated in the current directory. The make install command will copy the binary file to **/usr/local/bin/** (on Ubuntu Artful). After that we should be able to run the Wireshark using the command **wireshark-gtk**.

Running the command may give the following error:

```
wireshark: error while loading shared libraries: libwiretap.so.1: cannot open shared object
```

The error can be fixed by entering the command:

```
ldconfig
```

After that we should be able to run the Wireshark from command line using **wireshark-gtk** command.

Wireshark also has a command line client called **tshark** which is installed along with the wireshark-gtk binary. We can give various command line options to the **configure** command for customizing our Wireshark installation. For example the **--with-qt** option allows generating Wireshark with a QT based frontend.

### Generating package for the operating system
To generate a package for the current operating system for example Debian, we need to run the command:

```
dpkg-buildpackage -us -uc -rfakeroot
```

The command requires several dependencies which may be installed using the command:

```
sudo apt-get install qtbase5-dev qtbase5-dev-tools qttools5-dev qttools5-dev-tools qtmultimedia5-dev libqt5svg5-dev flex python-ply \
libc-ares-dev xsltproc docbook-xsl docbook-xml libxml2-utils libcap2-dev libcap-dev bison quilt libparse-yapp-perl portaudio19-dev \
libkrb5-dev liblua5.2-dev libsmi2-dev libgeoip-dev libnl-genl-3-dev libnl-route-3-dev asciidoc cmake w3m libsbc-dev libnghttp2-dev\
libssh-gcrypt-dev liblz4-dev libsnappy-dev libspandsp-dev
```

### Troubleshooting application problems using Wireshark and TCPDump
The problem I had was that my PHP script was making requests to Amazon Product API. The API was throttling the requests at random intervals and giving the error message that my application is sending requests too quickly.

Amazon Product API allows maximum of one request to be sent per second. My application was sending one request every 4 seconds so there should not be a problem.

I posted the error to the Amazon API forums. A similar error was reported by other users. Amazon support staff asked me to check my application using a low level tool. I decided to use [TCPDump](http://www.tcpdump.org/) for capturing network packets while my application was running.

I ran the command:

```
tcpdump -w tdump.pcap -i venet0 dst 52.94.216.120
```

for capturing the packets. The packets were captured from interface **venet0** and saved to **tdump.pcap** file. Only packets sent to the IP 52.94.216.120 were captured, which is the IP address of the Amazon Product API. The address appears to change every few minutes so I had to ping the API host **ecs.amazonaws.de** immediately before running the command in order to get the IP address.

After capturing the packets, I downloaded the tdump.pcap file from the server and opened it using Wireshark. The Wireshark displayed details of each captured packet. The Wireshark showed that the **TLS Hello Client** package which is sent at the start of the TLS handshake was being sent with an interval of 4 seconds. This showed that my application was sending requests to the API server with sufficient pause. I posted the tdump.pcap file to the Amazon API forums.

### Conclusion
Wireshark is a useful tool for troubleshooting network related problems. It supports hundreds of network protocols and has excellent features for analyzing and presenting network protocol information.
