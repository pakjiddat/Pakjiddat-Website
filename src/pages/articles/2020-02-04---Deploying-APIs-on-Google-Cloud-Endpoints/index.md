---
title: Deploying APIs on Google Cloud Endpoints
date: "2016-11-03"
layout: post
draft: false
path: "/posts/deploying-apis-on-google-cloud-endpoints"
tags:
  - "web apis"
description: "Google Cloud Endpoint is a service that allows developing, deploying and managing APIs on Google Cloud. This article describes how to get started with Google Cloud Endpoint."
---

### Introduction
Google Cloud Endpoint is a service that allows developing, deploying and managing APIs on Google Cloud. This article describes how to get started with Google Cloud Endpoint.

Cloud Endpoint is very well documented. Quick start guides are available which describe how to use Cloud Endpoint with different Cloud Backends such as App Engine, Compute Engine and Container Engine.

I had followed the [Quickstart for Endpoints on Compute Engine](https://cloud.google.com/endpoints/docs/quickstart-compute-engine). It describes how to deploy a sample API on a Compute instance. The sample API is based on Python language but can easily be substituted for other programming languages such as PHP or Java.

### Deploying the sample API to Cloud Endpoint
Deploying a sample API to Cloud Endpoints requires Google Cloud SDK, a running Compute instance and a proxy server based on Nginx called Extensible Service Proxy (ESP). Deployment of the sample API requires several steps and is described below:

#### Configuring the pre-requisites

* Create a new [Cloud Platform Console Project](https://console.cloud.google.com/project) or select an existing project. Note down the project id. Enable billing for this project
* Install Curl. Then [Download and install the Google Cloud SDK](https://cloud.google.com/sdk/docs/quickstarts). These two steps should be done on both main server and your local development machine

* Update the Cloud SDK, install the endpoint components and set the default project id to your **[YOUR_PROJECT_ID]**. Use following code:

  ```bash
  gcloud components update
  gcloud components install beta
  gcloud config set project [YOUR_PROJECT_ID]
  ```

* Clone the sample API from the source code repository with the following command:

  ```bash
  git clone https://github.com/GoogleCloudPlatform/python-docs-samples
  ```

* Change to the directory that contains the sample code. Use following command:

  ```bash
  cd python-docs-samples/appengine/flexible/endpoints
  ```

* In **swagger.yaml** file, replace all instances of **YOUR_PROJECT_ID** with your project id. Swagger is an open standard for specifying APIs. Swagger is now known as [Open API Specification](https://openapis.org/specification)

#### Deploying the API

To deploy the API use following command: **gcloud beta service-management deploy swagger.yaml**. This command will return several lines including the server name and service version.

#### Create Compute instance
Next create a new Compute instance or use an existing instance. On the settings page for the instance configure the meta data. Add a new meta data item with key: **endpoints-service-name** and value: **YOUR-PROJECT-ID.appspot.com**. Next add another meta data item with key: **endpoints-service-version** and value same as the service version returned by the API deployment command.

#### Running the sample API
To run the sample API, on your local machine set the zone for your project with the command:

```bash
gcloud config set compute/zone [YOUR-INSTANCE-ZONE]
```

In the API directory **python-docs-samples/appengine/flexible/endpoints**, copy the API files from your local machine to your server. Use following command:

```bash
gcloud compute copy-files * [INSTANCE-NAME]:/full-path-to-sample-api-files
```

Next connect to your instance with the command:

```bash
gcloud compute ssh [INSTANCE-NAME]
```

Next set up a Python virtual environment on your main server using the commands:

```bash
sudo easy_install virtualenv
virtualenv
```

These commands should be run on your main server in the same folder that contains the API code.

Next install the requirements of the API sample using the command:

```bash
./bin/pip install -r requirements.txt
```

After that start the gunicorn web server with the command:

```bash
./bin/gunicorn -b :8081 main:app
```

This will start the API server on port 8081. Next we need to install and configure the Extensible Service Proxy (ESP).

#### Installing and configuring the Extensible Service Proxy (ESP)
The ESP is a proxy server based on Nginx. It sits in front of your API back-end and provides Authentication, API Key Management, Logging and other Endpoint Management features.

To install the ESP run the command:

```bash
sudo apt-get install endpoints-runtime
```

on your main server. If the package cannot be installed then you need to add the correct package repository to your package manager. See the quick start guide for more information.

Next in /etc/default/nginx set the port number to 80 and restart the ESP with the command:

```bash
service nginx restart
```

#### Sending requests to the sample API
To send requests to the API, create an API key on the [API credentials page](https://console.cloud.google.com/apis/credentials)

Next make a HTTP request to the API using the command:

```bash
curl -d '{"message":"hello world"}' -H "content-type:application/json" http://[IP_ADDRESS]:80/echo?key=${ENDPOINTS_KEY}
```

Replace IP_ADDRESS with the external IP address of your instance. Replace ENDPOINTS_KEY with your API key.

Next view the [activity graphs](https://console.cloud.google.com/endpoints) for your API in the endpoints page.

#### Updating the sample API
If you have made changes to your API, then you need to redeploy the API. To redeploy the API, make changes to your API source code and then edit the **swagger.yaml** file to reflect the changes. Then redeploy the API with the command:

```bash
gcloud beta service-management deploy swagger.yaml
```

Next the meta data values for your compute instance need to be updated with the correct API service version number.

If you have deleted your API by mistake like me, and you want to restore it, then you need to run the command:

```bash
gcurl -X DELETE https://servicemanagement.googleapis.com/v1/services/endpointsapis.appspot.com
```

**gcurl** is simply the curl command with authentication variables for Google Cloud. It is setup as a bash command. To setup gcurl we need to first follow the [getting started guide for service management](https://cloud.google.com/service-management/getting-started). The configuration of gcurl is described in the installation of [oauth2l](https://github.com/google/oauth2l). I had run into this problem and had to post [undelete a Google Service API](http://stackoverflow.com/questions/39846232/how-to-undelete-a-google-api-service) on Stackoverflow.

### Conclusion
Google Cloud Endpoints is a complete platform for developing, deploying and monitoring APIs. It allows deploying scalable, well managed APIs.
