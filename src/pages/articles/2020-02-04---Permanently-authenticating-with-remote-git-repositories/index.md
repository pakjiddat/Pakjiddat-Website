---
title: Permanently authenticating with remote git repositories
date: "2017-11-22"
layout: post
draft: false
path: "/posts/permanently-authenticating-with-remote-git-repositories"
tags:
  - "command line tools"
description: "Some times we need to non-interactively run scripts which commit to git source code repositories that are hosted remotely. For example we may want push changes to a git repository stored on Bit Bucket. Normally we will be asked to enter our Bit Bucket credentials, but this can be automated."
---

Some times we need to non-interactively run scripts which commit to git source code repositories that are hosted remotely. For example we may want push changes to a git repository stored on Bit Bucket. Normally we will be asked to enter our Bit Bucket credentials, but this can be automated. There are two ways of doing this:

We can use credential caching. This will cache our credentials for a given duration. For example use the following command to cache your git credentials for 1 hour:

```bash
git config --global credential.helper 'cache --timeout 3600'
```

Another option is to place a .netrc file in your home directory. This file is used by curl which is used by git when working with remote repositories. The format of this file is as follows:

```
machine bitbucket.org
login your-bitbucket-username
password your-bitbucket-password
```

The above methods should work with any remote git hosting. The article: [Permanently authenticating with Git repositories](https://confluence.atlassian.com/bitbucketserver/permanently-authenticating-with-git-repositories-776639846.html) describes how to permanently authenticate with git repositories.
