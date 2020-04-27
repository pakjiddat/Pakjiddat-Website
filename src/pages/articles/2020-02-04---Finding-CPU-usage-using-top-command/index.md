---
title: Finding CPU usage using top command
date: "2017-02-10"
layout: post
draft: false
path: "/posts/finding-cpu-usage-using-top-command"
tags:
  - "server management"
description: "The top command can be used in combination with bash tools to find CPU usage. The article: Finding CPU usage from top command describes how to find CPU usage using the top command."
---

The top command can be used in combination with bash tools to find CPU usage. The article: [Finding CPU usage from top command](https://askubuntu.com/questions/68741/finding-cpu-usage-from-top-command/687%2054#68754) describes how to find CPU usage using the **top** command.

The following command extracts CPU usage from the output of top command. The top command is run in batch mode so its output can be extracted:

```bash
cpu_usage=$(top -b -d1 -n1|grep -i "Cpu(s)"|head -c21|cut -d ' ' -f3|cut -d '%' -f1)
```

On some systems, in the above command f3 should be replaced with f2. The command returns the value for 'us', which is the percentage of the total CPU time spent running un-niced user processes. The output of the above command can be saved in a variable and sent by email using a command like mailx.

For example the following command will send an alert email to the system administrator using gmail server:

```bash
echo "Hello Admin. The CPU usage on server is $cpu_usage%. Please check!" > /tmp/mail_body.txt
mailx -s "CPU usage on server is more than 70%. Please check!." -r "reply_email" -S \
smtp="smtp.gmail.com:587" -S smtp-use-starttls -S smtp-auth=login -S \
smtp-auth-user="gmail_user" -S smtp-auth-password="gmail_password" -S ssl-verify=ignore recepiant_email &lt; /tmp/mail_body.txt
rm -rf /tmp/mail_body
```
