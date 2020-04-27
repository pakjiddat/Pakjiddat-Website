---
title: Running multiple versions of mailx command
date: "2017-11-24"
layout: post
draft: false
path: "/posts/running-multiple-versions-of-mailx-command"
tags:
  - "command line tools"
  - "server management"
description: "Certain commands in Linux can be provided by multiple packages. The command provided by each package may differ. For example the mailx command is provided by the bsd-mailx package as well as the heirloom-mailx package. The mailx command provided by the packages use different command line parameters."
---

Certain commands in Linux can be provided by multiple packages. The command provided by each package may differ. For example the mailx command is provided by the **bsd-mailx** package as well as the **heirloom-mailx** package. The mailx command provided by the packages use different command line parameters.

To force the system to use a command from a specific package we can use the **update-alternatives** command. For example the command:

```bash
update-alternatives --set mailx /usr/bin/heirloom-mailx
```

will set the mailx provided by heirloom-mailx as the default mailx command. So when we enter mailx on the command line, it will run the mailx provided by heirloom-mailx package.

The above command may give an error on Debian Stretch. If the error suggests that the mailx package has not been registered, then the error can be corrected by registering the heirloom-mailx package using the command:

```bash
update-alternatives --install /usr/bin/mailx mailx /usr/bin/heirloom-mailx 10
```

See the discussion on [How to change mailx?](https://serverfault.com/questions/666334/how-to-change-mailx), for more information on how to run multiple versions of mailx.
