---
title: Viewing package information using yum history command
date: "2018-10-19"
layout: post
draft: false
path: "/posts/viewing-package-information-using-yum-history-command"
tags:
  - "command line tools"
  - "software installation and configuration"
description: "The yum history command displays list of all commands used to install or remove packages using yum package manager. The list is ordered by date and id. Each history item is called a transaction."
---

The yum history command displays list of all commands used to install or remove packages using yum package manager. The list is ordered by date and id. Each history item is called a transaction.

* To view details about a transaction enter the command: **yum history info transaction_id**, where transaction_id is a number such as **15**.
* To view information about a certain package such as **httpd**, enter the command: **yum history info httpd**.
* To view information about an entire package or list of packages for example **httpd**, use the command: **yum history package-list httpd** or **yum history package-info httpd**.
* To undo changes made by a transaction, enter the command: **yum history undo transaction_id**.
* To redo or reapply changes made by a transaction, enter the command: **yum history redo transaction_id**.
* To rollback or reverse changes made upto a certain transaction, enter the command: **yum history rollback transaction_id**.

See the article [How to Use ‘Yum History’ to Find Out Installed or Removed Packages Info](https://www.tecmint.com/view-yum-history-to-find-packages-info/) for more information on viewing package information using yum.
