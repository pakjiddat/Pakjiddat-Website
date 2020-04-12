---
title: Setting up your own Content Delivery Network using Bind DNS
date: "2017-11-14"
layout: post
draft: false
path: "/posts/setting-up-your-own-content-delivery-network-using-bind-dns"
category: "content delivery network"
tags:
  - "content delivery network"
  - "server management"
  - "software installation and configuration"
description: "Recently I worked on constructing a simple Content Delivery Network using Bind DNS. I will share my experience in this blog post. Bind DNS is an open source DNS server. It is the most widely used DNS server. DNS is one of the building blocks of the internet. The main use of DNS is to translate domains names to IP Addresses. DNS also has other uses such as securing email."
---

### Introduction
Recently I worked on constructing a simple Content Delivery Network using Bind DNS. I will share my experience in this blog post. [Bind DNS](http://www.isc.org/downloads/bind/) is an open source DNS server. It is the most widely used DNS server. DNS is one of the building blocks of the internet. The main use of DNS is to translate domains names to IP Addresses. DNS also has other uses such as securing email.

### Main function of a Content Delivery Network (CDN)
The main purpose of a [Content Delivery Network](http://en.wikipedia.org/wiki/Content_delivery_network) is to deliver content such as images, audio/video files, JavaScript and CSS files.

The CDN is configured to deliver content with low latency and high availability. Most of the data on social networks and popular websites such as WordPress and E-commerce websites is delivered using a CDN.

### Anycast DNS used by CDNs
Although CDNs use different protocols and technologies for delivering content securely and with high performance, a common feature of most CDNs is their use of Anycast method for resolving DNS queries.

[Anycast](http://en.wikipedia.org/wiki/Anycast) is a network addressing and routing methodology by which data is sent to the nearest node. When Anycast is used with DNS, The DNS server returns the IP address of the host that is closest to the client that sent the DNS query. The client then fetches the content from this host.

### Split DNS
[Split DNS](http://en.wikipedia.org/wiki/Split-horizon_DNS) is a technique supported by the DNS protocol which allows a DNS server to return different information depending on the source of the request.

Bind DNS implements Split DNS with a feature called Views. To configure Views on a Bind DNS server you have to first create one View statement for each Geographical zone that needs to be served.

### Implementing Split DNS using Bind Views
Views are given in the Bind configuration file, **named.conf**. The article ["DNS BIND view Clause"](http://www.zytrax.com/books/dns/ch7/view.html) has useful information on DNS Views. Then you have to add DNS records to each view. The records are returned to the client that has access to the View.

Client access for views can be configured by adding **match-clients** clause to each View. **Match-clients** clause allows us to specify the IP addresses that have access to the View. These addresses can be given using [Bind Access Control Lists](http://www.zytrax.com/books/dns/ch7/acl.html) or simple network address notation such as 192.168.1.0/24.

Views are a very powerful feature of Bind DNS that allows DNS records to be served depending on the client. Usually the DNS records are served depending on the client's geographical location. Configuring Views in Bind DNS is very simple.

### Problems with using Bind Views
A problem with using Bind Views is that if the client users are spread across the world, then you will need to enter the network addresses of all possible clients. This can make your Bind configuration quite large.

For example if you have one CDN server in Country A and one in Country B, then your Bind configuration will need to have all possible network addresses of Country A and Country B. So you will need one view statement for Country A and one view statement for Country B.

Each view statement will need to have a **match-clause** for that country. Clients located in Country A will then match view for Country A and will be served DNS records in that view. The IP addresses in these records should be of servers located in Country A.

Same for Country B. What if a user is not in Country A or Country B. We will need a default View for such clients. This view can be defined using the clause: **match-clients{ any;}**.

Views in Bind are processed in the order in which they are defined, so the default view should be defined at the end. The main difficulty in implementing Split DNS using views is that you need to know the IP address range for countries. You can use a free database from [MaxMind](http://dev.maxmind.com/geoip/legacy/geolite/). However you will need to convert the network addresses in the database to a format that is compatible with Bind ACLs.

Fortunately there are scripts available that allow us to do this. The article ["HOWTO Implement GeoDNS using BIND"](http://phix.me/geodns/) demonstrates a script that downloads MaxMind database and converts network addresses to a format compatible with Bind ACLs. The script provides a file with all the converted network addresses grouped by country. Once you have configured the Bind views, all you need to do is upload content to your CDN servers. Your users should then be able to download files from the closest server.

### Conclusion
Bind is a very powerful DNS server that has many features. Some of the different configurations of Bind are described in [DNS Configuration Types](http://www.zytrax.com/books/dns/ch4/index.html).

DNS implemented using Bind forms the backbone of many important services such as email security, web browsing, content delivery networks etc. A good understanding of Bind will make it easier to learn about the different services that use DNS.
