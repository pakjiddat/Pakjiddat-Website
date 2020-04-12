---
title: Installing W3C Markup Validator and Validator Nu on Debian Jessie
date: "2017-04-11"
layout: post
draft: false
path: "/posts/installing-w3c-markup-validator-and-validator-nu-on-debian-jessie"
category: "website testing"
tags:
  - "website testing"
description: "W3C Markup Validator and Validator.nu are two useful tools that can be used to validate HTML code. W3C Markup validator allows validating xhtml, html, xml, mathml and more. Validator.nu allows validating HTML 5 code. The W3C Markup validator is written in Perl, while the Validator.nu is written in Java. Both tools are actively being developed."
---

### Introduction
[W3C Markup Validator](https://validator.w3.org/) and [Validator.nu](https://html5.validator.nu/) are two useful tools that can be used to validate HTML code. W3C Markup validator allows validating xhtml, html, xml, mathml and more. Validator.nu allows validating HTML 5 code. The W3C Markup validator is written in Perl, while the Validator.nu is written in Java. Both tools are actively being developed.

Both tools have well documented APIs. The [API for W3C Markup Validator](https://validator.w3.org/docs/api.html) is based on soap while the [API for Validator.nu](https://wiki.whatwg.org/wiki/Validator.nu_Web_Service_Interface) is RESTful and can be accessed using HTTP GET or POST methods. Both tools can be accessed online from a web browser or from their respective APIs.

If you need to validate several documents then it makes more sense to install the tools locally. By installing the tools locally we can validate documents more quickly and reliably. In this article, I will describe how to install both tools on Debian Jessie.

### Installing W3C Markup Validator
The W3C Markup Validator can be installed by following the [instructions given on the W3C Markup Validation website](https://validator.w3.org/docs/install.html). The website provides instructions on installing the W3C Markup Validator from a pre built package or from source.

#### Installing the pre requisites
I tried to install the W3C Markup Validator on Debian Jessie from package but the package was not available in the default repository. I decided to follow these [instructions for installing the W3C Markup Validator from source](https://validator.w3.org/docs/install.html#install-fromsource).

The installation steps are fairly easy to follow. First you need to install the prerequisites which is the SGML parser called [opensp](https://sourceforge.net/projects/openjade/) and some Perl modules.

The install guide mentions installing either several Perl modules one by one or installing [Bundle-W3C-Validator](http://search.cpan.org/dist/Bundle-W3C-Validator/) perl module. I installed the Bundle-W3C-Validator bundle module but I still had to install the Perl module: **SGML::Parser::OpenSP**

#### Downloading the source code
Next you need to download the source code for the W3C Markup Validator from Github. The W3C Markup Validator requires a web server ideally Apache. The validator source code is written in Perl and requires mod_perl Apache module. Installing **mod_perl** from source was the most difficult step in the installation.

#### Installing mod_perl
[The Installing mod_perl 2.0](https://perl.apache.org/docs/2.0/user/install/install.html) guide describes how to install mod_perl from source. Mod_perl requires perl headers which can be obtained by installing the **libperl-dev** package using apt-get. After the mod_perl source code has been downloaded, we need to generate the make file using the command:

```
perl Makefile.PL MP_APXS=/usr/local/apache2/bin/apxs
```

I got following error when running the command:

```
Your Perl is configured to link against libgdbm,
but libgdbm.so was not found.
You could just symlink it to /usr/lib/x86_64-linux-gnu/libgdbm.so.3.0.0
```

I fixed the error by installing the **libgdbm-dev** package. I ran the command again but got this error:

```
Reading Makefile.PL args from @ARGV
   MP_APXS = /usr/local/apache2/bin/apxs
no conflicting prior mod_perl version found - good.
Using APXS => /usr/local/apache2/bin/apxs
[  error] Unable to determine server version, aborting.
[  error] Invalid MP_APXS specified?
```

I fixed the error by installing the **apxs** package using the command:

```
apt-get install apache2-dev
```

The apxs package is a tool for building extensions and modules for Apache 2.4.

The apxs binary was installed in **/usr/bin** so I had to update the command to:

```
perl Makefile.PL MP_APXS=/usr/bin/apxs
```

After that the package had to be built using **make** command. After that **make test** command had to be run for running the package tests. If the tests pass then the mod_perl can be installed using the command **make install**. The last command copies the **mod_perl.so** library file to the Apache module directory. The module can be enabled using the command **a2enmod**.

During installation of mod_perl the **make test** command failed with some errors. I decided to post the error to the [mod_perl mailing list](https://perl.apache.org/maillist/modperl.html#Subscription_Information). After mod_perl was installed, I followed the rest of the installation instructions for the W3C Validator tool.

I had to first copy the **validator.conf** configuration file to **/etc/w3c/** folder and then adjust the folder paths in the file. Next configure a virtual host for the W3C Markup Validator tool. After that I restarted Apache and was able to access the W3C Markup Validator from a browser.

### Installing Validator.nu
Validator.nu allows validating Html 5 documents. Its installation is much simpler. The installation steps are given on the [Nu Validator Checker website](https://validator.github.io/validator/#build-instructions).

First we need to install the pre requisites which are Git, Python and JDK. The python version should be 2.7 or greater. The JDK version should be 8. JDK 7 did not work for me. Installing JDK 8 on Debian Jessie requires the backport repository for Debian Jessie. This can be installed by following the [Debian Backport Installation](http://backports.debian.org/Instructions/) instructions.

#### Building validator.nu from source
After the pre requisites have been installed you need to download the [source code for the validator.nu](https://github.com/validator/validator) from Git Hub. Once the source code has been downloaded, it needs to be built using the command:

```
python ./build/build.py all
```

This command starts a web server that listens on port **8888**. The Validator.nu should now be accessible on **http://localhost:8888**. The validator.nu source code includes a **vnu.war** file that allows the tool to be deployed within a Servlet container such as Tomcat. There is also a vnu.jar file that allows HTML documents to be validated from the command line.

The W3C Markup Validator and Validator.nu are separate tools but can be used from the interface for the W3C Markup Validator. To use both tools from a single interface, we just need to uncomment two lines at the bottom of the file **/etc/w3c/validator.conf**.

### Conclusion
The W3C Markup Validator and Validator.nu are useful tools for web developers that allow validating HTML markup. Both tools provide useful APIs that allow validation of HTML documents from any programming language. The APIs can be used in unit tests for web applications.
