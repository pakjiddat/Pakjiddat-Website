---
title: Database Management - Quick Tips
date: "2019-04-03"
template: post
draft: false
slug: "/posts/database-management---quick-tips"
category: "database management"
tags:
  - "database management"
description: "Following are some quick tips related to Database Management:"
---

Following are some quick tips related to Database Management:

#### [Ignoring errors during MySQL import](https://stackoverflow.com/questions/11263018/mysql-ignore-errors-when-importing)
While importing large database backups we may come across errors such as duplicate indexes. It would be useful to ignore such minor errors. The **mysql** command provides the --force switch which allows us to ignore the errors. For example:

```bash
sudo mysql -u {mysql_user} -p --force &lt; {sql_file}
```

#### [List all databases for Postgresql](http://dba.stackexchange.com/questions/1285/how-do-i-list-all-databases-and-tables-using-psql)
To list all PostgreSQL databases, we need to first switch to user postgres using the command **su psql**. Next we need to login to the PostgreSQL console using the command PSQL. After that run the command \list. This will list all databases. To run queries on the database fist run the command \connect database_name. Then run your query.

#### [Restoring a database backup in Plesk](https://support.plesk.com/hc/en-us/articles/213904125)
If your Plesk settings are messed up then it may be useful to restore the backup of the Plesk databases. Plesk automatically backups up the following databases every day: psa, horde and mysql. For example the psa database can be restored with following command: **plesk db psa &lt; psa.sql**

#### [How to login to MySQL server as root user on Plesk](https://support.plesk.com/hc/en-us/articles/213909425)
To login to MySQL server as root privileges on a Plesk server we can use the following command: ** MYSQL_PWD=`cat /etc/psa/.psa.shadow` mysql -u admin**

#### [Deleting a Mongo Db database](https://docs.mongodb.com/manual/reference/command/drop/)
To delete a Mongo Db database called test, enter the command: **mongo**. This will take you to the Mongo Db shell. Then enter the commands:

```js
use test;
db.runCommand( { dropDatabase: 1 } );
```

#### [Create backup of Mongo Db database](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump)
To backup a Mongo Db database, we can use the command: **mongodump --archive=test.gz --gzip --db test**. It will create a gzip backup of the test database

#### [Troubleshooting problems with MySQL server using MySQL Tuner](https://github.com/major/MySQLTuner-perl)
The MySQL tuner is a Perl script that checks a MySQL server and gives suggestions on how to improve its performance
The script checks MySQL server log files and configuration and suggests optimal values for server configuration variables such as **query_cache_size**.

#### [MySQL server out of resources](https://support.plesk.com/hc/en-us/articles/213938885-Plesk-or-website-does-not-work-Unable-to-connect-to-database-MySQL-server-has-gone-away-Full-server-backup-is-created-with-warning-errno-24-Too-many-open-files?sort_by=votes)
If you get following error on your MySQL/MariaDB server: **General error: 23 Out of resources**, then a possible solution is to increase the **open_file_limit** mysql variable. On Centos 7, this can be done by first creating the folder: **/etc/systemd/system/mariadb.service.d/**, then create a new file **limits.conf** with the following contents:

```
[Service]
LimitNOFILE=20000
```

After that restart the MySQL/MariaDB service with the command:

```bash
systemctl daemon-reload
systemctl restart mariadb.service
```

#### [Sorting a MySQL string column as a number](https://stackoverflow.com/questions/44829035/wordpress-sort-posts-containing-numbers-and-letters-alphabetically/44857800#44857800)
To sort a MySQL string column containing a number we can use the **SUBSTRING** and **CAST** functions. The **SUBSTRING** function should extract the numbers inside the string. The CAST function will convert the extracted string to a number.

#### [MySQL user password not being set](https://superuser.com/questions/949496/cant-reset-mysql-mariadb-root-password)
If you have problems with setting the user password on MariaDB or MySQL, for example you set the user password and are not able to login with the new password, then the problem may be caused because the database user is configured to use the wrong authentication plugin. For example **unix_socket** plugin instead of the default authentication scheme.

The solution is to set the plugin field in the user table of the MySQL database to empty value. This will cause the MySQL/MariaDB server to authenticate the database user with the default authentication scheme.

#### [Removing ONLY_FULL_GROUP_BY sql mode](http://johnemb.blogspot.com/2014/09/adding-or-removing-individual-sql-modes.html)
In **MySQL 5.7.5** the **ONLY_FULL_GROUP_BY SQL mode** was introduced. In this mode, Non-deterministic grouping queries are rejected.

Applications that use GROUP BY clause in SQL queries may start giving errors after an upgrade to the MySQL server. To allow the applications to continue working, we need to remove the ONLY_FULL_GROUP_BY option from the SQL mode variable.
This can be done by setting the SQL mode variable in **/etc/mysql/mysql.conf.d/mysqld.cnf** without the ONLY_FULL_GROUP_BY option. After that the MySQL server should be restarted. To get the current value of the SQL mode variable go to the variables tab in PhpMyAdmin and copy the value of SQL mode variable.

#### [Batch rename MySQL database tables](https://stackoverflow.com/questions/10066783/in-mysql-how-do-i-batch-rename-tables-within-a-database)
Sometimes we need to rename our MySQL database tables in bulk. For example we may decide to add or change the table prefix on all tables within a database. Database management tools such as PhpMyAdmin allow us to rename tables with a few clicks, but most tools do not allow batch renaming.

The article [In MySQL, how do I batch rename tables within a database?](https://stackoverflow.com/questions/10066783/in-mysql-how-do-i-batch-rename-tables-within-a-database) suggests that to rename several MySQL tables at once, we can run a SQL query that fetches the list of all database tables from the information_schema.tables table. The SQL query can generate rename table statements. We can then export these rename table statements to a file. We can further process the table names using the find/replace feature of standard text editors. Next we can run the SQL queries for renaming the database tables.

For example the following SQL query will append the text "_old" to all tables in the "db" database. The query will not actually rename any tables. It will simply generate rename table statements. In order to restrict the renaming to certain tables, we can update the WHERE condition.

```sql
SELECT concat ('rename table ', table_name, ' to ', table_name, '_old;') FROM information_schema.tables WHERE table_schema='db'
```

#### [MySQL query to calculate running balance](https://stackoverflow.com/a/56721288/4508593)
It is possible to calculate a running balance using only MySQL. A running balance is similar to the last column of a bank statement. Since the running balance depends on the balance of the previous row, we need to use a temporary table. The following three SQL queries can be used to calculate a running balance:

```sql
1. create TEMPORARY table tbl_temp (select * from tbl);
2. update tbl t1 set t1.Bal=(SELECT SUM(t2.deposited_amount-t2.issued_amount)
FROM tbl_temp t2 WHERE t2.id<=t1.id);
3. select * from tbl;
```

#### [Profiling MySQL queries using PhpMyAdmin](https://stackoverflow.com/questions/10066783/in-mysql-how-do-i-batch-rename-tables-within-a-database)
To see which SQL queries are currently running on your MySQL server, enter the following SQL commands:

```sql
SET GLOBAL general_log = 'ON';
SET GLOBAL log_output = 'TABLE';
```

This will log the SQL queries to the table: "general_log" in MySQL database.

To see which slow SQL queries are currently running on your MySQL server, enter the following SQL commands:

```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL log_queries_not_using_indexes = 'ON';
SET GLOBAL log_output = 'TABLE';
```

This will log all the slow SQL queries to the table: "slow_log" in MySQL database. It will also log queries that are not using indexes.
