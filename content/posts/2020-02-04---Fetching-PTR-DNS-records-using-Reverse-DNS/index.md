---
title: Fetching PTR DNS records using Reverse DNS
date: "2017-02-02"
template: post
draft: false
slug: "/posts/fetching-ptr-dns-records-using-reverse-dns"
category: "network administration"
tags:
  - "network administration"
description: "Reverse DNS or RDNS is the process of fetching the host name for a given IP address. Reverse DNS works similarly to forward DNS."
---

[Reverse DNS](https://en.wikipedia.org/wiki/Reverse_DNS_lookup) or RDNS is the process of fetching the host name for a given IP address. Reverse DNS works similarly to forward DNS. It is used in different situations. A common use of RDNS is to resolve an IP address to a host name. The process of resolving an IP address to a host name requires fetching the PTR record for the given IP address. It works as follows:

The DNS resolver sends a request for an IP address. for example **192.168.1.1**. The DNS resolver reverses the IP address and appends the domain: **.in-addr.arpa**. So the request now becomes: **1.1.168.192.in-addr.arpa**. The DNS resolver sends a request for the PTR record for: **1.1.168.192.in-addr.arpa** to the root name server.

The root name server forwards the request to the DNS server that is in charge of Class A IP addresses which is the classification for IP addresses that start with 192. In most cases the request is sent to the DNS servers of a "Regional Internet Registry" for example ARIN for North America, APNIC for Asia Pacific and RIPE for Europe.

The "Regional Internet Registry" then forwards the PTR request to the DNS servers of the ISP that owns the IP address block. The ISP's DNS server will forward the PTR request to the organizations DNS servers. The organization's DNS servers should then respond with the contents of the PTR record.

The process of Reverse DNS lookup is similar to a normal forward DNS lookup in that each section of the name is looked up. For example first it looks up the DNS servers for **192.in-addr.arpa** then for DNS server for **168.192.in-addr.arpa** and then DNS servers for **1.1.168.192.in-addr.arpa**.

PTR DNS records can be regarded as a pointer to a DNS record. It essentially points to a host name. Configuration of PTR records must be done by the ISP first. The ISP's DNS server usually has a NS or nameserver record with name: **1.168.192.in-addr.arpa** and value: ip-of-organizations-dns-server. The organization's DNS server then adds a PTR record with name: **1** and value: **required-host-name**.

PTR records are commonly used to verify email servers. An email server with an invalid PTR record will not be able to send email since it is not trusted by most email servers.

[What is reverse DNS and why should you care?](https://blog.leadfeeder.com/what-is-reverse-dns-and-why-you-should-care/) is a useful article that describes in layman's terms how Reverse DNS and PTR records work. It explains the importance of Reverse DNS and PTR records and how they are used by Web Analytics software and email clients.
