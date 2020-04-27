---
title: Installing Lets Encrypt SSL Certificates on Debian Jessie and Nginx
date: "2018-10-14"
layout: post
draft: false
path: "/posts/installing-lets-encrypt-ssl-certificates-on-debian-jessie-and-nginx"
tags:
  - "software installation and configuration"
description: "HTTPS Certificates are files that are used to secure websites. A website that is secured using HTTPS is accessed using the HTTPS protocol. For example https://www.google.com. HTTPS certificates are issued by a Certificate Authority (CA). Lets Encrypt is a CA that issues HTTPS certificates free of cost."
---

### Introduction
HTTPS Certificates are files that are used to secure websites. A website that is secured using HTTPS is accessed using the HTTPS protocol. For example https://www.google.com. HTTPS certificates are issued by a Certificate Authority (CA). [Lets Encrypt](https://letsencrypt.org/getting-started/) is a CA that issues HTTPS certificates free of cost.

### Installation
To install a certificate from Lets Encrypt, we need to prove that we have control over the domain that needs to be secured. We can do this using an ACME (Automatic Certificate Management Environment) Protocol client. [ACME Protocol](https://ietf-wg-acme.github.io/acme/draft-ietf-acme-acme.html) is a protocol that allows automating Certificate Management Environments. Lets Encrypt provides several ACME clients. Certbot is the recommended ACME client which can be used to obtain HTTPS certificates from Lets Encrypt.

Certbot is packaged with Debian Jessie and can be obtained using the back-port repositories. To install Certbot on Debian Jessie, we can use the command:

```bash
sudo apt-get install certbot -t jessie-backports
```

This will install the Certbot client. To obtain a SSL certificate using Certbot, we need to enter the command:

```bash
sudo certbot certonly
```

This will allow us to interactively select the plugin and specify options that will be used to download the HTTPS certificate files. The webroot plugin is a simple plugin that downloads certificate files to the **/etc/letsencrypt** folder.

The webroot plugin can be used to obtain several certificates at a time. The plugin downloads verification files to the user specified folder. These files should be accessible over the internet. The Certbot server checks the presence of the files and then issues the requested certificates files. The files are saved to the **/etc/letsencrypt** folder. This folder contains several sub folders. The renew sub folder contains information used for renewing the certificate files. The live sub folder contains the certificate files used by the web server. It contains one sub folder for each domain.

### Certificate Renewal
The certificates issued by Lets Encrypt are only valid for 90 days. After 90 days, the certificates must be renewed. Renewal of the certificates is very simple and simply requires the command:

```bash
sudo certbot renew
```

This will renew all certificates that were issued to the Certbot. The command can be run daily from cron. The Lets Encrypt [installation guide](https://certbot.eff.org/#debianjessie-nginx) describes the process of installing HTTPS certificate files using Certbot. The [user guide](https://certbot.eff.org/docs/using.html#) describes the Certbot command line options in detail.

### Certificate Removal
To remove a LetsEncrypt SSL certificate we can issue the command: **certbot delete**. It will display list of installed certificates, with option for deleting a certificate. When a certificate has been deleted, all the certificate related files are removed.

### Conclusion
Lets Encrypt is an excellent service that allows securing websites free of cost. Their service is reliable and easy to use. It is also well documented and well supported.
