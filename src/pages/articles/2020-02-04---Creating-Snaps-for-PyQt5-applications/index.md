---
title: Creating Snaps for PyQt5 applications
date: "2021-08-10"
layout: post
draft: false
path: "/posts/creating-snaps-for-pyqt5-applications"
tags:
  - "software development"
description: "Snap Apps or Snaps are applications for the Linux platform. They are managed using the Snappy package management system. Applications implemented using the Snap format can be installed across a wide range of Linux distributions."
---

### Introduction
Snap Apps or Snaps are applications for the Linux platform. They are managed using the Snappy package management system. Applications implemented using the Snap format can be installed across a wide range of Linux distributions.

Snaps are currently supported by Arch Linux, CentOS, Debian, Fedora, Solus, Manjaro Linux, Linux Mint, OpenEmbedded, Raspbian, OpenWrt and openSUSE.

[AppImage](https://en.wikipedia.org/wiki/AppImage) and [Flatpack](https://en.wikipedia.org/wiki/Flatpak), which are similar to Snaps also allow portable distribution of software.

Snaps are not dependent on a specific apps store. They may be downloaded from any source. [Ubuntu Snap Store](https://snapcraft.io/store) is the main source for snaps. Many popular Linux applications such as Octave, Skype, Stellerium, GIMP, LibreOffice, Blender etc can be downloaded as Snaps from the Ubuntu Snap Store.

In this article I will describe how to package and distribute a PyQt5 application as a snap app. The PyQt5 application is first converted to executable format using the **pyqtdeploy** tool. See the article: [Creating desktop applications with Python using PyQt5](/posts/creating-desktop-applications-with-python-using-pyqt5), on how to create executable files for PyQt5 applications.

It is possible to package a PyQt5 graphical application directly without converting to executable file format. However this requires knowledge of the package dependencies and desktop platforms. A self contained executable file that contains all the package dependencies such as Python interpreter, Qt5, PyQt5 etc can be deployed easily as a snap application.

### Snap, Snapd and the .snap file format
Snaps can be installed and removed using the **snap** command. The snap command has several uses. For example:

* **snap version**, shows the version of snap and snapd installed.
* **snap find "media player"** shows all snaps related to "media player".
* **snap info vlc**, lists information about the vlc snap that is currently installed.
* **sudo snap install vlc** installs the vlc snap from the Snap Store.
* **snap list** displays the list of installed snaps.
* **sudo snap refresh vlc** updates the vlc snap.
* **sudo snap remove vlc** removes the vlc snap.

Snaps are published to channels depending on their development status. Snaps may be published to the following channels: **stable, candidate, beta and edge**. When installing snaps, using the snap command or a Snap GUI front-end, the channel for the snap may be specified.

Snaps are managed using the snapd tool. Using snapd, we can install, remove, backup and restore snaps. Snaps are automatically updated. They can also be rolled back to previous versions. A snap app is deployed in deltas, meaning that only the parts of the application that have changed are updated.

A Snap app consists of a single **.snap** file. All applications dependencies are contained within this file. A snap file is based on the squashfs file system. [Squashfs](https://en.wikipedia.org/wiki/Squashfs) is a compressed read-only file system used by containers such as Docker. It allows several directories to be merged and mounted as a single directory. A squashfs file may consist of several directories mounted from different locations. The contents of the file can be viewed using the command:

```bash
unsquashfs -l file-name
```

When a Snap App is installed, it is mounted read only at the location: **/snap/snap-name/revision/**

### Developing Snaps
Snaps are developed using the snapcraft tool. Snaps can be developed on LXC/LXD containers, Docker containers or the host system. The Snapcraft tool has [useful documentation on creating Snaps.](https://snapcraft.io/docs/getting-started)

The article [Create your first Snap](https://tutorials.ubuntu.com/tutorial/create-your-first-snap#0) is an excellent starting point for getting started with Snap application development. First we need to install snapcraft using the command:

```bash
sudo snap install --classic snapcraft
```

This installs snapcraft as a snap app. The snap command requires the snapd tool. Snapd may be installed on Ubuntu using the command:

```bash
sudo apt-get install snapd
```

Once the snapcraft snap has been installed, we can create a snap using the command:

```bash
snapcraft init
```

This command creates a snap folder in the current directory. The snap folder has a single file called **snapcraft.yaml**. This is the main configuration file for the Snap App. It contains all information that is needed to build the Snap. The end result of building a snap is a **.snap** file. This file may be installed locally using the snap command or it may be published to a snap store.

#### The snapcraft.yaml file
The main parts of the **snapcraft.yaml** file are as follows:

* **name**. This is the short name of the snap.
* **base**. This is the name of the base snap. The snap being built will use libraries and files provided by the base name. If the base snap is omitted, then snapcraft runs in legacy mode without new features and bug fixes. The base snap may be set to **core**, which provides an Ubuntu 16.04 base. **core18** provides an Ubuntu 18.04 base. **core20** provides an Ubuntu 20.04 base.
* **version**. This is the version of the snap.
* **summary**. This is a short summary description of the snap.
* **description**. This is the long description of the snap.
* **grade**. This indicates the development status of the snap. It is set to **devel** by default. When set to **stable**, the snap may be published to the stable and candidate channels.
* **confinement**. This indicates the security level required to run the snap. The value **devmode** provides flexible security level that is useful during development. **strict** should be used for snaps that are ready to be published. **classic** removes security restrictions and effectively provides device ownership to the snap.
* **parts**. A snap consists of one or more [parts](https://snapcraft.io/docs/adding-parts), which describe the application. For example a snap may consist of a server part which provides a daemon service or a GUI part which provides a graphical front-end. Each part contains the part name, the location of the source code for the part and a [plugin](https://snapcraft.io/docs/snapcraft-plugins) that describes how the part should be built. For example Python applications are build using the [python plugin](https://snapcraft.io/docs/python-apps). A part also contains the dependencies required for building the part.
* **apps**. The **apps** section defines one or more applications. Each application has a name and a command which gives the location of the executable to run, when the command is entered. A Snap may contain several applications. Applications are run using the command:

```bash
snap-name.app-name
```

If the app name is same as the snap name, then it may be run using the command:

```bash
snap-name
```

#### Building the snap
After the snapcraft.yaml file has been updated, the command:

```bash
sudo snapcraft --debug
```

should be run from the directory containing the snap folder. This command creates a **.snap** file using the information given in the **snapcraft.yaml** file.

Snapcraft uses [Multipass](https://snapcraft.io/multipass) to build the snap file. Multipass is a virtual machine management system. It allows launching and managing Virtual Machines on Linux, Mac and Windows. The **--debug** options causes snapcraft to open the virtual machine command prompt in case of errors. This makes it easier to debug problems.

When using multipass, the first time the snap is built it takes between 15 to 20 minutes to download the virtual machine image and package dependencies. Future builds take much less time.

If the snap is being built from within a LXC/LXD container, then it makes sense to build the Snap on the current system, instead of within a virtual machine running within the container. The **--destructive-mode** option should be used when building snaps within LXC/LXD containers.

Once the snap has been created, we can install it using the command:

```bash
sudo snap install --devmode snap-file-name
```

#### Example snapcraft.yaml file for executable files
A sample **snapcraft.yaml** file for executable files is as follows:

```
name: snap-name # you probably want to 'snapcraft register <name>'
base: core20 # the base snap is the execution environment for this snap
version: '1.2.0' # just for humans, typically '1.2+git' or '1.3.2'
summary: Package summary # 79 char long summary
description: |
Package description

grade: devel # must be 'stable' to release into candidate/stable channels
confinement: devmode # use 'strict' once you have the right plugs and slots

layout:
  source-file-path:
    bind-file: $SNAPtarget-file-path
parts:
  # The application files      
  app-files:
    plugin: dump
    source: path-to-folder
    filesets:
       data-files:
         - data-file-path-1
         - data-file-path-2
       binaries: ["bin/bin-file-name"]
       desktop-files:
         - usr/share/applications/app-name.desktop
       icons:
         - usr/share/applications/app-icon.svg
    stage:
      - $data-files
      - $binaries
      - $desktop-files
      - $icons
    prime:
      - $data-files
      - $binaries
      - $desktop-files
      - $icons
    organize:         
      "data/*.db": "usr/local/share/"  
      "data/*.desktop": "usr/share/applications/"
      "data/*.svg": "usr/share/applications/"
    
apps:    
  app-name:    
    extensions:
      - kde-neon
    command: bin/bin-file-name
    plugs:
    - desktop
    - desktop-legacy
    - wayland
    - unity7
    desktop: usr/share/applications/app.desktop
```

The above file contains all the information needed to create a snap file for a PyQt5 executable file. It may be used for any executable file that needs to run on Gnome or KDE.

A typical desktop executable application consists of an executable file, desktop launcher file, application icon and data files. All these files should be placed in a single folder. The **source** entry for the **app-files** part should point to this folder. In the above example this folder is **path-to-folder**.

All these files need to be copied to the correct location by the build process. This is done using the [dump](https://snapcraft.io/docs/dump-plugin) plugin. The dump plugin simply copies the contents of a file or folder from the location specified under source, to another location.

**filesets** entry allows us to group all project files. Each entry under **filesets** is for a specific category of files. This allows us to reference all files in a category using a single key name. For example **data-files**.

The **stage** and **prime** entries are used to specify the files that should be copied over from the build stage. In the above example, we specify that the data files, binary files, icons and desktop launcher files should be copied over.

The **organize** entry allows us to specify how the application files should be placed in the snap. In the above example, we specify that the data files in **path-to-folder/data** should appear in **usr/local/share**.

The **layout** entry allows us to specify refer to files from within our application code. In the above example **source-file-path** refers to the path that is used in the source code of our application. This should be an absolute path. The **$SNAPtarget-file-path** is the actual location of the file in the snap. $SNAP is an environment variable that refers to the base location within the snap.

The **usr/share/applications/** folder is a standard location for desktop launcher files. The contents of a sample app.desktop file are:

```
[Desktop Entry]
Name=App Name
X-GNOME-FullName=App Name
Comment=short-description
Categories=GNOME;category-name (see: https://developer.gnome.org/menu-spec/);
Exec=snap-name.app-name
Icon=${SNAP}/usr/share/applications/app-icon.svg
Terminal=false
Type=Application
Version=1.0.0
```

The **snapcraft.yaml** file also needs to specify the desktop environments, in which the GUI app will run. This can be done by listing the plugs required by the app. In the above example, the **plugs** entry indicates that the app needs to be run on **desktop, desktop-legacy, unity7 and wayland desktop environments**.

#### Publishing the snap
Once the Snap has been created and tested, it can be pushed to the [Ubuntu Snap Store](https://dashboard.snapcraft.io/). In order to publish the Snap to the store, we need to first register an account. Next we need to login to the snap store from the command line using:

```bash
snapcraft login
```

After that we need to register our snap using the command:

```bash
snapcraft register snap-name
```

After that we need to set the grade to stable in **snapcraft.yaml**. Next we need to rebuild the snap using command:

```bash
snapcraft
```

This will create a **.snap** file in the current directory. After that we can push our snap to the snap store using the command:

```bash
snapcraft push snap-file-name --release=candidate
```

This command publishes our snap on the candidate channel. We may specify the stable channel once the snap is ready. We should then be able to install our snap from the snap store using the command:

```bash
sudo snap install snap-name --channel=candidate
```

### Conclusion
In this article I have described how to create a snap application for a PyQt5 executable file. Snaps are a popular application format. They allow portable distribution of applications. Snaps have several useful features such as interfaces, layouts, hooks and data snapshots. Applications deployed as snaps are secure, easy to maintain and can run on multiple platforms.
