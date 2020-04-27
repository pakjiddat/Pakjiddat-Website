---
title: Rocket Chat installation tips
date: "2017-01-12"
layout: post
draft: false
path: "/posts/rocket-chat-installation-tips"
tags:
  - "software installation and configuration"
description: "The following script can be used to run an instance of Rocket Chat"
---

The following script can be used to run an instance of [Rocket Chat](https://rocket.chat/):

```bash
#!/bin/sh

if [ $(ps -e -o uid,cmd | grep $USER | grep rocketchat | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
        export PATH=/usr/local/bin:$PATH
        export MONGO_OPLOG_URL=mongodb://localhost:27017/local
        export ROOT_URL=http://your-domain/
        export MONGO_URL=mongodb://localhost:27017/your-database
        export PORT=1000
        export MAIL_URL=smtp://gmail_email_address:password@smtp.gmail.com:465
        /root/.nvm/versions/node/v4.5.0/bin/forever start --minUptime 1000 --spinSleepTime 10000 --sourceDir path-to-rocket-chat main.js -l /var/log/forever.log -o /var/log/forever-out.log -e /var/log/forever-err.log
fi
```

The above command checks if an instance of Rocket Chat is already running. If it is not running, then the Rocket Chat is run using the forever command. The forever command ensures that the Rocket Chat keeps running. It restarts the Rocket Chat automatically in case it stops.

The forever script can be installed with the command: **npm install forever**. The above script may be run when the system boots up using the following cron job command:

```bash
@reboot /root/scripts/rc_starter.sh > /dev/null 2>&1
```

If your Rocket Chat upgrade fails with the error:

```
Your database migration failed
```

Then you may need to unlock the migration in mongodb and also increase database version to the next version.

You can do this by accessing the mongo shell and then entering the rocketchat database using the command: use rocketchat. After that run the command:

```
db.migrations.update({_id: 'control'},{$set:{locked:false,version:19}})
```

Replace 19 with the current version of your database migration.

See the [Rocket Chat Database Migration](https://rocket.chat/docs/administrator-guides/database-migration/) guide for more information on migrating Rocket Chat instances.
