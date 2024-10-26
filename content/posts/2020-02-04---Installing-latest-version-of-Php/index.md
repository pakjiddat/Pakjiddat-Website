---
title: Installing latest version of Php
date: "2018-06-28"
template: post
draft: false
slug: "/posts/installing-latest-version-of-php"
category: "server management"
tags: 
  - "server management"
description: "PHP is a popular programming language commonly used for building web based applications. Most Linux distributions provide PHP out of the box. However the version of PHP in most cases is not the current stable version."
---

PHP is a popular programming language commonly used for building web based applications. Most Linux distributions provide PHP out of the box. However the version of PHP in most cases is not the current stable version.

To install the latest stable version of PHP, we need to use a third part package repository such as [deb.sury.org/](https://deb.sury.org/). To use this repository we need to follow the instructions given on: [https://packages.sury.org/php/README.txt](https://packages.sury.org/php/README.txt).

After that we can install the latest version of PHP. For example to install PHP 7.2, we need to issue the commands:

```bash
apt-get update
```

followed by:

```bash
apt-get install php7.2
```

To revert to the version of PHP provided by the operating system, we need to remove the file: **/etc/apt/sources.list.d/php.list**. We also need to remove the package singing key for deb.sury. Next we need to run the commands:

```bash
apt-get update
```

followed by:

```bash
apt-get remove php7.2
```

After that we need to install the PHP package using:

```bash
apt-get install php
```

This will install the version of PHP that is provided by the operating system
