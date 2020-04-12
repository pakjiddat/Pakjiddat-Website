---
title: Designing APIs
date: "2016-11-04"
layout: post
draft: false
path: "/posts/designing-apis"
category: "application program interface"
tags:
  - "application program interface"
description: "Application Programming Interfaces (APIs) may be regarded as the building blocks of software applications. APIs provide a subset of the functionality of a system to an application. An API may be regarded as a set of libraries that allows an application to be used by multiple applications."
---

Application Programming Interfaces (APIs) may be regarded as the building blocks of software applications. APIs provide a subset of the functionality of a system to an application. An API may be regarded as a set of libraries that allows an application to be used by multiple applications.

Since APIs can be used by multiple applications, it is import for APIs to be well written and concise. APIs should be carefully planned. The following points may be considered when designing APIs:

* #### **Authenticating**
The API Your API should be called by valid users that are authorized and authenticated.
* #### **Caching API results**
Your API should cache the results of API call. This will allow your API to handle requests more quickly, and it will be able to handle more requests per second. Memcache can be used to cache results of API call.
* #### **The API architecture**
RESTFul APIs have less overhead as compared to SOAP based APIs. SOAP based APIs have better support for authentication. They are also better structured then RESTFul APIs.
* #### **API documentation**
Your API should be well documented and easy for users to understand.
* #### **API scope**
Your API should have a well defined scope. For example will it be used over the internet as a public API or will it be used as private API inside corporate intranet.
* #### **Device support**
When designing your API you should keep in mind the devices that will consume your API. For example smart phones, desktop application, browser based application, server application etc
* #### **API output format**
When designing your API you should keep in mind the format of the output. For example will the output contain user interface related data or just plain data. One popular approach is known as separation of concerns [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns). For example separating the backend and frontend logic.
* #### **Rate limiting and throttling**
Your API should implement rate limiting and throttling to prevent overuse and misuse of the API.
* #### **API versioning and backward compatibility**
Your API should be carefully versioned. For example if you update your API, then the new version of your API should support API clients that use an older version of your API. Your API should continue to support the old API clients until all the API clients have migrated to the new version of your API.
* #### **API pricing and monitoring**
The usage of your API should be monitored, so you know who is using your API and how it is being used. You may also charge users for using your API.
* #### **Metric for success**
You should also decide which metric to use for measuring the success of your API. For example number of API calls per second or monitory earnings from your API. Activities involved in the development of your API, such as research, publication of articles, open source code, participation in online forums etc may also be considered when determining the success of your API.
* #### **API Response time**
Your API should have a low response time. It should be possible to monitor the API response time and notify the developer if the API response time above average.
* #### **API Error Handling**
In case of errors, your API should return a suitable message to the API client. It should also send notification email to the API developer.
* #### **Estimation of cost involved**
You should also calculate the cost of developing and deploying your API. For example how much time it will take you to produce a usable version of your API. How much of your development time the API takes.
* #### **Updating your API**
You should also decide how often to update your API. For example how often should new features be added. You should also keep in mind the backward compatibility of your API, so updating your API should not negatively affect your clients.
