---
title: Separating source code and development environment using Docker
date: "2020-03-30"
layout: post
draft: false
path: "/posts/separating-source-code-and-development-environment-using-docker"
tags:
  - "continuous integration"
description: "A common problem faced by developers involves setting up development environments. Tools such as Docker and Vagrant allow separating source code and development environments."
---

### Introduction
A common problem faced by developers involves setting up development environments. Tools such as Docker and Vagrant allow separating source code and development environments.

These tools can be used in different ways leading to different possible workflows for developers. In this article I will describe a useful workflow based on Docker. The main benefit of this workflow is that it allows separating source code and development environment.

### Concept
The main idea behind the workflow is to keep the application source code on the host computer and mount the source code folder in the Docker container. The Docker container runs all the required services. Each development environment has its own Docker image. For example to develop Ionic applications, you need to use the Ionic Docker image. To develop LAMP based applications, you need to use the LAMP docker image.

### Usage
* [Guide for creating LAMP applications](https://github.com/nadirlc/docker-workflows/tree/master/lamp)
* [Guide for creating Ionic applications](https://github.com/nadirlc/docker-workflows/tree/master/ionic)
* [Guide for creating NodeJs applications](https://github.com/nadirlc/docker-workflows/tree/master/nodejs)

### Conclusions
Docker is a useful tool that simplifies developer workflow. It allows developers to focus on developing applications instead of managing the development environment.
