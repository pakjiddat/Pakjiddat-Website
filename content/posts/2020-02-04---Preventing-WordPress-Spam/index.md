---
title: Preventing WordPress Spam
date: "2019-04-16"
template: post
draft: false
slug: "/posts/preventing-wordpress-spam"
category: "cyber security"
tags:
  - "cyber security"
description: "WordPress is a very popular platform for publishing websites. Almost all features that one can expect from a website are provided in the form of open source plugins and themes. Adding new features to a website is as easy as installing a plugin and configuring it."
---

### Introduction
WordPress is a very popular platform for publishing websites. Almost all features that one can expect from a website are provided in the form of open source plugins and themes. Adding new features to a website is as easy as installing a plugin and configuring it. Highly complex websites based on WordPress can be constructed by installing and configuring the correct plugins and themes.

Given the wide range of available plugins, developing complex web sites based on WordPress may seem like an easy task. But the fact is that developing a complex website is never easy. Without proper planning and attention to detail, an application cannot achieve its required purpose. Very often, Web Developers tend to focus on the features of a website and overlook other important aspects of a website such as its performance and security. Website security is a critical issue. One that is often overlooked by the people who plan and develop the website. Recently I contributed to the development of a website based on WordPress. The website had numerous features, but was not well secured. The security problems with the website affected the entire server and caused big problems for the server administrator. I will share my experience in this article.

### Purpose for developing websites
A website can serve many purposes. It can be used as an intranet, as a platform for spreading information about a topic. It can be used as a source of entertainment etc. The point is that a website needs to have a purpose. And it should always be achieving the purpose for which it was built. If a website is not achieving its purpose, it should be brought down. It should not be left accessible to everyone on the internet. An indication that a website is not achieving its purpose is that it is not being updated or being accessed. A website that is not being maintained can develop security problems. This is because the environment in which the website exists, which is the server and the internet are constantly changing.

### Problems with neglected websites
Websites that are not achieving any real purpose are a problem for the company and for the system administrators. The main reason why such websites exist is usually a lack of cooperation between system administrators, website developers and managers. The website that I worked with was based on WordPress. It had the latest commercial plugins that provided, forum, blog, learning system, job management, resume builder etc. The website was developed without proper consultation between managers, developers and designers. As a result due consideration was not given to the security of the website. The website was abandoned shortly after its development. For months it was not updated or even checked by the system administrators and manger.

### Problems caused by open user registration
A major security problem with the website was that it allowed anyone to register. While this feature is present in many websites, it needs to be carefully implemented. Of course we do not want anyone to register on our website. We do not want bots, scripts and spam users to register. Unfortunately this is what happened with the website. It was attacked with spam user registrations. Within a spam of a few weeks, over 28,000 spam users and over 45,000 spam Buddy Press groups had registered on the website.

#### Server monitoring
We would never even have known about the problem. The first sign we had of a problem was high CPU usage on our server which was hosted on Google Cloud Platform (GCP). At first we thought this was because of too many applications and insufficient CPU. So we tried to fix the problem by increasing the CPU from 2 to 4. We also removed unused applications based on Node.Js and Docker which are known to consume server resources. However this did not fix the problem and the server consistently had 100% CPU usage. This was a big problem because important company websites were hosted on this server.

The **htop** command showed high CPU usage by the MySQL and Apache processes. Running the **show processlist** command from the MySQL prompt showed over 20 SQL queries being run on a certain database constantly. The web server access log showed almost non stop access to a certain website. The overused website was using the overused database. A quick look at the database table showed a large number of users and groups.

