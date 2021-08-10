---
title: Separating source code and development environment using Docker
date: "2020-03-30"
layout: post
draft: false
path: "/posts/separating-source-code-and-development-environment-using-docker"
tags:
  - "software development"
description: "A common problem faced by developers involves setting up development environments. Tools such as Docker and Vagrant allow separating source code and development environments."
---

### Introduction
A common problem faced by developers involves setting up development environments. Tools such as Docker and Vagrant allow separating source code and development environments.

These tools can be used in different ways leading to different possible workflows for developers. In this article I will describe a useful workflow based on Docker. The main benefit of this workflow is that it allows separating source code and development environment.

### Concept
The main idea behind the workflow is to separate the application source code from the development environment. The source code is kept on the host computer and mounted in the Docker container. The Docker container runs the development environment.

Currently 3 development environments are supported. LAMP (for creating applications based on LAMP stack), NodeJs (for creating applications based on Node.js) and R-Env (for creating applications based on R Programming language)

Each development environment has its own Docker image. For example to develop Nodejs applications, you need to use the Nodejs Docker image. To develop LAMP based applications, you need to use the LAMP docker image.

The workflow for each development environment is the same. You need to first download a Docker image, then download and extract the base directory structure for the development environment. The base directory structure is provided as a zip file. See the following guides on how to develop applications for each development environment:

### Usage
* [Guide for creating LAMP applications](https://github.com/pakjiddat/docker-workflows/tree/master/lamp)
* [Guide for creating NodeJs applications](https://github.com/pakjiddat/docker-workflows/tree/master/nodejs)
* [Guide for creating R applications](https://github.com/pakjiddat/docker-workflows/tree/master/r-env)

### Conclusions
Docker is a useful tool that simplifies developer workflow. It allows developers to focus on developing applications instead of managing the development environment.
