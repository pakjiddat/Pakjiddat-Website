---
title: Upgrading MySQL server from version 5.6 to 8.0
date: "2018-06-28"
layout: post
draft: false
path: "/posts/upgrading-mysql-server-from-version-5-6-to-8-0"
tags:
  - "server management"
  - "software installation and configuration"
  - "database management"
description: "The latest version of MySQL server currently is 8.03. To upgrade MySQL server from a previous version we need to ensure that we are upgrading from the last stable release. For example from version 5.7 to 8.0."
---

### Introduction
The latest version of MySQL server currently is 8.03. To upgrade MySQL server from a previous version we need to ensure that we are upgrading from the last stable release.

For example from version 5.7 to 8.0. To upgrade from 5.6 to 8.0 we need to first upgrade from 5.6 to 5.7 and then from 5.7 to 8.0. Upgrading directly from 5.6 to 8.0, will result in errors related to incompatible SQL or [log file formats](https://stackoverflow.com/questions/49922023/mysql-8-0-unsupported-redo-log-format).

### Installing latest version of MySQL server
MySQL server is part of most Linux distributions. However the default version of MySQL server is usually outdated. We can install the latest version of MySQL server from the MySQL apt repository. The [MySQL online documentation](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/) provides detailed information on how to install and upgrade MySQL server and tools using the MySQL apt repository.

To install the MySQL apt repository we need to first download the repository package from: [http://dev.mysql.com/downloads/repo/apt/](http://dev.mysql.com/downloads/repo/apt/).

Next we need to install the repository package using the command:

```bash
sudo dpkg -i mysql-apt-config_w.x.y-z_all.deb
```

During the installation of the package, we will be asked to choose the version of MySQL server and other tools. After the repository package has been installed we can install the MySQL server using the commands:

```bash
apt-get update
```

followed by:

```bash
apt-get install mysql-server
```

This will install the version of the MySQL server that we had selected during the repository package installation. To change the version of MySQL server that we have installed, we need to issue the command:

```bash
sudo dpkg-reconfigure mysql-apt-config
```

The version that we select here will be installed when we install the package from **apt**.

### Upgrading MySQL server
As mentioned previously we should upgrade to the next stable release. For example from 5.6 to 5.7. To upgrade MySQL server we should first back up the database. We can do this by exporting the databases to SQL file using the command:

```bash
mysqldump -u root -p --all-databases > database_file.sql
```

This command will export all databases to a SQL file. We may also back up the data directory located at: **/var/lib/mysql**.

Next we need to remove the MySQL server using the command:

```bash
apt-get remove mysql-server
```

This command will remove the MySQL server binaries from the system. To remove the MySQL data we need to substitute **remove** with **purge** in the previous command.

After that we need to choose the new version of MySQL server from the MySQl apt configuration tool. We can access the tool with the command:

```bash
sudo dpkg-reconfigure mysql-apt-config
```

Next we need to install the new version of the MySQL server with the command:

```bash
apt-get install mysql-server
```

During installation we will be prompted for the root password for the MySQL server.

If we had used the purge option while removing the MySQL server, then we will need to import the data back to the MySQL server. We can do this with the command:

```bash
mysql -u root -p > database_file.sql
```

After the installation has completed we need to upgrade the server using the command:

```bash
mysql_upgrade -u root -p
```

This will upgrade the table formats to the version support by the new MySQL server.

### Downgrading MySQL server
To downgrade MySQL server to a previous version, we need to follow the same procedure that we used for upgrading the server. The only change would be to select the older MySQL server version from the MySQL apt configuration tool.

See the [official MySQL documentation](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/) for more information.
