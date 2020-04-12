---
title: Deploying WSO2 Api Manager
date: "2016-11-03"
layout: post
draft: false
path: "/posts/deploying-wso2-api-manager"
category: "application program interface"
tags:
  - "application program interface"
description: "The WSO2 API Manager is a platform for managing APIs. It allows deploying, monitoring and testing APIs. It is a complete API management platform that allows building scalable APIs."
---

### Introduction
The WSO2 API Manager is a platform for managing APIs. It allows deploying, monitoring and testing APIs. It is a complete API management platform that allows building scalable APIs.

### Installation
The WSO2 API Manager is well documented. Its installation is described in [The WSO2 API Quick Start Guide](https://docs.wso2.com/display/AM200/Quick+Start+Guide). The WSO2 API Manager can be installed in three simple steps:

First we need to install Oracle Java JDK version 1.7 or 1.8. Then we need to set the JAVA_HOME variable. After that we need to download the WSO2 API Manager. Next we need to start the WSO2 API Manager with the command:

```
{APIM_HOME}/bin/wso2server.sh
```

After that we should be able to access the WSO2 API Publisher on **https://hostname:9443/publisher**. We can login with user admin and password admin.

### Using the WSO2 API Manager
The WSO2 API Manager consists of an API Publisher and an API Store. The API publisher allows developers to publish APIs. The API store allows developers to use or subscribe to APIs.

To publish an API you have to login to the WSO2 API Publisher on **https://hostname:9443/publisher** with user name admin and password admin. After logging in click on the **Deploy Sample API** button. It deploys a sample API called PizzaShackAPI into the API Manager. The API will now show under the APIS tab.

To subscribe to the API login to the API store at: **https://hostname:9443/store** with user name admin and password admin. The newly created API is visible under APIs menu. Click the API to open its menu.

Next select a default application and an available tier and then click on Subscribe. Next click on the Production Keys tab and then click on generate keys to generate an access token to invoke the API. You have successfully subscribed to the API.

Next go back to the APIs menu and click on the PizzaShackAPI. Next click on the API console tab. Next expand the GET method and then click on the **Try it out** button. The response of the API invocation shows a list of menu items.

### Conclusion
APIs play an important role in Software Development. Web Applications in particular benefit greatly from APIs. A well built API can be consumed by applications on different platforms and can form the backbone of a multi platform application.

The WSO2 API Manager is an excellent platform for managing APIs. It is a scalable platform with useful features for managing different aspects of APIs.
