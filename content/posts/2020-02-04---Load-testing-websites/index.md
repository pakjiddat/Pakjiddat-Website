---
title: Load testing websites using Apache Bench, Apache JMeter and Loader.io
date: "2017-04-11"
template: post
draft: false
slug: "/posts/load-testing-websites-using-apache-bench--apache-jmeter-and-loader-io"
category: "software testing"
tags:
  - "software testing"
description: "Load testing a website refers to the process of testing the number of concurrent users that the website is able to support. Whether or not your website attracts lots of visitors, it is useful to know how many users the website can support."
---

### Introduction
Load testing a website refers to the process of testing the number of concurrent users that the website is able to support. Whether or not your website attracts lots of visitors, it is useful to know how many users the website can support.

Recently I had the opportunity of load testing a website. The tools I used for load testing the website were: [Apache Bench](https://httpd.apache.org/docs/2.2/programs/ab.html), [Apache JMeter](http://jmeter.apache.org/index.html) and the online service [loader.io](https://loader.io).

### Benefits of Load Testing
Website load testing is a very useful practice that gives you an idea of how many users your website can support without experiencing a decrease in performance. If your website is getting a lot of visitors and its performance is starting to degrade, then you may want to improve its performance by using HTTP caching or upgrade the web server.

If you do not have control over the hosting of your website, then you can upgrade your hosting plan or change your hosting provider. In most cases efficient use of HTTP caching can fix most website performance problems.

### Apache Bench

#### Using Apache Bench
[Apache Bench](https://httpd.apache.org/docs/2.2/programs/ab.html) is a command line tool for measuring performance of the [Apache webserver](http://www.apache.org/). It is bundled with the standard Apache distribution and is run using the command **ab**. On Ubuntu in order to use the **ab** command, you need to install **apache-utils**.

Apache Bench is single threaded which means it only uses one operating system thread so it can be a bit slow at times. The following command load tests the website http://dev.example.com using Apache Bench:

```bash
ab -n 500 -c 100 http://dev.example.com
```

The command sends 500 requests to the web server in total with a concurrency of 100.

The result showed that the average time taken for a request was just 25 seconds for a batch of 100 requests, which is just 0.25 sec per http request. The ab utility only fetches the main page and not the resources within the page such as images, CSS, JavaScript files etc.

#### Generating graphs from output of Apache Bench
We can export the results of ab command to a format suitable for [GNUPlot](http://www.gnuplot.info/) using **-g outputfile_name**. This can give us a nice graph showing how the website response time changes with the number of requests. We can use the online version of [GNUPlot](http://gnuplot.respawned.com/) for quickly creating a graph of website load times. This is described in the article titled ["Apache Bench and Gnuplot: you are probably doing it wrong"](http://www.bradlanders.com/2013/04/15/apache-bench-and-gnuplot-youre-probably-doing-it-wrong/).

### Loader.io
[loader.io](https://loader.io) is an excellent online load testing service that has a great free plan. Their free plan allows 10,000 clients per test but only 1 target host. The free plan also allows scheduling test result execution and notification of test results using web hooks. I ran a test on loader.io for a website and it gave the following results:

### Apache JMeter
[Apache Jmeter](http://jmeter.apache.org/usermanual/get-started.html) is a well known load testing tool. It is used by most online load testing service providers. The Apache Jmeter tool is written in Java and has lots of options. It can actually be used to load test any application over a TCP/UDP port such as DNS, LDAP, SMTP, Web servers etc.

It is usually run from a GUI but can also be run from the command line. The [Apache Jmeter user manual](http://jmeter.apache.org/usermanual/) is an excellent resource for getting started.

To start using Apache Jmeter, you have to first download it from the [Apache JMeter site](http://jmeter.apache.org/download_jmeter.cgi). Once you have downloaded the file, extract it to a folder and if you are on Windows run the file jmeter.bat or jmeter.sh if you are on Linux. This will start the Jmeter GUI.

To start testing a website, create a new test plan using the ["Building a Web Test Plan" template](http://jmeter.apache.org/usermanual/build-web-test-plan.html). This creates a new test plan with some pre configured components. You have to edit some of the values such as the name of your web server and the number of users to use during testing.

JMeter allows you to easily change the graph component and the user parameters. The "Graph Results" listener that is part of the test plan does not give a very nice looking graph. To display a better looking graph you just have to add a new listener component such as "Aggregate Graph".

### Conclusion
Apache Bench, Loader.io and Apache JMeter are all excellent options for load testing your website. All three have support for integration with third party frameworks such as Jenkins Continuous Integration Server.

Load testing is a very useful method for testing your website. It gives us a very important performance metric which is the variation of web page load time with number of users.
