---
title: Closing Unnecessary email accounts
date: "2017-04-11"
layout: post
draft: false
path: "/posts/closing-unnecessary-email-accounts"
tags:
  - "server management"
description: "If you want to keep your email organized, then it might be a good idea to have just one email account. Recently I decided to organize my email by closing email accounts that I don't use frequently. This article provides some points on how to organize your email."
---

### Introduction
If you want to keep your email organized, then it might be a good idea to have just one email account. Recently I decided to organize my email by closing email accounts that I don't use frequently. This article provides some points on how to organize your email.

Keeping track of several email accounts can create stress and reduce productivity. Accessing all your email from one account can greatly simply work routines.

I think its a good idea to close email accounts that you do not use frequently. But what if you have important email in those accounts. Or what if you cannot close your email accounts. Fortunately there is a solution for both these cases.

### Transferring email from one account to another
If you want to close your email account but still keep your email, then you can transfer your email from the account you want to close to some other email account. You can do this using a tool called [ImapSync](http://imapsync.lamiral.info). ImapSync is a useful tool that lets you transfer email from one IMAP account to another.

The tool has no graphical user interface and is run from the command line. The tool is written by Gilles Lamiral in Perl language. It supports all major operating systems. i.e Windows, Linux and Mac OS X.

[Installation guides](http://imapsync.lamiral.info/#install) are available for all major operating systems. Once the tool has been installed it can be run using the command **imapsync**. Here is an example usage of the command:

```
./imapsync --host1 test1.lamiral.info   --user1 test1   --password1 'secret1' \
           --host2 test2.lamiral.info   --user2 test2   --password2 'secret2' \
           --automap --justfolders --dry "$@"
```

The above command copies all email from the host test1.lamiral.info to test2.lamiral.info. The user name for test1.lamiral.info is test1 and for test2.lamiral.info it is test2

The **automap** option automatically maps the source IMAP folders to the destination IMAP folders. The **justfolders** option only creates the folders while the dry option implies no data is actually transferred. These two options are useful for testing the email transfer without actually transferring any email

To see all the options of the imapsync tool you can use the **--help** option. To start the email transfer you have to remove the **justfolders** and **dry** options. This will start the transfer of emails from host 1 to host 2. In this case from test1.lamiral.info to test2.lamiral.info

Transferring of emails can be a bit slow depending on the bandwidth of your email servers. If you want to transfer several thousand emails then it can take days to complete the transfer. Fortunately the tool caches some of the data so next time you run the tool the email transfer resumes from where it stopped

### Forwarding emails from one account to another
If you dont want to close your email account, then it may be possible to configure the email account so it forwards all your email to another email account. Most email providers support email forwarding. Gmail in particular has very good support for email forwarding

### Conclusion
Email is a very popular means of communication. However it can become difficult to manage if its not organized. ImapSync is a very useful tool that allows you to transfer your email messages between different servers. It can be used to consolidate all your email in one account. The tool is very popular and is well documented.
