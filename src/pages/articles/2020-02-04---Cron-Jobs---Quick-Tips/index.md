---
title: Cron Jobs - Quick Tips
date: "2019-04-03"
layout: post
draft: false
path: "/posts/cron-jobs---quick-tips"
tags:
  - "quick tips"
  - "server management"
description: "Following are some quick tips related to Cron Jobs:"
---

Following are some quick tips related to Cron Jobs:

#### [Format of crontab file](http://www.freebsd.org/cgi/man.cgi?crontab(5))

A cron tab entry has 5 fields. These are: **minute, hour, day of month, month and day of week**. For example:

```
*/30 * * * 1,3
```
The above entry will run every 30 minutes on Mondays and Wednesdays

#### [Running Cron Jobs at random intervals](https://stackoverflow.com/a/16289693/4508593)
To run a Cron Job at random intervals we need to prefix the Cron Job command with the **sleep** bash command. For example to run a Cron Job every 5 to 7 hours at random intervals, we can use the following:

```
0 */5 * * * sleep $[RANDOM\%120]m; path-to-script
```

In the above code, the '%' has to be escaped. The code: **$[RANDOM\%120]** generates a random number between 0 and 120. This is the number of minutes that script will pause. The script will run at the times: 05:00+(rand(0, 120)), 10:00+(rand(0, 120)), 15:00+(rand(0, 120)), 20:00+(rand(0, 120)) and 00:00+(rand(0, 120))

#### [Running cron jobs on first weekday of month](https://sysadminspot.com/linux/cron-to-run-on-first-specified-day-of-the-month/)
To run a cron job on the first weekday of every month for example first Wednesday of each month, the following cron job entry can be used:

```
0 0 * * Wed [ `date +\%d` -le 7 ] && command-to-run
```
The above cron job will be run on first Wednesday of each month
