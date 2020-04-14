---
title: Securing websites using Content-Security-Policy and X-Frame-Options
date: "2019-10-02"
layout: post
draft: false
path: "/posts/securing-websites-using-content-security-policy-and-x-frame-options"
tags:
  - "website security"
description: "Websites are playing an increasingly important role in society. They are no longer used casually. Over the last few years websites have evolved from an amusing hobby to a platform for delivering important content. The content delivered by websites is being used to make important decisions. It is therefore very important to ensure that website content is securely delivered."
---

### Introduction
Websites are playing an increasingly important role in society. They are no longer used casually. Over the last few years websites have evolved from an amusing hobby to a platform for delivering important content. The content delivered by websites is being used to make important decisions. It is therefore very important to ensure that website content is securely delivered.

Ensuring the security of website content is no easy task. To secure a website we need to secure the back-end as well as the front-end of the website. There are many options for securing websites. The website security options that I will describe in this article are X-Frame-Options and Content-Security-Policy. X-Frame-Options and Content-Security-Policy are both HTTP response headers which are sent by the server to the web browser. They are mostly used to specify which domains are allowed to show content on the website.

### X-Frame-Options
[X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) is a HTTP response header. The web server which sends this header indicates to the browser the domains that are allowed to embed content served by the web server. It can be used to prevent unauthorized websites from embedding content in iframes. The "allow-from" value of this header indicates the specific domain which is allowed to embed content in iframe.

Unfortunately we can only specify one domain name with the "allow-from". A work around to this limitation is mentioned in the [RFC for X-Frame-Options](https://tools.ietf.org/html/rfc7034#section-2.3.2.3). The workaround is to include the domain name in the iframe source url. The domain name is the name of the domain that has the iframe. The server that delivers the iframe content needs to check this domain value. If the domain is allowed to embed content, then the server can send the "allow-from" http response header containing the domain name.

Before using this header, [Browser compatibility of X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options#Browser_compatibility.), should be checked. The "allow-from" is not supported by Google Chrome.

### Content-Security-Policy (CSP)
The X-Frame-Options HTTP response header is an old method of securing content. A newer method is the [HTTP Content-Security-Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). It consists of HTTP headers that allow website administrators to control the resources that a browser is allowed to load for a give page. It prevents websites from displaying content from unauthorized domains. It helps to protect websites against Cross Site Scripting (XSS) attacks.

The [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors.) directive allows us to specify the domains that are allowed to embed content in iframes. It works similarly to X-Frame-Options allow-from, but it allows multiple domain names with wildcards to be specified. Unfortunately the frame-ancestors directive is not supported by Internet Explorer.

The Content-Security-Policy header supports several other directives. Some of them are:

* [connect-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src). Specifies the domains that are allowed to be used as script sources
* [font-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/font-src). Specifies the domains that are allowed to serve font files
* [frame-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-src). Specifies the domains that can be used as source for iframes
* [img-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/img-src). Specifies the domains from which images may be loaded
* [media-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/media-src). Specifies valid sources for loading media using the audio, video and track elements
* [script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src). Specifies valid sources for JavaScript. It includes inline JavaScript and event handlers
* [style-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src). Specifies valid sources for CSS Stylesheets

If a server sends both X-Frame-Options response header and the Content-Security-Policy response header, then the information in the Content-Security-Policy response header is given preference over X-Frame-Options.

### Conclusion
Both X-Frame-Options and Content-Security-Policy response headers should be implemented. Using both headers will allow the content security policy to be enforced by all popular web browsers. Websites that implement a good content security policy are likely to have higher rankings in search results.