#### Removing Spam users
The [Bulk Delete](https://wordpress.org/plugins/bulk-delete/) WordPress plugin allows deleting multiple users at once. I used this plugin to delete the Spam users. However the plugin did not work as expected and gave an error. The web server error log showed the following error:

```
2019-04-09T15:17:11.259450Z 123 [Warning] InnoDB: Table mysql/innodb_index_stats has length mismatch in the column name table_name. Please run mysql_upgrade

[Tue Apr 09 11:32:17.015235 2019] [:error] [pid 3182] [client 192.168.1.1:43080] WordPress database error Table 'performance_schema.session_variables' doesn't exist for
query show variables like 'max_allowed_packet' made by do_action('wp_ajax_nopriv_wordfence_doScan'), WP_Hook->do_action, WP_Hook->apply_filters, wordfence::ajax_doScan_c
allback, wfScan::wfScanMain, wfScanEngine->go, wfScanEngine->doScan, wfScanEngine->scan_knownFiles_main, wordfenceHash->run, wordfenceHash->processFile, wfScanner->incre
mentSummaryItem, wfScanner->_maybeSaveSummaryItems, wfScanner->_saveSummaryItems, wfConfig::set_ser, wfDB->getMaxAllowedPacketBytes, wfDB->querySingleRec
```

#### Database server problems
I tried to run the **mysql_upgrade** command as suggested by the article [Table 'performance_schema.session_variables' doesn't exist](https://stackoverflow.com/questions/31967527/table-performance-schema-session-variables-doesnt-exist). But the command would give a "Server has gone away" error. It seemed the performance_schema table in the default MySQL database had become corrupted. We were able to fix the problem by exporting all databases hosted by the MySQL server one by one using **mysqldump** command. Next we completely removed the database server using the command: **apt-get purge mariadb-client-10.1 mariadb-common mariadb-server-10.1**. This command removed the database binary files, configuration and data. Before removing the database server we took a snapshot of our GCP instance. We then reinstalled the database server and re-imported the databases from backup. Once database at a time. That fixed the problem with the database server. Next we removed all unused databases.

After that we are able to delete the Spam users from database using the WordPress plugin. The user deletion was taking a long time, so the plugin gave timeout errors. We got passed this problem by removing 2,000 users at a time. Unfortunately we could not find a similar plugin for removing the Spam BuddyPress groups. We had to simply empty all the BuddyPress database tables as described on [How to COMPLETELY delete, reset or reinstall BuddyPress, please!](https://buddypress.org/support/topic/how-to-completely-delete-reset-or-reinstall-buddypress-please/). This was not a big problem since the website did not have any real users and groups. It had some demo data that could always be imported back if needed. We could not simply redevelop the entire website since a lot of work had gone in to customizing the website theme and layout.

#### Stopping Spam with ModSecurity and ReCaptcha
We managed to reduce the number of Spam users and groups by installing and configuring ModSecurity. In my article [Integrating ModSecurity with Nginx on Debian 9](/posts/integrating-modsecurity-with-nginx-on-debian-9), I describe how to install and configure ModSecurity with our Nginx web server. We configured the ModSecurity in active mode, which means that the suspicious requests were both blocked and logged. The rate at which Spam users and groups were being created decreased a lot. But the users and groups were still being added.

The article [How to Defeat WordPress Spam Users: Identify, Delete, and Prevent Future Registrations](https://www.elegantthemes.com/blog/tips-tricks/how-to-defeat-wordpress-spam-users-identify-delete-and-prevent-future-registrations), gives excellent advice on how to detect and prevent Spam users on WordPress. The article suggested using Captcha to protect the registration and signup forms. We installed the [Google Captcha (reCAPTCHA) by BestWebSoft](https://wordpress.org/plugins/google-captcha/) plugin and used it to protect all forms on our website including the registration and signup forms.

Captcha's are commonly used to protect forms from bots and scripts. They usually require the user to answer a simple question, enter the letters shown in an image or select items shown on an image. Bots and Scripts are usually not able to pass a Captcha. However these Captcha's are inconvenient for the user and affect the usability of the website.

Google's new [ReCaptcha v3](https://www.google.com/recaptcha/intro/v3.html) solves this problem. It does not require any user interaction. It just shows an image to the user which shows at the bottom right. The image scrolls with the users scrolling. It shows a link to the privacy policy of the ReCaptcha. The ReCaptcha works by assigning a score to the user based on the users interaction with the website. This score is calculated using different factors. The maximum score that indicates a human user can be configured in the ReCaptcha settings. The ReCaptcha settings also how statistics on the form submissions that were blocked.

To use the ReCaptcha v3 with WordPress we need to first sign up on the [ReCaptcha website](https://www.google.com/recaptcha/intro/v3.html). Next we need to copy the access and secret keys. After that we can install a WordPress plugin for the ReCaptcha and configure it with the ReCaptcha keys.

#### Preventing Spam with a WordPress security plugin
The [All in one WP Security and Firewall](https://wordpress.org/plugins/all-in-one-wp-security-and-firewall) is a useful security plugin which provides several security related features. It provides a dashboard page that lists the security score of the website. The score is calculated based on configuration of the security options. The plugin allows disabling XML-RPC requests, protecting .htaccess file, wp-config file, blocking and white-listing IP addresses, showing list of users logged in and more.

Even after installing and configuring the plugin, the Spam users were still being added to the website. The only possible explanation is that the plugins installed on the website, which process the registration requests do not apply security checks to the form submission. The only solution was to completely block user registrations using **.htaccess** file. We used the following code in **.htaccess** file to achieve this:

```
&#x3C;IfModule mod_rewrite.c&#x3E;
RewriteEngine On
RewriteCond %{REQUEST_METHOD} ^POST [NC]
RewriteCond %{REQUEST_URI} ^.*/register/$
RewriteRule .* http://127.0.0.1 [L]
&#x3C;/IfModule&#x3E;
```

The above code allowed the registration page to be accessible, but when the register form was submitted, the user was redirected to the URL: http://127.0.0.1. This completely stopped the Spam user registrations. We also changed the password for all admin users. After that our problems were solved. The Spam users and groups were not being added and the CPU usage was back to normal.

### Conclusion
WordPress is an excellent platform for developing websites. However the WordPress developers and the developers of WordPress plugins and themes, need to pay more attention to security. A website may have great features, but if it is not secure, then it is useless.

Developers of websites and managers who supervise the development of the websites should work together to ensure that the website is secure and is achieving the goal for which it was developed.
