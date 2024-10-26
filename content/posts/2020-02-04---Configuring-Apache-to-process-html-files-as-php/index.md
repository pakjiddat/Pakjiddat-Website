---
title: Configuring Apache to process html files as php
date: "2017-02-06"
template: post
draft: false
slug: "/posts/configuring-apache-to-process-html-files-as-php"
category: "server configuration"
tags:
  - "server configuration"
description: "To allow Apache web server, to process files ending with .html as PHP files, we need to do two things. First we need to set the content-type http header for .html files to text/html. Secondly, we need to tell the Apache web server to process HTML files as PHP files."
---

To allow Apache web server, to process files ending with .html as PHP files, we need to do two things. First we need to set the content-type HTTP header for .html files to text/html. Secondly, we need to tell the Apache web server to process HTML files as PHP files.

Usually this can be achieved by adding following two lines in .htaccess:

```
AddHandler application/x-httpd-php .html
AddType text/html .html
```

The above code should work if PHP is configured as an Apache module, but may not work for other configurations like FastCGI.

To allow Apache to serve files ending with .html as PHP files, we need following code in vhost.conf file for the required virtual host:

```
<IfModule mod_fcgid.c>
    <Files tilde (\.html)>
        SetHandler fcgid-script
        FCGIWrapper /var/www/cgi-bin/cgi_wrapper/cgi_wrapper .html
        Options +ExecCGI
        allow from all
    </Files>
</IfModule>
```

The above code is for FastCGI configuration. It will differ for other configurations like mod_php. After editing the file we need to run following command for re-configuring the web server:

```bash
/usr/local/psa/admin/sbin/httpdmng --reconfigure-all
```

The article: [How to process files with .html extension through PHP (Linux)](https://kb.odin.com/en/115773) describes how to process .html files through PHP on Linux.
