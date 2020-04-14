---
title: Disabling output buffering with mod_fcgid
date: "2017-11-22"
layout: post
draft: false
path: "/posts/disabling-output-buffering-with-mod-fcgid"
tags:
  - "web servers"
description: "Output buffering in PHP allows output from a PHP script to be stored in a buffer. When the buffer is flushed, the output is displayed to the user. Sometimes we may want to disable output buffering, so we can quickly access the output from a PHP script. For example it is useful to be able to view the output from long running scripts."
---

Output buffering in PHP allows output from a PHP script to be stored in a buffer. When the buffer is flushed, the output is displayed to the user. Sometimes we may want to disable output buffering, so we can quickly access the output from a PHP script. For example it is useful to be able to view the output from long running scripts.

The output from a PHP script can be buffered by other tools such as the web server, intermediate proxy servers, web server modules, web browser, PHP Interpreter etc.

Disabling PHP output buffering is simple when using mod_php. We only need to disable the output buffering in the php.ini configuration, but when using PHP in a CGI or FastCGI environment it can be a bit tricky. Apache can use different modules for communicating with PHP in a FastCGI environment. For example mod_fcgid

To disable output buffering in a FastCGI environment, the following steps can be taken:

1. output buffering can be disabled for PHP by adding these lines to
php.ini:

```
zlib.output_compression = 0;
output_buffering = 0;
```

2. The mod_fcgid buffering can be disabled by adding: **FcgidOutputBufferSize 0** to the virtual host configuration.

3. The buffering by Apache can be disabled by disabling the mod_deflate Apache module.

The question [PHP output buffer not flushing](https://stackoverflow.com/questions/13751772/php-output-buffer-not-flushing) on Stackoverflow provides useful information on PHP output buffering problems.
