---
title: Data mining with Graylog2
date: "2017-11-14"
layout: post
draft: false
path: "/posts/data-mining-with-graylog2"
tags:
  - "software installation and configuration"
description: "In my earlier post titled, Graylog2 - A scalable open source centralized logging system, I had described my experience with installing and configuring Graylog2. In this post, I will describe my experience with using the search features of Graylog2."
---

### Introduction
In my earlier post titled, [Graylog2 - A scalable open source centralized logging system](/posts/graylog2---a-scalable-open-source-centralized-logging-system), I had described my experience with installing and configuring [Graylog2](https://www.graylog.org/). In this post, I will describe my experience with using the search features of Graylog2.

### Using Graylog2 for analyzing log files
Once you have installed and configured Graylog2, you will of course want to use it for analyzing your log messages. The Graylog2 web interface has several features that can be used to analyze log files. These features include:

* #### Input
  Inputs allow us to receive log messages. Different types of inputs can be defined using the Graylog2 web interface. Graylog2 supports [many input formats](http://docs.graylog.org/en/3.0/pages/getting_started/planning.html#collection-method). In short you can send log information from almost any device or application to your Graylog2 server. This information can be analysed and viewed using the Graylog2 web interface.

  The most commonly used inputs are Syslog TCP and Syslog UDP. If a Syslog server is running on your Graylog2 server then you can use these inputs. The Syslog server can work as a remote Syslog server for other hosts on your network. So the hosts send their log files to the Syslog server running on the Graylog2 server which in turn forwards them to Graylog2.

  Syslog is a well known service for sending and receiving log messages. Syslog clients and servers are available for most operating systems. Most Linux based operating systems have build in Syslog clients.

  To configure a Syslog client to send log messages to a Syslog server all you need to do is define the IP address of a Syslog server. For example on Linux distributions running the **rsyslog** client you only need to add this line at the end of the **rsyslog.conf** file: ***.* @@ip_of_syslog_server:514**. The Syslog server should be running on your Graylog2 server. Thats all you need to do in order to send Syslog messages from your hosts to your Graylog2 server.

* #### Search
  This feature allows you to search your log messages directly. To access this feature click on the Search link at the top. Then enter your search terms in the search box. This will return all Graylog2 messages that contain the search terms.

  Even if your Graylog2 server does not have much RAM or CPU and has tens of millions of messages, your query should not take more than 2 seconds. We can also save a search and can go back to a previous search with a single click. The Graylog2 documentation has good description on the [search features](http://docs.graylog.org/en/3.0/pages/queries.html). For example the query: **source: server_name**, will return all messages sent by a server called server_name.

* #### Streams and Alerts
  A stream is a flow of messages that satisfies certain conditions. For example all messages that contain the term SSH can be placed in one stream. Several such rules can be applied to a Stream. Alerts can also be added to the Stream. An alert is triggered if a certain condition is fulfilled.

  For example an alert can be triggered if more than a certain number of messages enter a stream in a certain period of time. We can also configure responses to alerts. For example if an alert is triggered in a Stream, an email can be sent to configured users or a HTTP post notification can be sent to a web script.

  It is also possible to define outputs for a Stream. A Stream of messages can be sent out of a configured output. e.g to a certain destination IP address and port. The Graylog2 documentation has useful information about [Graylog2 alerts](http://docs.graylog.org/en/3.0/pages/streams/alerts.html) and [Graylog2 streams](http://docs.graylog.org/en/3.0/pages/streams.html).

* #### Dashboards and Widgets
  Dashboards and Widgets provide actual statistical information about your messages. We can create several Dashboards. Each Dashboard can contain several Widgets. A Widget shows statistics from a search. For example when we do a search, the results can be saved as a widget.

  It is also possible to upload Content Packs using the Graylog2 web interface. A content pack is a set of predefined Streams, Widgets and Dashboards. For example we can upload a content pack for the Nginx web server that provides us with a dashboard. The Graylog2 documentation has useful information about [Graylog2 Dashboards](http://docs.graylog.org/en/3.0/pages/dashboards.html).

* #### Extractors
  The real benefit of searching messages is when we know the structure of the message and can define fields for each message type. Once we have defined field types we can run precise search queries on the fields.

  Extractors are a feature of Graylog2 that allow us to do this. An Extractor is basically a regular expression that should match a field in a message. For each input we can define several Extractors and can perform search queries using fields defined by Extractors. Extractors can be imported and exported allowing us to share Extractors with the Graylog2 community.


### Conclusion
Graylog2 is an excellent logging system with many features. I have installed and configured [Graylog2 in a minimum setup](http://docs.graylog.org/en/3.0/pages/architecture.html#minimum-setup). Graylog2 can also be configured in a large setup that supports tens of thousands of logging devices. Such a configuration involves load balancers and message brokers but is similar in principal to the small setup.

Graylog2 provides very good community support. If you need help with some features you can always ask on the [Graylog2 forum](https://groups.google.com/forum/#!forum/graylog2). You can also post bugs to the [Graylog2 issue tracker](https://github.com/Graylog2)
