---
title: Securing your Email server
date: "2017-11-14"
template: post
draft: false
slug: "/posts/securing-your-email-server"
category: "software installation and configuration"
tags:
  - "software installation and configuration"
  - "cyber security"
description: "In this blog post I will describe my experience with installing, configuring and securing an email server. Many companies have their own email servers but one thing I noticed about in house email servers is that they are very unreliable."
---

### Introduction
In this blog post I will describe my experience with installing, configuring and securing an email server. Many companies have their own email servers but one thing I noticed about in house email servers is that they are very unreliable.

A very high percentage of emails sent to custom email addresses like user@abccompany.com cannot be delivered. The most likely cause is careless configuration of the email server. Email is a critical part of the I.T infrastructure so implementing email correctly is very important.

The email server I installed and configured is called [Postfix](http://www.postfix.org/). Postfix is one of the most popular email servers. It runs on most Unix based servers such as AIX, BSD, HP-UX, Linux, MacOS X, Solaris etc. Best of all Postfix is free and open source.

### Installing and configuring Postfix Email Server
Installing Postfix email server requires entering the command: **yum install postfix** on Centos servers. After that you have to edit the **main.cf** and **master.cf** configuration files. Postfix website has some [useful documentation](http://www.postfix.org/BASIC_CONFIGURATION_README.html) on basic configuration of Postfix.

Some of the important Postfix configuration parameters are: **myorigin, mydestination, mynetworks, relaydomains, relayhost, myhostname, mydomain and interfaces**. These parameters need to be changed in **/etc/main.cf**. After the parameters have been updated, reload Postfix configuration with this command: **postfix reload**. You should now be able to send email through your Postfix server from any device.

Installation and basic configuration of Postfix will result in a fully operational mail server. But it does not guarantee reliable error free mail delivery. To ensure that your email is delivered reliably your mail server needs to be secured.

### Securing your email server
Email relies heavily on [DNS](http://en.wikipedia.org/wiki/Domain_Name_System). Most of the techniques for securing email require changes to your domains DNS settings. Some of the steps that can be taken to secure email servers are:

* #### [Open Relay prevention](http://en.wikipedia.org/wiki/Open_mail_relay)
Open Relay prevention should be the first step for securing your mail server. An Open Relay is an email server that allows anyone to send email to anyone. Open Relays are often used by malware for sending spam. To prevent Postfix from working as an open relay configure the **relay_domains, mynetworks_style, mynetworks and relayhost** parameters in **main.cf** and reload Postfix. Use an online tool such as [Open Relay Test](https://mxtoolbox.com/diagnostic.aspx) for checking if your mail server is working as an open relay.

* #### [Spam prevention](http://en.wikipedia.org/wiki/Spamming)
Postfix has built in protection for preventing spam. The **smtpd_recipient_restrictions** and **smtpd_sender_restrictions** parameters in **main.cf** file can be used to reduce spam.
* #### [Sender Policy Framework](http://en.wikipedia.org/wiki/Sender_Policy_Framework)
  SPF is a security mechanism that restricts the mail servers that are allowed to send email for a given domain. It involves adding a TXT DNS record for your domain.

  This record specifies the IP addresses of the servers that are allowed to send email for your domain. When a mail server receives an email from your domain, it will check if your domain has a SPF DNS record. If is has a SPF record, then it will check if the server that sent the email is allowed to do so by your SPF DNS record.

* #### [Reverse DNS](http://en.wikipedia.org/wiki/Reverse_DNS_lookup)
DNS maps host names to IP addresses, while Reverse DNS does the opposite. i.e it maps IP addresses to host names. When an email server receives an email it may do a reverse lookup on the IP address of the server that sent the email. If the host name corresponding to the IP address does not match the host name of the sending email server then the email may be rejected.

* #### [DomainKeys Identified Mail](http://www.dkim.org)
  DKIM is a security mechanism that involves creating an encrypted email signature and verifying the signature. Like SPF, DKIM also relies on the DNS. To enable DKIM, the user has to first install a DKIM server. e.g on Centos that can be done with the command: **yum install opendkim**. The main steps involved in configuring Open DKIM are:

  * Generate a public/private key using the **opendkim-gen** command.
  * Specify the path of the keys in the **opendkim.conf** configuration file.
  * Give the name of the DKIM server in Postfix **main.cf** configuration file.
  * Enter the generated public key in a new TXT DNS record for your domain.
  * After that the email messages you send through your mail server will contain a DKIM header field which contains the signature of the message. The receiving email server retrieves the private key from the DNS and uses it to verify the message. If the check fails, then the message may be discarded.

* #### [Domain Based Message Authentication, Reporting and Conformance](https://en.wikipedia.org/wiki/DMARC) (DMARC)
  DMARC is a system for validating emails. It requires use of SPF and DKIM. It is the latest and most popular email validation system. It not only ensures that the received email is from a valid sender but also ensures the email has not been tampered with. It requires publishing encryption information in DNS records. DMARC allows the administrator to specify policies for handling email including policies on reporting the email.

  According to the Wikipedia entry for DMARC, in October 2013, [Mailman](http://www.gnu.org/software/mailman/features.html) added support for DMARC and set the default DMARC policy to p=reject. In 2014 Yahoo and AOL both set their default DMARC policy to p=reject.

  According to the article ["Google to adopt strictest DMARC policy to fight spam, phishing"](http://searchsecurity.techtarget.com/news/4500256096/Google-to-adopt-strictest-DMARC-policy-to-fight-spam-phishing?src=itke+disc), Google will transition to the policy p=reject in June 2016. The policy p=reject implies that email that cannot be validated by DMARC will be rejected. In March 2015 [DMARC RFC 7489](https://tools.ietf.org/html/rfc7489) was published.

### Conclusion
Secure DNS and Email settings greatly increases the reliability of your email server. They reduce the chance of your emails ending up as spam. There are some excellent on-line tools that can help you find problems with your Email and DNS configuration.

For example [dnsstuff](http://dnsstuff.com), [mxtoolbox](http://mxtoolbox.com), [emailsecuritygrader](https://www.emailsecuritygrader.com), [nmonitoring](http://www.nmonitoring.com), [centralops](http://centralops.net).

Having your own secure Email server can be very useful. You can customize it to your needs and integrate it with other services. You can achieve this goal with open source tools such as Postfix.
