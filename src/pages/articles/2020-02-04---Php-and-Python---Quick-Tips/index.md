---
title: PHP and Python - Quick Tips
date: "2019-04-03"
layout: post
draft: false
path: "/posts/php-and-python---quick-tips"
tags:
  - "backend programming"
description: "Following are some quick tips related to PHP and Python"
---

Following are some quick tips related to PHP:

#### [Fixing timeout problems with PHP scripts on Plesk](http://stackoverflow.com/questions/13905004/how-to-fix-fastcgi-timeout-issues-in-plesk)
In order to allow long running PHP scripts to run on a Plesk server, we need to increase the max_execution time value in the PHP configuration settings. If the Plesk is running PHP-FPM or PHP Fast CGI, then the following directives should be added to the file /etc/httpd/conf.d/fcgid.conf:

```
FcgidIOTimeout 9000
FcgidBusyTimeout 3600
```

The above options can also be added to the Apache settings for the domain

#### [PHP server APIs](http://stackoverflow.com/questions/4526242/what-is-the-difference-between-fastcgi-and-fpm)
PHP may be run as an Apache module. This configuration is known as mod_php. It may also be run as a FPM server or a Fast CGI server.
In the Fast CGI configuration, the PHP binary is accessed by the web server using the Fast CGI protocol.
In the PHP FPM configuration, the PHP is managed by a Fast CGI server called PHP FPM. The web server communicates with this PHP FPM server over a TCP socket.

#### [Fetching Gzip content with PHP Curl](https://stackoverflow.com/questions/310650/decode-gzipped-web-page-retrieved-via-curl-in-php)
To fetch urls such as RSS Feeds that have been compressed with gzip encoding the following curl option can be used:

```php
curl_setopt($ch,CURLOPT_ENCODING , "gzip");
```

#### [Using Usort function for sorting Arrays](http://php.net/manual/en/function.usort.php)
The PHP usort function allows sorting an array of values using a custom callback function. The usort function takes a comparator callback function as an argument. This function takes two arguments which are the two values to compare. The strcmp function can be used inside the comparator function for comparing string values.

#### [PHP isset function](http://php.net/manual/en/function.isset.php)
The PHP function isset returns false for null values. It should not be used to check if array key exists, since some array keys may have empty value. Its better to use [array_key_exists](https://www.php.net/manual/en/function.array-key-exists.php) function instead.

#### [Generating random strings with array_rand and shuffle functions](http://php.net/manual/en/function.array-rand.php)
The PHP functions array_rand and shuffle functions can be used to generate random strings.

#### [What is the difference between a PHP interpreter and a PHP handler?](http://stackoverflow.com/questions/40775071/what-is-the-difference-between-a-php-interpreter-and-a-php-handler/40801508#40801508)
A PHP Handler is an Apache module that is used by Apache to communicate with the PHP Interpreter. It is basically used by Apache to handle requests for PHP files. There are different types of PHP Handlers.

For example mod_php is an Apache module for PHP. mod_fcgid allows communication with the php_fpm interpreter over a TCP or Unix socket. The PHP Interpreter is an application that executes PHP code one line at a time. The output of the PHP Interpreter is sent to the PHP Handler. This output may be processed by other Apache modules such as mod_deflate or mod_security. The final output is sent out of the TCP socket that Apache listens on.

SuPHP is an Apache module that allows executing PHP scripts with the permissions of the script owner. Normally PHP scripts are executed with the permissions of the PHP interpreter. SuPHP allows the PHP files to have custom owner and permissions. The PHP file is then executed by the same owner that owns the PHP file. Its useful in shared hosting environments where PHP files belonging to different users need to be executed by the same PHP interpreter.

#### [Passing command line arguments to Python script](https://www.tutorialspoint.com/python/python_command_line_arguments.htm)
Command line arguments can be passed to a Python script. For example the parameters passed in the following command:

```python
python script_name argument1 argument2 argument3
```

can be read with the sys module. The sys module provides the command line arguments. To use the sys module, we have to use the command:

```python
import sys
```

The command line arguments can be used as: **sys.argv[0], sys.argv[1], sys.argv[2]**. The number of command line arguments can be read with: **len(sys.argv)**.

#### [PHP 7 error handling](http://php.net/manual/en/language.errors.php7.php)
PHP 7 uses a different approach for handling errors. It uses a different Error hierarchy then PHP 5. The base error class in PHP 7 is Throwable. So if we want to catch all exceptions that can be raised by a given code, then we should enclose the code in try/catch block. The catch block should use the Throwable class. For example:

```php
try {
// some php code
}
catch (Throwable $e) {

}
```

#### [Executing PHP code using eval](http://php.net/manual/en/function.eval.php)
The PHP eval function allows executing arbitrary PHP code. It takes as argument a string containing PHP code it returns null or the value returned by the PHP code.

#### [Generate URL query strings using http_build_query](http://php.net/manual/en/function.http-build-query.php)
The http_build_query function allows generating valid URL query strings from simple or complex arrays including nested arrays.
