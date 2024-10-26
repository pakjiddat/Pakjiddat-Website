---
title: Generating free SSL certificate from LetsEncrypt on localhost
date: "2018-10-31"
template: post
draft: false
slug: "/posts/generating-free-ssl-certificate-from-letsencrypt-on-localhost"
category: "web development"
tags:
  - "web development"
  - "cyber security" 
description: "If your website hosting allows uploading SSL certificates but does not allow SSH access and you need a SSL certificate for your website, then a free SSL certificate from LetsEncrypt is a good option."
---

If your website hosting allows uploading SSL certificates but does not allow SSH access and you need a SSL certificate for your website, then a free SSL certificate from LetsEncrypt is a good option.

First we need to install the SSL certificate on a remote host, for example localhost. To install the SSL certificate we need to first install the Certbot Acme client. The [Certbot installation guide for Debian (Stretch)](https://certbot.eff.org/lets-encrypt/debianstretch-apache.html) on the Certbot website describes how to install Certbot on Debian Stretch. Similar guides are available for other Unix based operating systems. For example the following command will install Certbot on Debian (Stretch): **sudo apt-get install python-certbot-apache -t stretch-backports**.

Next, we need to obtain the SSL certificate. This can be done by issuing the command: **sudo certbot certonly --manual**. We will then be asked to enter the name of the domain. After that the screen will show some text and the name of a file. We will have to add the text to the file and then upload it to the server at the specified path. Next the LetsEncrypt server will verify the existence of the uploaded file and will issue the SSL certificates to our Certbot client. Usually the SSL certificates are saved to the folder: **/etc/letsencrypt/live/**. Next we need to upload the private key and SSL certificate to the website control panel. After this our website should be accessible over SSL.

See the [Certbot documentation](https://certbot.eff.org/docs/using.html#manual) for more information.
