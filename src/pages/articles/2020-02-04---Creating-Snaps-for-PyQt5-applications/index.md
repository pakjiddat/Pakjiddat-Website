---
title: Creating Snaps for PyQt5 applications
date: "2019-09-02"
layout: post
draft: false
path: "/posts/creating-snaps-for-pyqt5-applications"
tags:
  - "desktop programming"
  - "software deployment"
description: "Snap Apps or Snaps are applications for the Linux platform. They are managed using the Snappy package management system. Applications implemented using the Snap format can be installed across a wide range of Linux distributions."
---

### Introduction
Snap Apps or Snaps are applications for the Linux platform. They are managed using the Snappy package management system. Applications implemented using the Snap format can be installed across a wide range of Linux distributions. This is unlike most other Linux applications, which need to be customized for each package management system such as apt and yum. Snaps are currently supported by Arch Linux, CentOS, Debian, Fedora, Solus, Manjaro Linux, Linux Mint, OpenEmbedded, Raspbian, OpenWrt and openSUSE. [AppImage](https://en.wikipedia.org/wiki/AppImage) and [Flatpack](https://en.wikipedia.org/wiki/Flatpak), which are similar to Snaps also allow portable distribution of software.

Snaps are not dependent on a specific apps store. They may be downloaded from any source. [Ubuntu Snap Store](https://snapcraft.io/store) is the main source for snaps. Many popular Linux applications such as Octave, Skype, Stellerium, GIMP, LibreOffice, Blender etc can be downloaded as Snaps from the Ubuntu Snap Store.

In this article I will describe how to package and distribute a PyQt5 application as a snap app. The PyQt5 application is first converted to executable format using the **pyqtdeploy** tool. See the article: [Creating desktop applications with Python using PyQt5](/posts/creating-desktop-applications-with-python-using-pyqt5), on how to create executable files for PyQt5 applications. Once the PyQt5 application executable has been created, it is packaged as a desktop Snap App.

### Snap, Snapd and the .snap file format
Snaps can be installed and removed using the **snap** command. The snap command has several uses. For example:

* **snap version**, shows the version of snap and snapd installed.
* **snap find "media player"** shows all snaps related to "media player".
* **snap info vlc**, lists information about the vlc snap that is currently installed.
* The command: **sudo snap install vlc** installs the vlc snap from the Snap Store.
* **snap list** displays the list of installed snaps.
* **sudo snap refresh vlc** updates the vlc snap.
* The command: **sudo snap remove vlc** removes the vlc snap.

Snaps are published to channels depending on their development status. Snaps may be published to the following channels: **stable, candidate, beta and edge**. When installing snaps, using the snap command or a Snap GUI front-end, the channel for the snap may be specified.

Snaps are managed using the snapd tool. Using snapd, we can install, remove, backup and restore snaps. Snaps are automatically updated. They can also be rolled back to previous versions. A snap app can be deployed in deltas, meaning that only the parts of the application that have changed need to be updated.

A Snap app consists of a single **.snap** file. All applications dependencies are contained within this file. A snap file is based on the squashfs file system. [Squashfs](https://en.wikipedia.org/wiki/Squashfs) is a compressed read-only file system used by containers such as Docker. It allows several directories to be merged and mounted as a single directory. A squashfs file may consist of several directories mounted from different locations. The contents of the file can be viewed using the command: **unsquashfs -l file-name**.

When a Snap App is installed, it is mounted read only at the location: **/snap/snap-name/revision/**

### Developing Snaps
Snaps are developed using the snapcraft tool. Snaps can be developed on LXC/LXD containers, Docker containers or the host system. The Snapcraft tool has [useful documentation on creating Snaps.](https://snapcraft.io/docs/getting-started)

The article [Create your first Snap](https://tutorials.ubuntu.com/tutorial/create-your-first-snap#0) is an excellant starting point for getting started with Snap application development. First we need to install snapcraft using the command: **sudo snap install --classic snapcraft**. This installs snapcraft as a snap app. The snap command requires the snapd tool. Snapd may be installed on Ubuntu using the command: **sudo apt-get install snapd**.

Once the snapcraft snap has been installed, we can create a snap using the command: **snapcraft init**. This command creates a snap folder in the current directory. The snap folder has a single file called **snapcraft.yaml**. This is the main configuration file for the Snap App. It contains all information that is needed to build the Snap. The end result of building a snap is a **.snap** file. This file may be installed locally using the snap command or it may be published to a snap store.

#### The snapcraft.yaml file
The main parts of the **snapcraft.yaml** file are as follows:

* **name**. This is the short name of the snap
* **base**. This is the name of the base snap. The snap being built will use libraries and files provided by the base name. If the base snap is omitted, then snapcraft runs in legacy mode without new features and bug fixes. The base snap may be set to **core**, which provides an Ubuntu 16.04 base or **core18**, which provides an Ubuntu 18.04 base.  
* **version**. This is the version of the snap
* **summary**. This is a short summary description of the snap  
* **description**. This is the long description of the snap
* **grade**. This indicates the development status of the snap. It is set to **devel** by default. When set to **stable**, the snap may be published to the stable and candidate channels
* **confinement**. This indicates the security level required to run the snap. The value **devmode** provides flexible security level that is useful during development. **strict** should be used for snaps that are ready to be published. **classic** removes security restrictions and affectively provides device ownership to the snap.
* **parts**. A snap consists of one or more [parts](https://snapcraft.io/docs/adding-parts), which describe the application. For example a snap may consist of a server part which provides a daemon service or a gui part which provides a graphical frontend. Each part contains the part name, the location of the source code for the part and a [plugin](https://snapcraft.io/docs/snapcraft-plugins) that describes how the part should be built. For example Python applications are build using the [python plugin](https://snapcraft.io/docs/python-apps). A part also contains the dependencies required for building the part. Parts may be published to a Git repository so it can be reused by other developers.
* **apps**. The **apps** section defines one or more applications. Each application has a name and a command which gives the location of the executable to run, when the command is entered. A Snap may contain several applications. Applications are run using the command: **snap-name.app-name**. If the app name is same as the snap name, then it may be run using the command: **snap-name**.

#### Building the snap
After the snapcraft.yaml file has been updated, the command: **sudo snapcraft** should be run from the directory containing the snap folder. This command creates a **.snap** file using the information given in the **snapcraft.yaml** file. If the Snap is being developed within a LXC/LXD container, then the command should be: **sudo snapcraft --destructive-mode**.

By default without the **--destructive-mode** switch, snapcraft uses [Multipass](https://snapcraft.io/multipass) to build the snap file. Multipass is a virtual machine management system. It allows launching and managing Virtual Machines on Linux, Mac and Windows. If the snap is being built from within a LXC/LXD container, then it makes sense to build the Snap on the current system, instead of within a virtual machine running within the container.

The building of a Snap can take significant time. If minor changes have been made to a Snap, then instead of rebuilding the entire snap, we can build only the parts that have changed using the command: **snapcraft prime**. Once the parts have been rebuilt, we can test the snap using the command: **sudo snap try --devmode prime**. This command mounts the contents of the snap prime folder allowing us to test the snap without installing it.

Once the snap has been created, we can install it using the command: **sudo snap install --devmode snap-file-name**.

#### Example snapcraft.yaml file for executable files
A sample snapcraft.yaml file for executable files is as follows:

```
name: snap-name # the snap name
version: '1.0.0' # just for humans, typically '1.2+git' or '1.3.2'
base: core18
summary: Provides applications for reading quran and hadith # 79 char long summary
description: |
  sna-description

grade: stable # must be 'stable' to release into candidate/stable channels
confinement: strict # use 'strict' once you have the right plugs and slots

apps:
  app-name:
    command: desktop-launch command-exec-file-name
    plugs: [desktop, desktop-legacy, x11, unity7, wayland, opengl]
    desktop: /usr/share/applications/file-name.desktop

parts:
  desktop-gui:
    # See 'snapcraft plugins'
    plugin: dump
    source: source-dir-path
    organize:
      "command-exec-file-name": "bin/command-exec-file-name"
      "data/data-file-name.db": "/usr/share/data/data-file-name.db"
      "data/file-name.desktop": /usr/share/applications/file-name.desktop
      "data/app-icon.svg": /usr/share/applications/app-icon.svg
    stage-packages:
    - libdouble-conversion1
    - libdrm2
    - libegl1
    - libfontconfig1
    - libfreetype6
    - libgbm1
    - libgl1
    - libglvnd0
    - libglx0
    - libgraphite2-3
    - libharfbuzz0b
    - libice6
    - libicu60
    - libjpeg-turbo8
    - libpng16-16
    - libsm6
    - libwayland-server0
    - libx11-6
    - libx11-xcb1
    - libxau6
    - libxcb-glx0
    - libxcb-xkb1
    - libxcb1
    - libxdmcp6
    - libxkbcommon-x11-0
    - libxkbcommon0
    - libxrender1
    after: [desktop-qt5]

  desktop-qt5:
    source: https://github.com/ubuntu/snapcraft-desktop-helpers.git
    source-subdir: qt
    plugin: make
    make-parameters: ["FLAVOR=qt5"]
    build-packages:
      - build-essential
      - qtbase5-dev
      - dpkg-dev
    stage-packages:
      - libxkbcommon0
      - ttf-ubuntu-font-family
      - dmz-cursor-theme
      - light-themes
      - adwaita-icon-theme
      - gnome-themes-standard
      - shared-mime-info
      - libqt5gui5
      - libgdk-pixbuf2.0-0
      - libqt5svg5 # for loading icon themes which are svg
      - try: [appmenu-qt5] # not available on core18
      - locales-all
      - xdg-user-dirs
      - fcitx-frontend-qt5
```

The above file contains all the information needed to create a snap file for a PyQt5 executable file. It may be used for any executable file. However non PyQt5 executable files will have different run-time dependencies that are specified under stage-packages. The list of dependencies is usually listed when we run the **sudo snapcraft** command.

Since we donot have any source code to build, the source entry for the desktop-gui part should point to the folder containing the executable file. This folder also contains the desktop icon file, a desktop launcher file and a data file. The data file is read by the executable file.

All these files need to be copied to the correct location by the build process. This is done using the [dump](https://snapcraft.io/docs/dump-plugin) plugin. The dump plugin simply copies the contents of a file or folder from the location specified under source, to another location. The above example assumes that the source folder: **source-dir-path**, contains our executable files. All other files are in **source-dir-path/data** folder.

In the above example, we want to copy the executable file **command-exec-file-name** which is in **source-dir-path** to the /bin folder of the snap. We copy the **data/data-file-name.db** file to **/usr/share/data/data-file-name.db**. The executable application should use the following path to read the executable file: **/snap/islamcompanion/current/usr/share/data/data-file-name.db**.

The **/usr/share/applications/** folder is a standard location for desktop launcher files. So we copy the desktop launcher file: **file-name.desktop** to **/usr/share/applications**. The contents of the file-name.desktop file are:

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

In the above **snapcraft.yaml** file, the application command is specified using: **command: desktop-launch command-exec-file-name**, where **command-exec-file-name** is the name of the executable file to run. **desktop-launcher** is a helper application that sets environment variables and allows running executable files. The **desktop-launcher** is a [remote part](https://snapcraft.io/docs/remote-reusable-parts).

Remote parts are reusable parts that are not supported by the latest version of snapcraft. They may be used implicity by copying and pasting the source. In the above example the [desktop-qt5](https://github.com/ubuntu/snapcraft-desktop-helpers.git) remote part has been used. It allows running qt5 gui applications. The build order of parts may be specified using the **after** command. For example: **after: [desktop-qt5]** means that the part should be built after the desktop-qt5 part.

The **snapcraft.yaml** file also needs to specify the desktop environments, in which the GUI app will run. This can be done by listing the plugs required by the app. In the above example, the line: **plugs: [desktop, desktop-legacy, x11, unity7, wayland, opengl]**, indicates that the app needs to be run on **x11, unity7, wayland desktop environments**. **opengl** allows hardware acceleration. **desktop** and **desktop-legacy** are default plugs.

In the above example the line: **desktop: /usr/share/applications/file-name.desktop** indicates the desktop launcher file

#### Publishing the snap
Once the Snap has been created and tested, it can be pushed to the [Ubuntu Snap Store](https://dashboard.snapcraft.io/). In order to publish the Snap to the store, we need to first register an account. Next we need to login to the snap store from the command line using: **snapcraft login**. After that we need to register our snap using the command: **snapcraft register snap-name**.

After that we need to set the grade to stable in **snapcraft.yaml**. Next we need to rebuild the snap using **snapcraft** command. After that we can push our snap to the snap store using the command: **snapcraft push snap-file-name --release=candidate**. This command publishes our snap on the candidate channel. We may specify the stable channel once the snap is ready. We should then be able to install our snap from the snap store using the command **sudo snap install snap-name --channel=candidate**.

### Conclusion
Snaps are a popular application format. They allow portable distribution of applications. Snaps have several useful features such as interfaces, layouts, hooks and data snapshots. Applications deployed as snaps are secure and easy to maintain.
