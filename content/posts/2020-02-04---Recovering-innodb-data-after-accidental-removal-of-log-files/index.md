---
title: Recovering innodb data after accidental removal of log files
date: "2019-10-02"
template: post
draft: false
slug: "/posts/recovering-innodb-data-after-accidental-removal-of-log-files"
category: "server management"
tags:
  - "server management"
  - "database management"
description: "The role of Full Stack web developers is becoming increasingly popular. A Full Stack Web Developer is one who has a working knowledge of all components involved in website development. This includes front-end programming, back-end programming and server administration. "
---

### Introduction
The role of Full Stack web developers is becoming increasingly popular. A Full Stack Web Developer is one who has a working knowledge of all components involved in website development. This includes front-end programming, back-end programming and server administration.

Server administration is a task that requires a lot of patience. Very often stressed out developers make the mistake of deleting important files. In this article I will describe my experience of restoring innodb database tables after accidentally removing innodb log files.

### Innodb database table recovery
A server that I was in-charge of started crashing after every few hours. Initially the problem appeared to be caused by SQL injection attacks on a website. I was able to stop these attacks by configuring Fail2Ban. Even after configuring Fail2Ban, the server did not stop crashing.

I checked the running processes. The list showed two instances of MySQL server. Also the MySQL error log file showed that several database tables had crashed. Unfortunately I panicked and made the wrong decision of deleting the log files used by MySQL database server.

### The problem
I had deleted the **innodb1**, **ib_logfile0** and **ib_logfile1** files. These files should not be removed as they are used by the innodb engine to store important table meta data. After removing the files all innodb database tables were inaccessible.

Fortunately the **innodb_file_per_table** option was enabled in MySQL server configuration. This option was enabled by default. When enabled, each innodb table uses one tablespace file with **.ibd** extension and a table structure file with **.frm** extension. innodb also uses a system table space, which is saved in the **innodb1** file. I had removed the system tablespace, but fortunately, the tablespace files for each table were present.

### The solution
Recovering crashed innodb tables is a common problem. The article [Recover MySQL InnoDB tables without ibdata1 file](https://www.nullalo.com/en/recover-mysql-innodb-tables-without-ibdata1-file/), is an excellant guide on how to recover crashed innodb tables.

It was used as the main reference for this article. Other useful related articles are: [MySQL InnoDB lost tables but files exist](https://superuser.com/questions/675445/mysql-innodb-lost-tables-but-files-exist), [InnoDB: Error: tablespace id in file](https://www.chriscalender.com/tag/innodb-error-tablespace-id-in-file/), [Troubleshooting InnoDB Data Dictionary Operations](https://dev.mysql.com/doc/refman/5.6/en/innodb-troubleshooting-datadict.html) and [Moving or Copying InnoDB Tables](https://dev.mysql.com/doc/refman/5.6/en/innodb-migration.html).

#### Recovering the table schema
To recover the data, first the MySQL data directory which is **/var/lib/mysql** had to be backed up. Next the table schema for each innodb table had to be recovered using the **mysqlfrm tool**. This tool is provided by the [mysql-utilities](https://downloads.mysql.com/archives/utilities/) package.

The tool parses the **.frm** file for the innodb table and displays the **CREATE TABLE** statement to console. The **CREATE TABLE** statement can be copied to a new database. In this way the structure for all the innodb tables can be copied to a new database. Once the schema for the table is recovered, the data for the table needs to be recovered.

#### Recovering the table data
The data for the table is saved in a file with **.ibd** extension. To recover the table data, first the tablespace of the table needs to be discarded using the SQL query: **ALTER TABLE table-name DISCARD TABLESPACE**. Next the **.ibd** files for the table needs to be copied from the backup folder to the folder of the database that will contain the recovered data. Once this is done, the data for the table needs to be imported using the SQL query: **ALTER TABLE table-name IMPORT TABLESPACE**. Next issue the SQL query: **SELECT * FROM table-name** should show the table data.

The table can now be exported using **mysqldump** tool or **PhpMyAdmin**. The original database table, which is corrupted can be dropped and the new table can be imported. This needs to be done for each innodb table.

#### Automating the data recovery
To make the task for recovering the data easier, I wrote a PHP script which recovers all innodb tables in a given database.

To use the script do the following:

Download the script using the command: **wget https://gist.github.com/nadirlc/7bcf0fcc2b85e6fc15812b46525f51da**

Rename the script to restore_innodb.php. To see the script options run: PHP restore_innodb.php

Run the script with the correct options. For example:

```php
php restore_innodb.php --src-db="mysql"
--backup-folder="/root/scripts/data-backup/"
--mysql_data_dir="/var/lib/mysql"
--log_file="/root/scripts/restore_innodb.log"
--user="root" --password="root-password"
```

just replace the line: **$src_db = "mysql";**, with the name of the database that contains the crashed tables. Also replace the line:

```
$backup_folder = "/root/scripts/data-backup/";
```

with the name of the folder that contains the backup data. The backup data should include the **.frm** and **.idb** files.

The script will replace the corrupted table with the restored table. The script may not work for all cases, because the **.ibd** files may be corrupt.

### Conclusion
Innodb engine has some useful features. For example Innodb database engine supports transactions and row level locking. It is also ACID (Atomicity, Consistency, Integrity and Durability) compliant. It provides supports for foreign keys and also has faster write access than the MyISAM database engine.

However Innodb tables can easily become corrupted because of improper database server shutdown. In most cases the Innodb engine can repair corrupt tables automatically using the Innodb log files, but in some cases the Database Administrator needs to recover the data manually.
