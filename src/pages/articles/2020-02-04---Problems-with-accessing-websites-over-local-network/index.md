---
title: Problems with accessing websites over local network using HaProxy and Pfsense
date: "2017-11-14"
layout: post
draft: false
path: "/posts/problems-with-accessing-websites-over-local-network-using-haproxy-and-pfsense"
tags:
  - "network administration"
description: "Recently I had problems with accessing websites over a network that was using HaProxy and Pfsense. The websites could be accessed without problems over the internet, but it was not possible to access the websites over local network. For example when connected to the network over VPN."
---

### Introduction
Recently I had problems with accessing websites over a network that was using HaProxy and Pfsense. The websites could be accessed without problems over the internet, but it was not possible to access the websites over local network. For example when connected to the network over VPN

### The Network Topology
Our network uses Pfsense as the gateway server. It uses HaProxy load balancer package for serving websites. The HaProxy allows us to run several websites spread over different virtual machines over a single IP address.

### Problem with accessing websites
We could easily access the websites over the internet, but if we tried to access the website over the local network using the actual host name of the website, we got connection time out errors. It was simply not possible to access the website over local network.

After days of troubleshooting the problem turned out to be very simple. The HaProxy package of Pfsense has an option called "Use Client-IP to connect to back end servers". This option forwards connections to the back end web servers so it seems to the web servers that the connection request was sent directly by the client. But this option also adds some firewall rules that cause problems with accessing the website directly. As soon as we checked off this option we were able to access the websites over local network without problems.

### Conclusion
The HaProxy package for Pfsense has some great features that greatly simplify hosting multiple websites. It has support for HTTPS and also supports load balancing and fail-over.
