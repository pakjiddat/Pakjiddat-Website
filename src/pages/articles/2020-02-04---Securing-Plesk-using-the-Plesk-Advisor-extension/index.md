---
title: Securing Plesk using the Plesk Advisor extension
date: "2018-10-19"
layout: post
draft: false
path: "/posts/securing-plesk-using-the-plesk-advisor-extension"
tags:
  - "software installation and configuration"
description: "Plesk is a useful control panel for Windows and Linux based servers. It is used for managing web hosts, users, server security, email and more."
---

### Introduction
Plesk is a useful control panel for Windows and Linux based servers. It is used for managing web hosts, users, server security, email and more. Plesk is a commercial application with different pricing plans starting at 9.16 USD per month. Users can try Plesk for free for up to 2 weeks. The [Plesk website](https://www.plesk.com/features/) describes the different Plesk features.

Recently I had the opportunity of securing a Plesk based server. In this article I will describe my experience with configuring the following Plesk security related features: **"Plesk Watchdog"**, **"Plesk Advisor"**, **"Plesk Server Health Monitor"**, **"HTTP2"**, **"Fail2Ban"** and **"ModSecurity"**.

### Securing Plesk
A server running Plesk should be configured from within Plesk. Installing custom scripts and applications outside Plesk is possible, but not recommended as it can conflict with scripts used by Plesk. Plesk has a number of built in features that can be used to secure the server. It also provides several [extensions](https://www.plesk.com/extensions/) or addons for configuring server security. Following are some useful features/addons that can be configured:


#### Plesk Watchdog
The [Plesk Watchdog](https://docs.plesk.com/en-US/12.5/deployment-guide/appendix-g-configuring-additional-plesk-components-linux/watchdog-system-monitoring-component.70443/) is an extension for Plesk.

It can be installed by clicking on Extensions on the left menu and then selecting Watch Dog. The Plesk Watchdog allows scanning the server for malware, viruses and rootkits. It allows monitoring hard disk usage as well as different services managed by Plesk.

The Plesk Watchdog uses the [Monit](https://mmonit.com/monit/) tool for monitoring services. It scans for viruses and malware using [RKHunter](https://en.wikipedia.org/wiki/Rkhunter) tool. The Plesk Watchdog allows monitoring services such as Nginx, Apache web server, Postfix SMTP server, MySQL server and all other extensions that can be managed from Plesk.

Each service is monitored at an interval of 5 minutes by default. If a service is found to be stopped, then the Plesk Watchdog will start the service and will send an email to the server administrator. The user can configure the monitoring interval as well as disable service monitoring.

The commands for starting and stopping each service can also be configured. This option was very useful, because we had installed the latest version of PHP FPM and the Plesk Watchdog was using incorrect commands for monitoring the service. Fortunately it was easy to change the monitoring commands.

The Plesk Watchdog also allows monitoring the free disk space. It allows running a custom command if the free disk usage or number of files exceeds a certain threshold value.

The Plesk Watchdog also allows scanning the server for malware, root kits, Trojans and other malicious software. It uses the Rkhunter tool for this purpose. The security scan can be configured to run daily, weekly, monthly or disabled. After the scan completes a summary report is sent to the configured email address. A summary report is also sent containing overview of the security scan and service status. This report can also be sent daily, weekly, monthly or disabled. The Plesk Watchdog also shows statistics containing CPU and RAM usage by different services.

#### Plesk Advisor
The [Plesk Advisor](https://www.plesk.com/extensions/advisor/) is a useful tool that suggests options for improving server security and performance. The suggestions are basically Plesk extensions or features that can be used to improve the server security and performance.

The Plesk Advisor also provides an overall score for the server which indicates how well the server security and performance has been configured. The higher the score, the more secure the server.

The suggestions given by the Plesk Advisor can be enabled or disabled with a single click. Some of the recommendations by the Plesk Advisor include:

* **Secure Websites With SSL/TLS Certificates**. It allows enabling/disabling SSL certificates for websites.
* **Configure Scheduled Backups** allows configuring backup of databases, domains and configuration.
* **Configure ModSecurity & Fail2ban** allows enabling/disabling the built in Plesk features Mod Security and Fail2Ban.
* **Configure the Plesk Firewall** allows controlling which users and IP addresses have access to Plesk.
* **Disallow Weak Passwords** allows disabling the use of weak passwords.
* **Enable HTTP/2** allows enabling/disabling HTTP2
* **Switch On Automatic Updates** allows the operating system updates to be installed automatically.

#### Plesk Server Health Monitor
The [Plesk Server Health Monitor](https://docs.plesk.com/en-US/onyx/administrator-guide/statistics-and-monitoring/server-health-monitor/tracking-server-health.68888/) allows us to monitor CPU, Hard Disk and Memory usage. It is available as a Plesk component and can be installed by going to **"Tools and Settings"** and then **"Updates"**.

The Plesk Server Health Monitor allows us to monitor the CPU usage by each Plesk service. It provides current values as well as trend values in the form of graphs. For example it provides graphs that show how much CPU Apache web server has used. The CPU usage can be viewed for the last 3 hours, 1 day, 3 days and 1 week. Some of the monitored services are MySQL, PostFix and Nginx.

The Plesk Server Health Monitor also allows us to monitor disk usage and current memory usage. It provides details on overall CPU usage such as average load, number of processes, zombie processes etc. The Plesk Server Health Monitor also allows us to monitor the current number of network packets sent and received per second. A detailed graph shows the trend over different time intervals.

Emails notifications and alarms can be configured for the parameters being monitored. To configure emails notifications and alarms, we need to first click on "Download Configuration File". This will download the configuration file for the Plesk Server Health Monitor.

The configuration file is a XML file that allows setting threshold values and email notifications for each parameter being monitored, such as CPU usage by Apache web server.

There are two types of alarms that can be configured. A yellow alarm indicating that resource usage is high and a red alarm indicating that the resource usage has reached a limit.

The Plesk Server Health Monitor does not automatically detect changes in server hardware. The changes are detected only once when the component is first installed. In case of hardware changes such as increase in RAM, the Plesk Server Health Monitor configuration needs to be updated by clicking on **"Detect Hardware Changes"**.

#### HTTP2 configuration
[HTTP2](https://en.wikipedia.org/wiki/HTTP/2) is a major version of the HTTP network protocol. It followed HTTP/1.1 protocol. It is based on the experimental [SPDY](https://en.wikipedia.org/wiki/SPDY) protocol originally developed by Google. As of October 2018, 30.5% of the top 10 million websites supported HTTP/2. HTTP/2 is supported by most major browsers.

Its main features are improved performance and security. Performance improvement is achieved by several improvements such as header compression, multiplexing several requests and responses over a single TCP connection and server push.

HTTP/2 provides improved security by requiring the TCP connection to be encrypted. Although HTTP2 protocol supports unencrypted connections, all major browsers only support HTTP2 over SSL/TLS connection. TLS 1.2 is the recommended SSL protocol for HTTP2 connections.

[HTTP/2 Server Push](https://en.wikipedia.org/wiki/HTTP/2_Server_Push) allows the server to send resources to the client without waiting for the client to request the resources.

For example if a browser sends a request for a web page index.html containing style.css and script.js, the server which implements HTTP/2 Server Push will send the style.css and script.js files to the browser along with the contents of index.html. This greatly reduces the web page loading time. HTTP/2 Server Push is supported by Nginx version 1.13.9 onwards and Apache version 2.4.17 onwards. HTTP/2 support for Apache is provided by the mod_http2 module.

[Plesk support for HTTP2 protocol](https://docs.plesk.com/en-US/onyx/administrator-guide/web-servers/apache-and-nginx-web-servers-linux/http2-support-in-plesk.76461/) requires the latest version of Nginx web server.

Once Nginx has been installed, HTTP2 support can be enabled with the command: **plesk bin http2_pref enable**. To test if HTTP2 has been enabled for your website, go to the website: [https://tools.keycdn.com/http2-test](https://tools.keycdn.com/http2-test) and enter the URL of your website. Also the Chrome Developers Toolbox has a column called protocol that indicates the HTTP protocol used to load each resource.

#### Fail2Ban
[Fail2Ban](https://en.wikipedia.org/wiki/Fail2ban) is a command line tool for banning suspicious IP addresses. It scans log files such as web server and ssh server log files and detects abnormal user activity such as too many failed login attempts or several web page error messages. It then updates the system firewall such as Iptables and prevents further access from the IP address for a certain time period.

Plesk provides protection against brute force attacks using the [Fail2Ban component](https://docs.plesk.com/en-US/onyx/administrator-guide/server-administration/protection-against-brute-force-attacks-fail2ban.73381/).

The component first has to be installed. Next it has to be enabled, by going to **Tools & Settings**, then **IP Address Banning (Fail2Ban)** and then **Enable intrusion detection**. Next select the **Enable intrusion detection** checkbox. This will activate the Fail2Ban service.

The settings page for Fail2Ban allows us to set the **IP address ban period**, **Time interval for detection of subsequent attacks** and the **Number of failures before the IP address is banned**. The **IP address ban period**, is the time after which a banned IP address is automatically unbanned.

The **Time interval for detection of subsequent attacks** is the time interval during which the number of unwanted actions from an IP address are counted. The **Number of failures before the IP address is banned** is the number of unwanted actions after which the IP address is banned

The Plesk Fail2Ban component is based on the concept on Jails. A Jail is a set of rules covering an individual scenario for example SSH. A Jail is a combination of a filter and one or more actions. A filter is a regular expression that is applied to log files in order to determine suspicious activity.

Actions are commands that are executed when the filter catches a suspicious IP address. A jail can have a status of active or inactive. An inactive jail does not ban IP addresses. There are pre-configured jails for all Plesk services such as web server, ftp server etc. Jails can be managed from the Jails tab.

The **Banned IP Addresses** tab shows the list of IP addresses that have been banned by the Fail2Ban Jails. It allows un-banning IP addresses or marking them as trusted. The **Trusted IP Addresses** tab shows the list of IP addresses that will not be banned.

#### ModSecurity
[ModSecurity](https://en.wikipedia.org/wiki/ModSecurity) is an open source cross platform Web Application Firewall. It checks all requests to the web server and responses from the web server against a set of rules.

If the check passes, the request is allowed. If it fails predefined action is taken. ModSecurity can be deployed either as a web server module or as a proxy server to a web server. It supports the major web servers which are Microsoft IIS, Apache and Nginx.

[The Web Application Firewall (ModSecurity)](https://docs.plesk.com/en-US/onyx/administrator-guide/server-administration/web-application-firewall-modsecurity.73383/) for Plesk is available as a Plesk component. Once it has been installed, it needs to be enabled by going to **Tools & Settings**, then **Web Application Firewall (ModSecurity)**.

Next set the **Web application firewall mode** to **On**. This will cause the Plesk ModSecurity to match each incoming request and its response against a set of rules. If the check succeeds, the request is allowed.

If it fails, the action is logged, a notification email is sent and the HTTP response is provided with an error status code. The Plesk ModSecurity mode can also be set to **Off** or to **Detection only**. When in detection mode, the action taken in case of failure is to simply log the request.

ModSecurity for Plesk uses the **Atomic Basic ModSecurity** rule set as the default set of rules for matching requests and responses. This can be changed to other rule sets such as **OWASP ModSecurity**, **Advanced ModSecurity Rules by Atomicorp**, **Comodo ModSecurity** or a custom rule set. Some of the rule sets require a subscription and are more strict and suitable for certain cases. The rule sets can be configured to update daily, weekly or monthly.

The rule sets can be configured to apply to the HTTP URI and parts of the HTTP header, the HTTP URI, header and HTTP POST request payload or the entire HTTP traffic including the HTTP response.

The ModSecurity audit log contains events logged by the ModSecurity. For example suspicious HTTP requests that fail to pass a rule. A security rule may be switched off, by entering the **Security Rule ID**, **Tag** or **Regular Expression**. This might be useful in case a HTTP request was incorrectly blocked. ModSecurity may be configured server wide for all domains, or for each domain.

### Conclusion
Server security is an important task carried out by system administrators. Online applications are increasing in popularity. It is important that the servers that deliver these applications are properly secured.
