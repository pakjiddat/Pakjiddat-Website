---
title: Making HTTP POST requests from Google Chrome
date: "2018-08-14"
layout: post
draft: false
path: "/posts/making-http-post-requests-from-google-chrome"
tags:
  - "web development"
description: "The Google Chrome developers toolbox is a useful tool that can be used to test HTTP POST requests. For example we may want to replay HTTP requests for testing APIS or debugging web pages."
---

The Google Chrome developers toolbox is a useful tool that can be used to test HTTP POST requests. For example we may want to replay HTTP requests for testing APIS or debugging web pages.

To replay a HTTP GET or POST request in Google Chrome, we need to open the Chrome developers toolbox and then under the network panel right click on the URL to replay. It will give us the option to copy the request as a **CURL command** or simply replay the request.

If your URL request is over HTTPS, then your CURL command may give errors related to untrusted SSL certificates. The solution is to append the --insecure option to the CURL command.

See the [official Chrome Developers Tool](https://developers.google.com/web/tools/chrome-devtools/) documentation for more information about making HTTP POST requests.
