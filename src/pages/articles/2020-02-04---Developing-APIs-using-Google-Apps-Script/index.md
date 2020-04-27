---
title: Developing APIs using Google Apps Script
date: "2016-11-03"
layout: post
draft: false
path: "/posts/developing-apis-using-google-apps-script"
tags:
  - "application program interface"
description: "Google Apps Script is a platform for developing scripts for Google Products. It allows developers to interact with Google Products from JavaScript. It also allows extending the functionality of Google Products using JavaScript."
---

### Introduction
Google Apps Script is a platform for developing scripts for Google Products. It allows developers to interact with Google Products from JavaScript. It also allows extending the functionality of Google Products using JavaScript.

#### How it works
To use Google Apps Script you need to sign in to [Google App Scripts](https://script.google.com) with your Google Account. This will open a page that introduces Apps Script. Click on start scripting to continue to the script editor.

The script editor allows developers to manage their Google Apps scripts online. The editor has a useful auto complete feature that displays information on JavaScript classes.

Google Apps Script provides JavaScript classes for interacting with Google products such as Google Sheets. For example the following code returns a sheet object which represents the active Spreadsheet object in GoogleSheets:

```js
var sheet = SpreadsheetApp.getActiveSheet();
```

The script editor allows running the JavaScript code from the editor window. It also allows deploying the Apps Script project as a standalone web app or as an Android add-on or as a Chrome Store Add-On. Google Apps Script also provides an API that allows executing an Apps Script from different environments such as .Net, PHP, Java etc.

The Google Apps Script documentation provides easy to follow [5 minute tutorials](https://developers.google.com/apps-script/overview) for learning Apps Script. I was able to easily follow this [tutorial](https://developers.google.com/apps-script/overview) which allows creating a new Google Document and emailing the link.

Other uses of Apps Script include adding custom functions and user interface features to Google Apps products, interacting with external APIs and Google services and connecting with external databases such as MySQL.

Google Apps Script also supports triggers which are functions that are executed when certain events occur, such as opening a word document. We can easily create powerful APIs with Google Apps Script. These APIs can be consumed by different applications.

### Conclusion
Google Apps Script is an excellent platform for interacting with Google Products such as Google Sheets, Google Docs, Google Sites etc. It can also be used to extend the functionality of Google Apps.
