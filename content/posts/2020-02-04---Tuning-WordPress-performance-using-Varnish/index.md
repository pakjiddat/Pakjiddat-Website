---
title: Tuning WordPress performance using Varnish
date: "2017-04-11"
template: post
draft: false
slug: "/posts/tuning-wordpress-performance-using-varnish"
category: "software installation and configuration"
tags:
  - "software installation and configuration"
  - "web development"
description: "Recently I had the opportunity of on tuning website performance using Varnish. Varnish is called a Caching HTTP Reverse Proxy. This means it sits between your end user and one or more back-end servers such as Apache or Nginx and functions as a cache for HTTP traffic."
---

### Introduction
Recently I had the opportunity of on tuning website performance using [Varnish](https://www.varnish-cache.org). Varnish is called a Caching HTTP Reverse Proxy. This means it sits between your end user and one or more back-end servers such as Apache or Nginx and functions as a cache for HTTP traffic. Varnish can also function as a back-end server for a front-end such as Haproxy. This is the configuration in which we used Varnish.

Varnish is an excellent option for busy websites. It is a very fast and efficient caching server that can greatly reduce the time taken for serving requests. Of course to get maximum benefit from Varnish we need to configure and tune it according to our needs

### Installing Varnish
[Varnish online documentation](https://www.varnish-cache.org/docs) is complete and covers all aspects of using Varnish from installation to configuration and troubleshooting. Installation for Redhat based systems is simple and only requires adding the varnish repository to yum and running **yum install varnish.** This will install the latest version of varnish on your server.

The latest version of varnish is 4.0.x. The 4.x branch of Varnish is very different from the 3.x branch so Varnish configuration for 3.x will probably not work on 4.x. Its also difficult to find configuration samples for 4.x branch. If you need help with tuning Varnish you should read their documentation and their [online support forum](https://www.varnish-cache.org/support). [Changes from the 3.x branch ](https://www.varnish-cache.org/docs/4.0/whats-new/index.html)are documented on the Varnish website.


### Basic Configuration
Once we installed Varnish on our Centos 6 server we configured it to listen on port 80 and configured Apache to listen on port 8008. To change listen port of Varnish we set the **VARNISH_LISTEN_PORT=80** in the main Varnish configuration file **/etc/sysconfig/varnish**.

To change Apache port to 8008 we had to edit **/etc/httpd/conf/httpd.conf** and add port 8008 to the Listen directive.

After that we changed the Varnish backend port to 8008. This tells Varnish to communicate with Apache over port 8008. To do this we set **.port = "8008" **in **/etc/varnish/default.vcl** and restarted Varnish using **service varnish restart.**.

Varnish can store its content in memory or in files. To configure Varnish so it saves content in memory we had to set

```
VARNISH_STORAGE="malloc,${VARNISH_STORAGE_SIZE}"
```

in **/etc/sysconfig/varnish**. Thats all that is needed for getting up and running with Varnish.

### Serving content over Varnish
We had to tune and configure Varnish so it allows delivering content from our custom Content Delivery Network. We also had to configure Varnish so it supports WordPress. To do this we had to edit the main Varnish configuration file: **/etc/sysconfig/varnish** and the default varnish configuration file **/etc/varnish/default.vcl.**.

### Adding Content Delivery Network (CDN) server to Varnish
To add our Content Delivery Network (CDN) server to Varnish we did following:

* Edited **/etc/varnish/default.vcl** and added following lines below the backend statement:

```
backend cdn {
  .host = "192.168.1.10";
  .port = "8000";
}
```
192.168.1.10 is the IP address of the CDN server. 8000 is HTTP listen port of the CDN server.

* Restarted Varnish
* Updated the DNS record for the CDN host name so it points to our Varnish server. Once we did that our CDN content was being served over Varnish.

#### Serving WordPress over Varnish
In order to serve our WordPress website over Varnish we had to add specific configuration information for WordPress to **/etc/varnish/default.vcl**. This file contains configuration information in a language called **"Varnish Control Language"** or VCL.

Using this language we can configure Varnish for various tasks. The VCL configuration file contains sub routines that correspond to different stages of request execution in Varnish. These sub routines are documented in the **default.vcl** files. They are:

* **vcl_recv**. This is called by varnish just before it checks if the request is in cache or not. In this sub routine we can clear cookies from the request or rewrite the request.
* **vcl_backend_response**. This is called just before Varnish reads the HTTP response headers from the back-end. In this sub routine we can clear cookies that are set by the back-end.
* **vcl_deliver**. This is called just before the response is sent to the client. In this sub routine we can do basic accounting tasks or modify the final object before it is delivered to the client. For example we can set a HTTP response header indicating if the request was a cache hit or a cache miss.

### Adding HTTP headers to Varnish output
If you have multiple Varnish back-ends. For example you have one HAProxy front-end that load balances between multiple Varnish back-ends, then it would be useful to know which Varnish back-end served a request. You can do this be using the following vcl code in **vcl_deliver** sub routine.

```
sub vcl_deliver {
resp.http.X-Server= "dev.example.com";
}
```

It sets the server name to dev.example.com. You can view the HTTP headers added by Varnish such as cache hit/miss, cache duration etc from Google Chrome's Developer Toolbox.

### Download the VCL
Varnish has some useful [VCL code for WordPress](https://www.varnish-cache.org/trac/wiki/VCLExampleTemplateWordpressPurge) but it only works with Varnish 3.x. I had to modify the code so it works with Varnish 4.x.

### Varnish plugin for WordPress
WordPress has a useful plugin for Varnish called [Varnish HTTP Purge](https://wordpress.org/plugins/varnish-http-purge/). It allows WordPress admin users to remove or purge pages from the Varnish cache.

### Securing Varnish
One of the tasks that are commonly carried out in Varnish is purging content from the Varnish cache. By default Varnish allows purging content from any host. This can create a security issue, so its best to configure Varnish so it allows purging content from local host or specific IPs.

To do this we need to create an Access Control List in Varnish that defines which hosts are allowed to purge Varnish cache. The following VCL statements achieved this:

Place following after the back-end statements:

```
acl purge {
  "localhost";
  "127.0.0.1";
}
```

Place following inside **vcl_recv sub routine**. It checks the HTTP request method. If the method is PURGE and the IP from where the purge request is made is supported by the above ACL then the object is purged from the Varnish cache and the next VCL statement is executed. If the IP is not supported by the ACL then an error is shown to the user.

```
if (req.method == "PURGE") {
  if (!client.ip } purge) {
    return(synth(405,"Not allowed."));
  }
  return (purge);
}
```

Place following inside **vcl_hit** sub routine. vcl_hit is the function that is called when the object is found in the Varnish cache. If the request method is PURGE then Varnish returns success.

```
if (req.method == "PURGE") {    
  return(synth(200,"OK"));
}
```

Place following inside vcl_miss sub routine. vcl_miss is the function that is called when the object is not found in the Varnish cache. If the request method is PURGE and the object was not found in the cache, then the sub routine returns success since the object was not in cache anyway.

```
if (req.method == "PURGE") {    
  return(synth(200,"OK"));
}
```

You can also purge content from the Varnish cache using following command line: **curl -X PURGE content_url**. Make sure you issue this command from a host that is allowed by the ACL that you defined in your varnish VCL file.

The VCL configuration file of WordPress performs 2 main tasks. One is to allow purging of Varnish content from certain IPs. The other is to remove cookies from client HTTP requests and back-end HTTP response.

Varnish never caches content that has cookies. So any content that needs to be cached must be stripped of all cookies.

Of course you don't want to cache content from WordPress admin pages so you need to add suitable VCL statements that exclude the admin pages. Another thing to note about Varnish is that it considers objects with different URL query strings as different.

So if you want to prevent a JavaScript file from being cached one option is to append a query string to the URL and change the query string each time the JavaScript file is updated and needs to be removed from the Varnish cache.

### Checking errors
If you have an error in your VCL configuration file and you restart Varnish, then at least on Centos servers you wont see any descriptive error message. To see the error message you can start varnish manually from the command line using following: **vanrishd -f /etc/varnish/default.vcl**. This will show the errors in the VCL configuration.

### Viewing statistics

Varnish also has built in tools for viewing statistics. These tools are:

* **varnishtop**. It reads the varnish shared memory logs and presents a list of the most commonly updated log entries. e.g it can list ranking of requested documents, clients, user agents etc.
* **varnishhist**. It reads shared memory logs and displays continuously updated histogram showing distribution of last N requests.
* **varnishtop**. it displays different varnish counters such as hit rate, miss rate, information about storage, threads created, deleted objects etc.

### Edge side includes
Varnish also has a feature called edge side includes or ESI. This allows different caching policies to be applied to different parts of a web page. For example if a web page includes a statement such as:

```
<esi:include src="/includes/some_content.html"/>
```

then that will cause Varnish to replace the include statement with the content. This can be used for example by a news web site for caching the list of top 10 news items.

Varnish is a very popular choice for use as HTTP cache. Many I.T tools provide support for Varnish. For example the monitoring tool, [Munin](http://munin-monitoring.org/) has a plugin for Varnish that allows users to graph Varnish statistics.

### Conclusion
While there are other HTTP caches such as [Squid](http://www.squid-cache.org/), I found Varnish to be an excellent option. It has many configuration options, its easy to configure, it has good statistics and log monitoring tools and is being actively developed.
