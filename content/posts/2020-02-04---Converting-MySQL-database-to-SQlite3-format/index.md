---
title: Converting MySQL database to SQlite3 format
date: "2019-04-03"
template: post
draft: false
slug: "/posts/converting-mysql-database-to-sqlite3-format"
category: "database management"
tags:
  - "database management"
description: "SQlite3 is a lightweight relational database that can be used in place of relational database servers such as MySQL and PostgreSQL. SQLite3 databases are commonly used in Mobile applications. In contrast to most relational databases, a SQLite3 database is a single independent file. The file has a .db extension. Most programming languages such as Python and PHP provide libraries for accessing SQLite3 databases."
---

SQlite3 is a lightweight relational database that can be used in place of relational database servers such as MySQL and PostgreSQL. SQLite3 databases are commonly used in Mobile applications. In contrast to most relational databases, a SQLite3 database is a single independent file. The file has a **.db** extension. Most programming languages such as Python and PHP provide libraries for accessing SQLite3 databases.

The [mysql2sqlite](https://github.com/dumblob/mysql2sqlite) is a free and open source script that allows converting MySQL databases to SQLite3 format.

To convert a MySQL database to SQLite3, we need to first export the database using PhpMyAdmin or mysqldump. Next we need to run the command:

```bash
./mysql2sqlite dump_mysql.sql | sqlite3 mysqlite3.db
```

This command converts the sql file mysql.sql to mysqlite3.db. The SQLite database can then be accessed from programming languages such as Python and PHP.
