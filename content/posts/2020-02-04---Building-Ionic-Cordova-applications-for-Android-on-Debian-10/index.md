---
title: Building Ionic Cordova applications for Android on Debian 10
date: "2019-11-27"
template: post
draft: false
slug: "/posts/building-ionic-cordova-applications-for-android-on-debian-10"
category: "mobile development"
tags:
  - "mobile development"
description: "Cordova is a platform that allows development of Mobile applications using HTML, CSS and JavaScript. These applications can be run on all major mobile platforms, which are Android, IOS and Windows Phone."
---

### Introduction
[Cordova](https://cordova.apache.org/docs/en/latest/guide/platforms/android/) is a platform that allows development of Mobile applications using HTML, CSS and JavaScript. These applications can be run on all major mobile platforms, which are Android, IOS and Windows Phone.

The Cordova platform essentially creates a native application for the configured platform. The native application uses a WebView to run the application. A WebView is a browser run-time component for native mobile applications. A WebView runs HTML, CSS and JavaScript code just like a desktop browser.

Applications created using Cordova are termed as hybrid mobile applications, because they are a combination or hybrid of native applications and browser based applications. Native applications are applications that are installed on a mobile device. Browser based applications are applications that are accessed using a mobile device's web browser

The Android emulator is an application that allows running different types of Android based devices in a simulated environment. The emulator works just like the actual device. It allows debugging and testing Android applications.

The Cordova platform allows building and deploying applications written in HTML, CSS and JavaScript to real mobile devices or emulators. Each platform such as Android or IOS has its own emulator. Cordvoa also provides a live reloading feature. This feature allows automatically updating an application in a real device or emulator once it has been updated by the user. This saves the developer a lot of time and effort.

Cordova applications can be easily tested on emulators. The emulator needs to be installed and configured for the required platform. The emulator for IOS platform is only available on IOS devices.

For the Android platform installing the emulator requires installing the Android Studio. On Linux based systems, the Android Studio requires a graphical desktop environment such as Gnome or KDE. The Android studio has many features and may not be needed during development of the Cordova application. In this article I will describe how to run an Ionic Cordova application on an Android emulator without installing Android Studio.

### Installing the Cordova Android requirements
In order to build and deploy Cordova applications on an Android emulator, we need the to install Android SDK, Gradle and Java Development Kit (JDK) version 8. Cordova only supports JDK 8. To find out if the requirements have been correctly installed, enter the command **cordova requirements** from the root folder of the Cordova application.

The [Apache Cordova Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/) describes which version of Cordova supports which Android versions. It also describes how to install and configure the requirements for the Android platform.

#### Installing JDK 8
To install JDK 8, simply download the JDK 8 zip file from the [Java Oracle website](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html). Download the file and extract it to **/opt**, or some other folder of your choice.

Next set the **JAVA_HOME** environment variable in **.bashrc** located in your home folder. Also add the directory containing the **java** binary file to the **PATH** environment variable. This can be done by adding the following commands to the **.bashrc** file:

```bash
export JAVA_HOME=/opt/jdk1.8.0_231/
export PATH=/opt/jdk1.8.0_231/bin:$PATH
```

#### Installing Gradle
Next install the latest version of [Gradle](https://gradle.org/install/) by using sdkman or by manually downloading the binary package. To install the binary package, simple download and extract the gradle file to the folder **/opt**.

Next add the directory containing the gradle binary to the **PATH** environment variable. This can be done by adding the following command to .bashrc file: **export PATH=/opt/gradle-6.0.1/bin:$PATH**

#### Installing Android Development Tools
Next download and extract the [Android Development Tools package](https://developer.android.com/studio/?gclid=EAIaIQobChMI6pTMr4OI5gIVxKsYCh39twM9EAAYASAAEgLw1PD_BwE) to **/opt** folder. Next set the **ANDROID_HOME** and **ANDROID_SDK_ROOT** environment variables.

Also add the folder containing the sdkmanager and emulator binaries to the $PATH environment variable. This can be done by adding the following to **.bashrc** file:

```bash
export ANDROID_HOME=/opt/sdk-tools-linux
export ANDROID_SDK_ROOT=$ANDROID_HOME
export PATH=$ANDROID_SDK_ROOT/tools/bin:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$PATH
```

#### Installing the Android SDK and Platform Tools
Next install Platform Tools and the Android Platform SDK. Install the version of the Android Platform SDK that is supported by the installed version of Cordova. Also install the Android SDK Build Tools, Android Emulator, Android SDK Tools and a System Image for your Android Virtual Device (AVD). The AVD will be used by the Android emulator. These packages can be installed with the **sdkmanager** tool, using the following commands:

```bash
sdkmanager "build-tools;28.0.0" "platform-tools" "tools"
sdkmanager "system-images;android-28;default;x86_64"
```

#### Creating AVD and running the Android emulator
After that create an Android Virtual Device (AVD) using the command:

```bash
avdmanager create avd -n emulator-name -k "system-images;android-28;default;x86_64"
```

Once the AVD has been created, start the emulator using the newly created AVD. This can be done using the command: **emulator -avd emulator-name**

Next run the command: **cordova requirements** to check if the requirements have been correctly installed. After that add the android platform to your Cordova project using the command: **ionic cordova platform add android**. Next generate the Android app using the command **ionic cordova build android**. After that deploy the app to the Android emulator using the command: **ionic cordova emulate android**. You should now see your app running on the emulator inside a WebView.

### Conclusion
The Ionic Framework can use either Apache Cordova or Capacitor for deploying applications written in HTML, CSS and JavaScript to mobile platforms.

In this article I have described how to prepare the development environment so it can be used to deploy Ionic applications to Android platform using Apache Cordova.
