---
title: Running Graphical applications within LXD containers
date: "2019-08-21"
layout: post
draft: false
path: "/posts/running-graphical-applications-within-lxd-containers"
category: "server management"
tags:
  - "server management"
  - "software installation and configuration"
  - "graphics"
description: "LXD containers provide an isolated environment, which is separate from the main host. Sometimes we may need to run GUI apps from the container. For example during development of desktop applications."
---

### Introduction
LXD containers provide an isolated environment, which is separate from the main host. Sometimes we may need to run GUI apps from the container. For example during development of desktop applications.

In the article I will describe how to run GUI apps from within LXD containers. The code for the app is installed on the container, but the app itself runs on the host using the display server of the host. The article [How to run graphics-accelerated GUI apps in LXD containers on your Ubuntu desktop](https://blog.simos.info/how-to-run-graphics-accelerated-gui-apps-in-lxd-containers-on-your-ubuntu-desktop/) was used for reference.

### Configuration
Configuring a LXD container so it runs GUI apps requires sharing the host display device with the container and adding a GPU device to the container. Both steps require a mapping of user ids between the host and the container.

The id of the user that will run the GUI apps on the container needs to be matched with the id of the user that is logged in to the host. To test the configuration we need to install a sample GUI app on the container. The sample app is called xclock and it displays a small analog clock in a window. The following configuration steps are involved:

#### Mapping user ids
This involves creating a mapping between a user on the container and a user on the host. First we need to define a mapping between the root user on the container and the user on the host. This can be done by running the following command on the host:

```
echo "root:$UID:1" | sudo tee -a /etc/subuid /etc/subgid
```

The command adds a mapping entry to the **/etc/subuid** and **/etc/subgid** files.

Next we need to define a user id mapping for our container. Assuming our container is called Projects, the following command creates a mapping between user id $UID on the host and user id 1001 on the container: **sudo lxc config set Projects raw.idmap "both $UID 1001"**.

The command allows devices and files belonging to the host user to be used within the container. For the changes to take affect, we need to restart our container with the command: **sudo lxc restart Projects**.

User id 1001 should be replaced with the user id of the user that will run the GUI apps on the container. $UID is an environment variable that contains the user id of the user logged in to the host.

#### Share display device socket and X11 authentication file
Next we need to share the X11 display socket and X11 authentication file with the container. We can do this with the following commands:

```
sudo lxc config device add Projects X0 disk path=/tmp/.X11-unix/X0 source=/tmp/.X11-unix/X0
sudo lxc config device add Projects Xauthority disk path=/home/nadir/.Xauthority source=${XAUTHORITY}
```

After running the above commands, the container should be restarted. We should then be able to see the folder: **/tmp/.X11-unix/X0** and the file: **/home/nadir/.Xauthority** on the container. Both the folder and files should be owned by user id 1001 on the container.

#### Add GPU device to container
The next step is to add a GPU device to the container. This can be done with the following commands:

```
sudo lxc config device add Projects gpu gpu
sudo lxc config device set Projects gpu uid 1001
sudo lxc config device set Projects gpu gid 1001
```

#### Test the configuration
Next we need to run a sample GUI app on the container. To do this, we need to install the **x11-apps** package using the command: **sudo apt-get install x11-apps**. The x11-apps package contains the **xclock** sample GUI app.

Before running the sample app, we need to set the **DISPLAY** environment variable on the container. It should be set to the same value as the **DISPLAY** variable on the host. To get the value of the **DISPLAY** variable on the host, run the command: **echo $DISPLAY** on the host. The value of this variable is usually **":0"**.

Next run the command: **export DISPLAY=:0** on the container. It sets the **DISPLAY** variable to **":0"**. Place the command in **~/.bashrc** file so next time the user logs in the **DISPLAY** variable is automatically set.

Run the sample GUI app using the command: **xclock**. It should open a small window containing an analog clock. The window will be opened on the host.

### Running Android emulator within LXD container
To run an Android emulator within a LXD container, we need to first install the Android SDK on the container. See the article: [Building Ionic Cordova applications for Android on Debian 10 without Android Studio](/posts/building-ionic-cordova-applications-for-android-on-debian-10-without-android-studio) on how to install Android emulator.

Once the Android SDK has been installed, enable KVM hardware virtualization on the LXD container. KVM hardware virtualization is required for running Android emulators. To enable the KVM support enter the following commands from the main host that is running the LXD container:

```
sudo lxc config device add ContainerName kvm unix-char path=/dev/kvm
sudo lxc config device set ContainerName kvm uid UID
sudo lxc config device set ContainerName kvm gid GID
```

The first command will add the KVM device to your LXD container. The last two commands will set the user and group ids of the KVM device on the LXD container. Change the UID and GID to the user and group id of the user that will run the emulator on your container. After that shut down and start your LXD container. You should now be able to run Android emulator from your LXD container.

### Conclusion
Developers often need working environments that are separated from their main computer. LXD containers provide a lightweight environment for development work. However LXD containers do not support running GUI apps by default. Fortunately there is a simple workaround that I have described in this article, which allows GUI apps to be run from LXD containers.
