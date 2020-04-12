---
title: Installing W3C Markup Validator on Debian Jessie
date: "2017-03-13"
layout: post
draft: false
path: "/posts/installing-w3c-markup-validator-on-debian-jessie"
category: "software installation and configuration"
tags:
  - "software installation and configuration"
description: "The W3C Markup Validator is a useful tool that allows validating HTML text. It can be used to check if a given web page or text conforms to the HTML 5 standard."
---

The [W3C Markup Validator](https://validator.w3.org/docs/install.html) is a useful tool that allows validating html text. It can be used to check if a given web page or text conforms to the html 5 standard. The following points may be considered during installation of W3C markup validator:

* local copy of validator is more reliable and easy to use for bulk use
* W3C Markup Validator supports validation of html,xml, xhtml, html5, mathml and more
* html5 validation requires validator.nu installation
* deb file not available in default repository for Debian Jessie
* W3C Markup Validator has to be installed from source. install guide given on: https://validator.w3.org/docs/install.html
* install guide for mod_perl from source (https://perl.apache.org/docs/2.0/user/install/install.html
* following perl module had to be installed: SGML-Parser-OpenSP
* libperl-dev package required for mod_perl compilation (http://tara24.de/fix-configure-errorperl-development-headers-found/)
* java 8 required for validator.nu
* java 8 for debian jessie requires backport repository (http://backports.debian.org/Instructions/)
