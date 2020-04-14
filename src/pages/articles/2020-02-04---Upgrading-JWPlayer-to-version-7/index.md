---
title: Upgrading JWPlayer to version 7
date: "2017-04-11"
layout: post
draft: false
path: "/posts/upgrading-jwplayer-to-version-7"
tags:
  - "html"
  - "css"
  - "javascript"
description: "JWPlayer is one of the most widely used video players. It has evolved from a simple video player into a video publishing platform. The latest version 7 of the player is a major upgrade from the last version. Websites that use the old JWPlayer 6 should upgrade to the latest version."
---

### Introduction
JWPlayer is one of the most widely used video players. It has evolved from a simple video player into a video publishing platform. The latest version 7 of the player is a major upgrade from the last version. Websites that use the old JWPlayer 6 should upgrade to the latest version.

### Changes in the new JWPlayer
The new version of JWPlayer contains many new features and has deprecated or removed many features in the old version.

The [JWPlayer upgrade guide](https://support.jwplayer.com/customer/en/portal/articles/2037989-migration-from-jw6-to-jw7) has useful documentation of the changes introduced in version 7. Briefly here are the changes in the new version:

* The JW7 does not support the old XML based skin format of JW6. It uses a CSS based format for configuring skins
* The JW7 can only be embedded on web pages with doc-type of HTML 5
* The new JW7 uses RSS feed format for its playlists. It does not support the old XML format of JW6
* The layout of playlists in JW7 is very different from JW6. The JW7 has built in support for playlists and does not support the horizontal playlist layout of JW6. The JW7 does support changing the playlist layout. By using CSS and JavaScript it is possible to design horizontal playlist layout for the JW7. I was able to design a horizontal layout for the JW7
* The JW7 interface does not render with flash. It only renders with HTML 5. It does support flash media but renders with html5
* The JW7 supports the new Analytics.js library for Google Analytics support. It no longer supports the old ga.js library
* The JW7 no longer supports Internet Explorer 8
* The JW7 requires a license for all versions of the player. A free license is available

### Conclusion
The new JW7 is a major upgrade from the old JW6. Be sure to carefully read the documentation when upgrading to the new JW7
