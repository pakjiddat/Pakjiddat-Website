---
title: Upgrading R from version 3.0 to 3.5
date: "2018-06-28"
layout: post
draft: false
path: "/posts/upgrading-r-from-version-3-0-to-3-5"
tags:
  - "server management"
  - "software installation and configuration"
description: "R is a free software package for statistical computing. It is part of most Linux distributions. However the latest version of R is not always available. To install the latest version of R we need to add the URL of a CRAN mirror to a file in /etc/apt/sources.list.d."
---

R is a free software package for statistical computing. It is part of most Linux distributions. However the latest version of R is not always available. To install the latest version of R we need to add the URL of a CRAN mirror to a file in **/etc/apt/sources.list.d**.

CRAN is a network of ftp and web servers that provide upto date information on R such as documentation, source code and news about R development. To install R, we need to issue the commands:

```
apt-get update
```

followed by:

```
apt-get install r-base r-base-dev
```

To update R to a newer version we need to replace the CRAN URL in **/etc/apt/sources.list.d**, with a URL that points to the newer version of R. After that we need to issue the commands:

```
apt-get update
```

followed by:

```
apt-get upgrade
```

Since the new CRAN URL requires different package signing keys, we will get an error similar to: **"following signatures couldn't be verified because the public key is not available: NO_PUBKEY"**.

The solution is to import the package signing keys for the new R package using the command:

```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys [key_name]
```

where key_name is the short signature of the missing key as indicated in the error message. After that the **apt-get upgrade** command should work without problems.

See the [R official documentation](https://cran.r-project.org/bin/linux/debian/#secure-apt) for more information.
