---
title: Server Migration with Plesk
date: "2017-02-02"
layout: post
draft: false
path: "/posts/server-migration-with-plesk"
tags:
  - "server management"
  - "virtualization"
description: "Plesk is a commercial platform for managing website hosting. The cost of using Plesk depends on the number of domains to be managed, type of hosting (dedicated or VPS), addon products such as anti virus etc. Plesk allows managing FTP, Email, web site hosting, DNS and more."
---

### Introduction
Plesk is a commercial platform for managing website hosting. The cost of using Plesk depends on the number of domains to be managed, type of hosting (dedicated or VPS), addon products such as anti virus etc. Plesk allows managing FTP, Email, web site hosting, DNS and more. The user interface is easy to use and well organized. Plesk also has excellent online documentation, which makes it easy to troubleshoot problems.

This articles describes my experience with migrating server data from one Plesk instance to another using the Plesk Migrator Extension. I had followed the [Plesk Migration Guide](https://docs.plesk.com/en-US/onyx/migration-guide/introduction.75496/).

### Installation and Pre-requisites
Log in as administrator to the Plesk destination server. Next go to "Tools and Settings", then "Updates and Upgrades", then go to Add/Remove components. After that select "Install" next to the Plesk Migrator component. Alternately, Plesk may be installed from the command line by running the **plesk installer** command.

In order to use the Plesk Migrator, certain TCP ports need to be opened on the source and destination servers. The installation of the Plesk Migrator is documented in this [installation guide](https://docs.plesk.com/en-US/onyx/migration-guide/installation-and-prerequisites.75498/).

Plesk supports migration from following platforms: Plesk for Linux and Plesk for Windows, Cpanel, Confixx, Helm, Plesk Expand and Parallels Pro Control Panel for Linux.

Following data is transferred: service plans, subscriptions with associated domains and website content. Website content includes database, files and email. The settings of Plesk services such as Php, Firewall, Apache are not transferred.

### Migrating from the web interface

#### Creating a migration task
Log in to Plesk as admin user. Then go to **"Server Management"->"Extensions"->"Plesk Migrator"->"Start a New Migration"**. For the Panel Type option select Plesk. For the ip address, enter the ip address of the Source Plesk server. For the root login field enter root. For the Authorization field, select either **"User/password"** or SSH keys.

If **"User/password"** option is selected then enter the password for the root user on the source server. If the SSH keys option was selected, then enter the path to the private key file used to login to the target Plesk server.

Next click on Prepare Migration. The Plesk Migrator will attempt to fetch information about the different subscriptions and domains. Plesk will now create an entry in the migration list. The migration entry can be edited any time.

#### Adding subscriptions
Click on the migration entry. This will open the add subscription tab. On this tab we can select the subscriptions to migration and the content to migrate. For example databases, email and website files. On this page, we must select the subscriptions to migrate. We cannot migrate individual domains within a subscription.

#### Migrating the subscription
After selecting the subscriptions to migrate, we need to click on Migrate. Plesk then runs pre-migration checks which displays the list of possible issues. After these issues have been corrected, click on Refresh. Once the pre-migration check returns a clean report, click on "Start migration" to being the migration. The migration progress can be viewed on the overview tab.

The migration process displays a status report for each subscription that is migrated. After a subscription has been migrated, we can re-sync the subscription by clicking on rsync besides the subscription. After the migration has completed, we can click on "Finish migration" to remove the migration from the list of on going migrations.

#### Assigning IP address to migrated subscription
When migrating a subscription, we will most likely want to change its IP address. We can do this from the subscriptions list tab. On this tab we need to select **"Change IP mapping"** from the **"IP addresses"** menu and then select the correct option.

### Migrating from the command line

#### Running the pre-migration check
Copy a sample configuration file from **/usr/local/psa/admin/plib/modules/panel-migrator/backend/conf/samples/** folder to **/usr/local/psa/var/modules/panel-migrator/conf/**. The available configuration files are:  **plesk-unix.simple.ini, cpanel.simple.ini, confixx.simple.ini, and ppcpl.simple.ini**. I chose the **plesk-unix.simple.ini** file since I wanted to migrate from a Plesk server running on Linux. After copying the file, rename it to **config.ini**.

Next we need to edit the **config.ini** file and specify the ip addresses of the source and target servers and also the login information for both servers.

#### Generating the migration list
Next we need to generate the migration list by running the command: **/usr/local/psa/admin/sbin/modules/panel-migrator/plesk-migrator generate-migration-list**. This will create the file **migration-list** in the folder **/usr/local/psa/var/modules/panel-migrator/sessions/migration-session/**.

The migration list is a list of objects to migrate such as customer and re-seller account, service plans, domains etc. We can edit the migration list and remove domains that should not be migrated or re-assign them between customer accounts. This is one advantage of migrating from the command line. It allows us to select which domains to migrate and also makes it easier to troubleshoot errors.

#### Migrating the subscriptions
Next we need to determine which IP addresses should be used for the migrated subscriptions. The simplest method is to create a simple text file called **ip-address-mappings** which contains the source and target IP address on each line separated by space. We can use the **--ip-mapping-file** command line argument. After that we need to run the migration check using the command: **/usr/local/psa/admin/sbin/modules/panel-migrator/plesk-migrator check**. This will run a migration check. The results of the check will be saved to a file. The issues mentioned in the file should be corrected and the command should be repeated.

After that we need to run the command: **/usr/local/psa/admin/sbin/modules/panel-migrator/plesk-migrator transfer-accounts --ip-mapping-file ip-address-mappings**. This will start the migration. After the migration has completed, we can test the result of the migration with the command: **/usr/local/psa/admin/sbin/modules/panel-migrator/plesk-migrator test-all**.

### Conclusion
Plesk is widely used for managing website hosting. It is easy to manage and has lots of features that greatly simplify web host management.
