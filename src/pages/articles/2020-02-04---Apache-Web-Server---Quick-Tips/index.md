---
title: Apache Web Server - Quick Tips
date: "2019-04-03"
layout: post
draft: false
path: "/posts/apache-web-server---quick-tips"
tags:
  - "quick tips"
  - "web servers"
description: "Following are some quick tips related to Apache Web Server:"
---

Following are some quick tips related to Apache Web Server:

#### [Apache Multi Processing Modules (MPMs)](https://www.liquidweb.com/kb/apache-mpms-explained/)
The Apache web server supports Multi Processing Modules (MPM) since version 2. An Apache MPM is a module that determines how Apache manages networking connections and output. Apache supports several MPM for different operating systems. The most commonly used MPMs are Prefork, Worker and Event MPMs

The Prefork MPM is single threaded, which means it only allows one thread per child process. This is not efficient and is not suitable for busy web sites

The Worker MPM allows multiple threads per child process. It is much more efficient than Prefork MPM.
The Event MPM is similar to the Worker MPM. It is more efficient than the Worker MPM since it allows a thread to perform more than one task. It has the lowest resource usage but is considered as experimental for Apache versions before 2.4. For Apache 2.4 and above, the Event MPM seems to be the most suitable MPM

#### [Calculating the number of simultaneous connections supported by Apache](http://stackoverflow.com/questions/3389496/how-do-you-increase-the-max-number-of-concurrent-connections-in-apache)
Modern web browsers make 6 to 8 simultaneous connections to the web server.
The number of simultaneous connections supported by Apache web server is determined by the configuration of the MPM  that is used.

Generally the maximum number of users that can access a website served by Apache is equal to **ServerLimit * ThreadsPerChild.** The ServerLimit is the maximum number of processes that are allowed to be created by Apache. The ThreadsPerChild is the number of threads created per child process

#### [Generate Certificate Signing Request (CSR) for ssl certificates](https://pk.godaddy.com/help/apache-generate-csr-certificate-signing-request-5269)
In order to purchase a SSL certificate, we need to generate a Certificate Signing Request (CSR). The CSR contains information on the domain to be secured and the owner of the domain. To generate a CSR, we can use openssl command.
For example the command: **openssl req -new -newkey rsa:2048 -nodes -keyout yourdomain.key -out yourdomain.csr**, will generate a CSR file and a private key file for the domain yourdomain.com. The CSR file needs to be sent to the certificate authority that will supply the SSL certificate. The private key file should be kept securely, as it will be used by the web server.

#### [Using flags with rewrite rule](https://httpd.apache.org/docs/current/rewrite/flags.html#flag_t)
The behavior of Rewrite commands can be modified using flags. Some of these flags take arguments. Rewrite supports several flags. The **[R]** flag causes an external redirection. It means the URL in the browser changes when the **[R]** flag is used. The **[R]** flag takes an argument with a default value of **302**. This argument is the status code of the HTTP response.

The default behavior of the RewriteRule is to cause an internal redirection to the target path. It means the URL in the browser does not change. The target path is the file system path but it may be given as a URL
The **[L]** flag signals that the processing of the mod_rewrite commands should stop.

#### [Creating and Installing Apache Self Signed Certificate](https://www.sslshopper.com/article-how-to-create-and-install-an-apache-self-signed-certificate.html)
To generate an Apache self signed certificate, we need to issue the command:

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout mysitename.key -out mysitename.crt
```

This will generate a SSL certificate called **mysitename.crt** and a private key file called **mysitename.key**. The path to these files can be added to the Apache virtual host configuration.

#### [Redirect http to https with Apache](https://wiki.apache.org/httpd/RewriteHTTPToHTTPS)
To redirect http urls to https, we need to add the following directives to .htaccess file:

```
RewriteEngine On
# This will enable the Rewrite capabilities

RewriteCond %{HTTPS} !=on
# This checks to make sure the connection is not already HTTPS

RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R,L]
# This rule will redirect users from their original location, to the same location but using HTTPS.
# i.e.  http://www.example.com/foo/ to https://www.example.com/foo/
# The leading slash is made optional so that this will work either in httpd.conf
# or .htaccess context
```
