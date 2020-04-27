---
title: Creating custom playlists for MediaElementPlayer
date: "2018-03-24"
layout: post
draft: false
path: "/posts/creating-custom-playlists-for-mediaelementplayer"
tags:
  - "html"
  - "javascript"
  - "css"
description: "MediaElement Player is a HTML/CSS Video/Audio player for the web. It is based on MediaElement.js media framework library. Both player and library are available as open source and free of cost under the MIT license."
---

### Introduction
[MediaElement Player](https://github.com/mediaelement/mediaelement) is a HTML/CSS Video/Audio player for the web. It is based on [MediaElement.js](http://www.mediaelementjs.com/) media framework library. Both player and library are available as open source and free of cost under the MIT license.

MediaElement Player allows playing audio and video from different sources such as YouTube, SoundCloud, DailyMotion, Facebook, MP4, FLV and more. The player is easy to setup and configure.

For browsers that do not support html5 or certain media codecs such as H.264, MediaElement Player provides a flash based UI. The flash based UI provides the required media codecs or the missing html5 features.

MediaElement Player supports IE11+, MS Edge, Chrome, Firefox, Safari, iOS 8+ and Android 4.0+.

### Installation and configuration
To install MediaElement Player, we need to first clone the [mediaelement git repository](https://github.com/mediaelement/mediaelement). After that we need to copy the contents of the build folder to the document root.

To create a sample page showing the player, we need to include following CSS file in the head section of the html page:

```html
<link rel="stylesheet" type="text/css" href="mediaelementplayer.min.css">
```

We also need to include the following file just above the closing **body** tag:

```js
<script src="mediaelement-and-player.min.js"></script>
```

Next, we need to instantiate the video player using the following code:

```html
<div class="player">
  <video id="player1" width="640" height="360" preload="none"
     style="max-width: 100%"
     controls poster="images/big_buck_bunny.jpg" playsinline webkit-playsinline>
     <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4">
     <track src="dist/mediaelement.vtt" srclang="en" label="English" kind="subtitles" type="text/vtt">
  </video>
</div>
```

The above code will create a video player and load it with the a sample mp4 file with subtitles.

### MediaElement Player plugins (VAST, VPAID, Postroll and Google Analytics)

The MediaElement.js provides several [plugins](https://github.com/mediaelement/mediaelement-plugins). Some useful plugins include postroll, which allows displaying custom html at the end of the video and the ads plugin, which along with the vast/vpaid plugin allows displaying video ads.

VAST (Video Ad Serving Template) is a specification released by the Interactive Advertising Bureu (IAB), which describes the communication standard between video players and ad servers. For example, in order to play a video ad, the video player sends a request to an ad server, which returns the XML conforming to the VAST standard. The xml structure describes the details for displaying the video ads.

VPAID (Video player ad-serving interface definition) is a specification by the IAB which describes interactive communication between ad server and video player. It allows video players to display interactive video ads

The Google Analytics plugin allows recording video events such as play, pause and end. These events are recorded by Google Analytics and can be viewed from the Google Analytics console.

### Creating custom playlist for the MediaElement Player
We needed a html5 video player with support for YouTube playlists. MediaElement Player was the best option, but its playlist plugin did not support YouTube videos. Also the playlist layout was not good.

Fortunately the source code for the playlist demo was easy to customize. The [MediaElement Player API](https://github.com/mediaelement/mediaelement/blob/master/docs/api.md) describes the different JavaScript functions for controlling the player and also player configuration options. I came across a couple of issues while using the player.

The first issue was that the player did not allow [setting the YouTube configuration dynamically](https://github.com/mediaelement/mediaelement-plugins/issues/117).

Second issue was a [full screen error when using the playlist plugin](https://github.com/mediaelement/mediaelement/issues/2496). The error was that in the playlist demo sample, when the player is in full screen mode and the big play button is clicked, the player resizes without properly exiting the full screen mode.

We used the playlist plugin to develop our own YouTube playlist. See the [YouTube Playlist article](/posts/youtube-playlist) for details on how the YouTube playlist works.

We felt that the YouTube Playlist project could benefit from the open source community's support. We therefore decided to publish the source code for the project on [GitHub](https://github.com/pakjiddat/youtube-playlist).

### Conclusion
MediaElement Player is a useful video and audio player for the web. It is being actively developed and is supported by a large open source community
