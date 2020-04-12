---
title: Increasing web server timeout
date: "2018-09-25"
layout: post
draft: false
path: "/posts/increasing-web-server-timeout"
category: "web servers"
tags:
  - "web servers"
description: "If your website is based on PHP and is being served by Apache web server with Nginx as reverse proxy, then you may have experienced 504 Gateway Timeout errors. The error usually happens because some PHP script takes longer than usual to run."
---

If your website is based on PHP and is being served by Apache web server with Nginx as reverse proxy, then you may have experienced 504 Gateway Timeout errors. The error usually happens because some PHP script takes longer than usual to run. If you want to allow the PHP script to run for more than the default time of 30 seconds, then you have to make some changes to the Php.ini configuration and the nginx.conf and Nginx virtual host configuration.

To increase timeout of PHP scripts, we need to increase the **max_execution_time** settings in php.ini. The default value is 30 seconds. The changes will take affect after the Apache web server has been restarted

The timeout also has to be configured on the Nginx reverse proxy. It requires disabling the keepalive probes sent by Nginx to Apache. This can be done by adding the "**Connection: ''** HTTP header with empty value. For example:

```
proxy_set_header Connection "";
```

This needs to be set under the **location** block of the virtual host file located under **/etc/nginx/sites-available**

The fastcgi read timeout and proxy read timeout settings also need to be increased in the Nginx configuration. If you are trying to upload large files, then you need to increase the client_max_body_size setting. This can be done by adding the following:

```
fastcgi_read_timeout 600;
proxy_read_timeout 600;
client_max_body_size 20M;
```

to **/etc/nginx/nginx.conf**. After making the changes, nginx needs to be restarted.

See the discussion [Nginx reverse proxy causing 504 Gateway Timeout](https://stackoverflow.com/questions/24453388/nginx-reverse-proxy-causing-504-gateway-timeout) for more information on how to increase web server timeout
