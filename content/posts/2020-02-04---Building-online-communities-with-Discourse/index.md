---
title: Building online communities with Discourse
date: "2019-04-19"
template: post
draft: false
slug: "/posts/building-online-communities-with-discourse"
category: "software installation and configuration"
tags:
  - "software installation and configuration"
description: "Discourse is a popular discussion application that allows users to discuss topics. It is one of the most popular discussion applications with lots of features and a user friendly interface. To try out the features provided by Discourse, see the Discourse Demo."
---

### Introduction
[Discourse](https://www.discourse.org) is a popular discussion application that allows users to discuss topics. It is one of the most popular discussion applications with lots of features and a user friendly interface. To try out the features provided by Discourse, see the [Discourse Demo](https://try.discourse.org/).

Discourse has a standard, business and enterprise edition. These editions are non free. There is also an open source edition that is free to use. Discourse is a useful platform for building communities. In this article, I will describe the features provided by Discourse and also how to install Discourse on a Linux server.

### Features
Discourse has the following features:

#### Main Features
The [main feature of Discourse](https://www.discourse.org/features) is a forum system. It allows users to post topics. Users can discuss the topics by posting replies. The replies can be moderated by special users. Dynamic notifications allow users to receive email alerts when someone has replied to their post or has mentioned them in a reply.

Discourse is a simple forum, in which replies flow down a single page. No need to click through pages to view replies. The context of a post can be viewed by clicking at the top and bottom of the post. The context reveals the full post conversation. Links in a post automatically expand to reveal additional information without requiring the user to click the link.

Discourse also provides [open source mobile applications](https://github.com/discourse/DiscourseMobile) for IOS and Android.

#### API, Plugins and Theme components
Discourse can be extended with [plugins](https://www.discourse.org/plugins) that enhance the basic functionality of Discourse. There are standard plugins that are provided with all hosting plans. These include a chat plugin, plugins for preventing spam, advertising, displaying mathematical notation in posts and more. The Business and Enterprise plugins include a data explorer which allows running SQL queries against databases, a Sitemap plugin, a topic voting plugin and more.

To install a Discourse plugin, we need to edit the **containers/app.yml** configuration file and enter the text: **"git clone [plugin-repository-url]"**. Next we need to rebuild the container using the command: **./launcher rebuild app**. The plugin should now show on the plugins list page. The article, [Install Plugins in Discourse](https://meta.discourse.org/t/install-plugins-in-discourse/19157) on the Discourse forums describes how to install plugins.

The [Discourse API](http://docs.discourse.org/) allows access to Discourse data. It also allows posting topics and replies, managing users and more.

Theme components enhance the functionality of themes. For example the [Social Share Component](https://meta.discourse.org/t/social-share-component/89980), allows adding custom social share links to the post share form.

The [Brand header theme component](https://meta.discourse.org/t/brand-header-theme-component/77977), allows adding a header to the Discourse with custom links. It can be used to brand the Discourse so it looks like the company website.

To install a theme component, we need to go to the theme component admin page and enter the Git Repository URL of the component. We can also choose from a list of popular theme components. Next we need to add the theme component to the current theme. This last step is very important and sometimes missed by users not familiar with Discourse.

### Integrations
Discourse provides useful [integration options](https://www.discourse.org/integrations). It supports Social Login with Facebook, LinkedIn, Twitter, Yahoo, GitHub and more. It also provides Custom Oauth2 and SAML. These allow Discourse to be used as a single sign on provider for websites.

* Discourse also supports integrations with Chat providers including Rocket Chat, Slack, MatterMost, Gitter and more. The Chat Integrations allow Discourse to notify chat providers about new posts and replies. It also allows chat transcripts to be posted in topic replies.

* Discourse has some useful Advertising and Monetizing options. The [Discourse Advertizing plugin](https://github.com/discourse/discourse-adplugin) allows displaying ads above, below and between content. It supports, Google Adsense, Google Ads, Amazon and Code Fund

* Discourse supports integration with Analytics providers such as Google Analytics, Motomo and Adobe Analytics Cloud. The Analytics integration allows Discourse admins to view user statistics.

* Discourse also integrates with Crowd Funding providers such as [Patreon](https://github.com/discourse/discourse-patreon) and [Memberful](https://memberful.com/help/third-party-integrations/discourse/). This allows Discourse to be used as a contributor only community. For example it allows Discourse website managers to sell memberships.

* The Discourse GitHub integration is provided by the [Discourse Code Review plugin](https://meta.discourse.org/t/discourse-code-review/103142). It allows 2 way integration between GitHub and Discourse. It allows new topics on Discourse to be created from GitHub Commits. It also allows Discourse replies to be posted back to GitHub. For example commits for reviews, follow ups and more.

* The [Discourse ZenDesk plugin](https://meta.discourse.org/t/discourse-zendesk-plugin/68005) integrates ZendDesk with Discourse. It allows Discourse topics to be converted to ZenDesk tickets. It also allows syncing comments between ZenDesk and Discourse.

* The [Google Perspective API plugin](https://meta.discourse.org/t/google-perspective-api-plugin/98733), allows automatically monitoring the sentiment of the community. It allows warning users before they post potentially offensive content. It also allows scanning posts for abuse. It uses [Google's Perspective Machine Learning API](https://www.perspectiveapi.com/#/)

* The [Discourse Translator Plugin](https://meta.discourse.org/t/discourse-translator/32630) allows translating posts to different languages using Google Translate or Microsoft Translator.

* The [WP Discourse Plugin](https://wordpress.org/plugins/wp-discourse/) allows integrating Discourse with WordPress. It allows automatically creating a new Discourse Discussion for new WordPress posts. It allows embedding Discourse Discussions in WordPress. It also allows using Discourse as an authentication provider for WordPress or using WordPress as the authentication provider for Discourse.

* Discourse's [Akismet Integration](https://github.com/discourse/discourse-akismet) allows stopping Spam. The [Algolia Integration](https://meta.discourse.org/t/add-algolia-search-to-your-discourse/73517) allows integrating intelligent search. Discourse's Web Hooks allow integration with hundreds of services provided by [Zapier](https://meta.discourse.org/t/discourse-webhooks-and-zapier/56753) or [IFTT](https://meta.discourse.org/t/generate-new-topics-posts-and-pm-via-ifttt/61336)

### Installation
Discourse is based on RubyOnRails platform. It uses PostgreSQL database. The recommended method for running the open source version of Discourse is with Docker. The [Discourse Installation Guide for Cloud Platforms](https://github.com/discourse/discourse/blob/master/docs/INSTALL-cloud.md) describes how to install Discourse on Digital Ocean or on personal servers. Since the Discourse is run within a Docker container, the installation guide applies to all platforms that support Docker.

We first need to install Docker on the server. See the [Docker installation guide](https://docs.docker.com/installation/) for how to install Docker on different operating systems. Next we need to create the folder: **/var/discourse** and download the Discourse Docker source code to the folder. This can be done with the commands:

```bash
mkdir /var/discourse
cd /var/discourse
git clone https://github.com/discourse/discourse_docker.git
```

Next we need to run the Discourse setup tool using the command: **./discourse-setup**. The setup script will ask for the Discourse hostname, email settings, and Lets Encrypt account email. I chose to skip the Lets Encrypt setup, since my installation of Discourse does not require https. The setup script will generate the **containers/app.yml** Docker configuration file. It will also start the boostrap. The bootstrap process builds the Discourse Docker image and downloads it to the server. It also starts a container from the downloaded image. It takes about 2-8 minutes to complete.

Once bootstrapping has completed, we should be able to access the Discourse from a browser using the host name that we mentioned during the setup. We will then be asked to register an Admin user account. Next we should be able to login to our Discourse instance using the admin user account.

#### Running Discourse with other websites
If your server hosts other websites on port 80, then you will have to edit the Discourse Docker configuration, so that the Discourse instance can be accessed from a proxy web server, such as Nginx. When accessed through a proxy server, the Discourse server will be accessed over a socket instead of a port.

This configuration is described in the article [Running other websites on the same machine as Discourse](https://meta.discourse.org/t/running-other-websites-on-the-same-machine-as-discourse/17247). For example to access Discourse through Nginx, we need to first stop the Discourse using the command: **./launcher stop app**. Next we need to change the container definition given in **containers/app.yml**. After that we need to create a Nginx virtual host. The virtual host should forward requests to the Discourse instance over a socket.

Next we can restart the Nginx server with the command: **service nginx restart**. We can then start the Discourse using the command: **launcher rebuild app**. We will then be able to access the Discourse from a browser. Other websites running on the same server should also be working.

### Conclusion
Discourse is an excellent platform for building online communities. It supports integrations with well known platforms and provides many features out of the box. Its installation is simple and well documented. Discourse is supported by a large open source community and is widely used.
