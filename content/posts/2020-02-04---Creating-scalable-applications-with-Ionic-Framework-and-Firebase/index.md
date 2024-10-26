---
title: Creating scalable applications with Ionic Framework and Firebase
date: "2018-09-25"
template: post
draft: false
slug: "/posts/creating-scalable-applications-with-ionic-framework-and-firebase"
category: "mobile development"
tags:
  - "mobile development"
description: "The Ionic Framework allows developing applications for web browsers, desktops and mobile devices. Ionic Framework applications are written in HTML, CSS and JavaScript. Apps can be generated from a single code base, which can be accessed from web browsers, Android, IOS and Windows based devices."
---

### Introduction
The [Ionic Framework](https://ionicframework.com) allows developing applications for web browsers, desktops and mobile devices. Ionic Framework applications are written in HTML, CSS and JavaScript. Apps can be generated from a single code base, which can be accessed from web browsers, Android, IOS and Windows based devices.

The Ionic Framework essentially is a front-end framework. The back-end for the apps can be implemented using [Firebase](https://firebase.google.com) or a server side programming language. The [core concepts](https://beta.ionicframework.com/docs/intro/concepts) of the Ionic Framework describe how the framework works.

### Difference between native, hybrid and mobile apps
The current version of the Ionic Framework, which is [version 4 Beta](https://beta.ionicframework.com/docs/intro) supports several JavaScript frameworks in addition to AngularJs, such as ReactJs and Vue.

It essentially does not depend on any particular framework. It also uses [Apache Cordova](https://en.wikipedia.org/wiki/Apache_Cordova) for generating hybrid apps from a JavaScript, HTML and CSS code base. Hybrid apps may be regarded as a hybrid between native apps and mobile apps.

Native apps are written in platform specific programming language such as Objective-C for IOS and Java for Android. Native apps have direct access to operating system libraries and tend to have better performance than hybrid and mobile apps.

Mobile apps are websites that are optimized for viewing on mobile devices. Hybrid apps on the other hand are written in platform independent JavaScript, HTML and CSS. Hybrid apps run inside a container called a Web View and have access by means of an Application Programming Interface (API) to device features such as camera, GPS, address book etc.

### Installation
The Ionic Framework is a plugin for Node Js. It can be installed with the command: **npm install -g ionic**. The **-g** flag installs the package globally for all users. To enable support for developing hybrid apps, the Cordova NPM package needs to be installed with the command: **npm install -g cordova**.

[Ionic Framework documentation](https://ionicframework.com/docs) describes how to get started with the Ionic Framework. To create an Ionic application, we need to enter the command: **ionic start MyApp blank**. This will create a new Ionic application in the current folder with the blank template. Supported templates are super, tutorial, blank, tabs and sidemenu.

### Running Ionic Applications

The Ionic command line interface (CLI) has several options that can be viewed with: **ionic help**. To run the new app from a browser simply enter the command: **ionic serve**. This will start a web server that listens on port 8100. The command actually performs build tasks such as running Web Pack, trans-piling Type Script to JavaScript and converting SASS files to CSS.

[Web Pack](https://en.wikipedia.org/wiki/Webpack) is used to bundle JavaScript files for use in browsers. [Syntactically awesome style-sheets (SASS)](https://en.wikipedia.org/wiki/Sass_(stylesheet_language)) is a script language that is compiled to Cascading Style Sheet (CSS). Ionic framework applications usually use SASS files for styling pages and Type Script for the front end programming. Converting code from one programming language to another is called trans-piling. For example converting Type Script to JavaScript.

If you have a production ready app then you may want to run it so the app uses compressed CSS and JavaScript and runs quickly. The following command line minifies the CSS and JavaScript files used by the app. It also disables live reloading of the app and causes the web server to run at port 9100. Live reloading allows an app to be modified without restarting the web server.

```
--mifyjs --minifycss --optimizejs --no-livereload --port=9100
```

### Folder structure of an Ionic App
The **./src** folder contains the source code for our application. It has a file **index.html** which is the main entry point for our app. We do not need to edit this file. The files we need to edit are the Type Script files that end with **".ts"**. For example the file:**src/app/app.module.ts** is the entry point for the app. This file defines the root module which controls the application. The following example code defines the root module:

```js
@NgModule({
  declarations: [MyApp, HelloIonicPage, ItemDetailsPage, ListPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HelloIonicPage, ItemDetailsPage, ListPage],
  providers: []
})
export class AppModule {}
```

The file **./src/app/app.component.ts** declares the root module and the HTML template where the root module will be rendered.

When we run **ionic serve**, it creates a www directory containing the trans-piled JavaScript and CSS files. The contents of the www directory are served while the app is running.

### Firebase
[Firebase](https://firebase.google.com/) is a platform provided by Google, which allows scaling apps to billions of users. It essentially provides a set of services for developing the back-end of mobile apps. It supports major mobile platforms: Android, IOS, Web as well as the Unity and C++ platforms.

Firebase provides the following services:

* **[Cloud Firestore](https://firebase.google.com/products/firestore/)**. Provides a NoSQL database for storing data.
* **[ML Kit](https://firebase.google.com/products/ml-kit/)**. Provides APIs for common Machine Learning (ML) related tasks such as recognizing text, detecting faces, scanning barcodes, labeling images and recognizing landmarks
* **[Cloud Functions](https://firebase.google.com/products/functions/)**. Allows code to be executed in response to events such as new user signup, conversion related events in analytics, changes to data in real time database etc. The user specifies the code to execute in response to events. The code is run as single purpose JavaScript functions in a secure Node Js environment. The user does not have to bother with server provisioning
* **[Authentication](https://firebase.google.com/products/auth/)**. Firebase Authentication allows easily building secure authentication systems. It provides a flexible Drop-In user interface for adding authentication related features. It supports authentication providers such as email/password, Google, Twitter, Facebook, GitHub, Phone Auth and more.

Firebase provides several other services such as **Hosting, Cloud Storage, Realtime Database, Crashlytics, Performance Monitoring, Test Lab, In-App Messaging, Google Analytics, Predictions, A/B Testing, Cloud Messaging, Remote Config, Dynamic Links and App Indexing**

### Conclusion
The Ionic Framework is a useful platform for building cross platform applications. Combined with Firebase, it allows developing scalable apps easily and quickly.
