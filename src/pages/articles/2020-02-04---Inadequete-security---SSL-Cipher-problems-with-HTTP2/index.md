---
title: INADEQUATE_SECURITY - SSL Cipher problems with HTTP2
date: "2018-10-19"
layout: post
draft: false
path: "/posts/inadequate-security---ssl-cipher-problems-with-http2"
tags:
  - "network administration"
  - "online tools and services"
  - "server security"
  - "web servers"
description: "HTTP2 requires encryption over SSL. The recommended SSL protocol for HTTP2 is TLS 1.2. Ciphers are encryption algorithms used by SSL protocols."
---

HTTP2 requires encryption over SSL. The recommended SSL protocol for HTTP2 is TLS 1.2. Ciphers are encryption algorithms used by SSL protocols.

Certain devices specially old ones such as old Android mobile phones or old operating systems like Windows XP, support outdated SSL Ciphers that are not supported by HTTP2 protocol.

The [TLS 1.2 Cipher Suite Black List](https://http2.github.io/http2-spec/#BadCipherSuites) shows the list of all SSL Ciphers that are not supported by the HTTP2 protocol. If a web browser running on an old operating system requests a SSL Cipher that is on the list of unsupported Ciphers, then the HTTP2 implementation of the browser should reject the connection to the server with [INADEQUATE_SECURITY](https://http2.github.io/http2-spec/#INADEQUATE_SECURITY) error message

To test if the connection between your device and a web server is over a reliable and secure HTTP2 connection, go to [https://www.ssllabs.com/index.html](https://www.ssllabs.com/index.html) and enter the url of the website

See the discussion [nginx HTTP/2 support cipher problems](https://talk.plesk.com/threads/nginx-http-2-support-cipher-problems.337707/) on the official Plesk forum for more information
