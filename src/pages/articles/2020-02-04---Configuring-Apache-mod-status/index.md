---
title: Configuring Apache mod status
date: "2017-11-22"
layout: post
draft: false
path: "/posts/configuring-apache-mod-status"
tags:
  - "web servers"
description: Apache Mod Status is an Apache module that provides useful information about the requests being sent to Apache.
---

[Apache Mod Status](https://httpd.apache.org/docs/2.4/mod/mod_status.html) is an Apache module that provides useful information about the requests being sent to Apache.

It provides information such as the PID of Apache processes, the number of active and idle threads in each process, the thread id and request handled for each thread

Apache mod_status is available by default in most Apache servers installations. To enable mod_status, we need to enable the mod_status Apache module. We then need to enable the mod_status handle within a location directive. This directive can be placed within a virtual host block. For example:

```
<Location /server-status>
SetHandler server-status

Order Deny,Allow
Deny from all
Allow from .example.com
</Location>
```

This will allow the Apache status information to be accessed on the url: **http://localhost/server-status**. If we add refresh=N to the URL, then the status page will refresh every N seconds. For example: **http://localhost/server-status?refresh=5**. The **ExtendedStatus** Apache directive allows extra information to be displayed with mod_status. This directive is used side wide and cannot be applied on a virtual host basis. It can slow down the server, so it should only be used if needed
