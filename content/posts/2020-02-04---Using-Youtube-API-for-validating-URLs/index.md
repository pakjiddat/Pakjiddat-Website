---
title: Using Youtube API for validating URLs
date: "2017-04-11"
template: post
draft: false
slug: "/posts/using-youtube-api-for-validating-urls"
category: "web apis"
tags:
  - "web apis"
description: "Google recently updated its Developer Console into a unified platform for accessing all of its APIs. The Google Developer Console not only provides a single location for accessing information about all Google APIs but also provides links to code samples and API SDKs. It also provides online tools for testing the APIs."
---

### Introduction
Google recently updated its Developer Console into a unified platform for accessing all of its APIs. The Google Developer Console not only provides a single location for accessing information about all Google APIs but also provides links to code samples and API SDKs. It also provides online tools for testing the APIs.

### The YouTube API
The Google YouTube API is a comprehensive API for accessing YouTube features. The API has several methods grouped into resources. For example activity, thumbnail, video, watermark etc. Some of the methods require authentication using OAuth while others can be accessed without Authentication. However all API methods require an API Key. The API Key can be downloaded from the Development Console.

The YouTube API supports 4 operations. These are list, update, delete and insert. These operations are carried out on resources. My task was to check if a movie clip is available on YouTube. The most suitable way to do this was to use the list operation on the video resource.

The YouTube API is easy to download and use. Google provides excellent [documentation on using the YouTube API](https://developers.google.com/youtube/v3/getting-started#supported-operations). It also provides Client API Libraries and code samples for several languages.

For example to access YouTube API using PHP you have to first download the Google API PHP Client from Git Hub. After that you have include the autoload.php file in your code. Next you need to instantiate an object of type Google_Service_YouTube and call the relevant function.

To check for availability of a movie clip, you can use the function listVideos of the videos property. I used the following code for checking for availability of movie clips on YouTube:

```php
/**
* Used to check if the given movie is available on youtube
*
* It uses youtube api and checks if given movie is available on youtube
* If a movie is not available then it returns false
*
* @param string $youtube_video_url the youtube movie url
*
* @return boolean $is_available indicates if the given video is available on youtube
*/
private function IsMovieAvailable($youtube_video_url) {
    /** The autoload.php file is included */
    include_once("autoload.php");
    /** Is available is set to false */
    $is_available = false;
    /** The youtube video id is extracted */
    $video_id = str_replace("https://www.youtube.com/watch?v=", "", $youtube_video_url);
    $DEVELOPER_KEY = $google_api_key;
    $client = new \Google_Client();
    $client->setDeveloperKey($DEVELOPER_KEY);
    // Define an object that will be used to make all API requests.
    $youtube = new \Google_Service_YouTube($client);
    // Call the search.list method to retrieve results matching the specified
    // query term.
    $searchResponse = $youtube->videos->listVideos('status', array('id' => $video_id));
    /** Each item in the search results is checked */
    foreach ($searchResponse['items'] as $video) {
      /** If the video id matches the given id then function returns true */
      if ($video['id'] == $video_id) {
        $is_available = true;
        break;
      }
    }
    return $is_available;
}
```

### Conclusion
The YouTube API is very detailed and supports all functions that are carried out on the YouTube website. The API is easy to use and is well documented.
