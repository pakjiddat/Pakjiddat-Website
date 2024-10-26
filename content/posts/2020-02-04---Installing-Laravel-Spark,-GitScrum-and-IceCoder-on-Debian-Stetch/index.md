---
title: Installing Laravel Spark, GitScrum and IceCoder on Debian Stetch
date: "2018-01-13"
template: post
draft: false
slug: "/posts/installing-laravel-spark--gitscrum-and-icecoder-on-debian-stetch"
category: "applications"
tags:
  - "applications"
  - "software installation and configuration"
description: "Laravel Spark is a non-free but open source application for the Laravel PHP Framework. It provides features that are commonly found in web applications such as user subscription, billing plans, invoicing and payment processing."
---

### Introduction
Laravel Spark is a non-free but open source application for the Laravel PHP Framework. It provides features that are commonly found in web applications such as user subscription, billing plans, invoicing and payment processing.

Laravel GitScrum is a free and open source application that provides graphical statistics on GitLab accounts. It allows synchronizing project and issue information with GitLab.

In this article, I will describe my experience with Installing and configuring Laravel Spark and Laravel GitScrum. I will also describe how to add a custom theme to the Laravel Framework

### Installing Laravel Spark
[Laravel Spark installation](https://spark.laravel.com/docs/5.0/installation) is well documented on the Laravel Spark website. The main pre-requisites for the installation are: **Composer, NodeJS & NPM**. Composer is a packager manager for Php, while NPM is a package manager for NodeJs. NodeJs is a server side JavaScript runtime environment which allows Javascript code to be executed on the server.

### Installing NodeJs and NPM
NodeJs and NPM can be installed using the Node Version Management (NVM) script. The script can be downloaded from its [Git Hub repository](https://github.com/creationix/nvm#installation). NVM can be installed using the command:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

This will install NVM in the home directory. The install location can be customized using the **NVM_DIR** environment variable.

Once NVM has been installed, we can use it for installing our required version of NodeJs and NPM. NVM allows installing multiple versions of NodeJS. For example to install the latest version of NodeJs, we can use the command:

```bash
nvm install node
```

To check the version of NodeJs we can use the command:

```bash
node -v
```

Once the pre-requisites have been installed, we can start installing Laravel Spark. The command:

```bash
composer global require laravel/installer
```

will install Laravel globally using Composer.

Next we need to clone the [laravel/spark-installer](https://github.com/laravel/spark-installer) repository from Git Hub. Once the repository has cloned, we need to install the dependencies for Laravel Spark using the command:

```bash
composer install
```

The command should be issued from the root of the cloned repository. The cloned repository path should be added to the **$PATH** environment variable, so the spark command can be run from any folder on the system

Next we need to register our application with the Spark installer. To do this, we need to generate an API token from our Spark account. We can then register our API token using the command:

```bash
spark register token-value
```

where token-value is the generated token

We can now create new Laravel Spark projects by issuing the command:

```bash
spark new project-name
```

where project-name is the name of the folder where the Spark application should be installed. Once we have created a new Spark project, we need to migrate the database for the new project using the command:

```bash
php artisan migrate
```

This will create new database tables. Before running this command, we need to enter our database credentials in **.env file.**

We should then be able to access the Laravel Spark frontend page at the url configured in the virtual host configuration file. The frontend page has two buttons for logging in and registering. When the user logs in, he is taken to his application dashboard. He will also be able to view his personal information and subscription information.

Laravel Spark supports the Stripe and BrainTree payment processors

### Installing Laravel GitScrum
Laravel GitScrum is a free open source application that essentially works as an agile frontend for the GitLab API. It allows importing projects and issues from GitLab.

It also displays charts and graphs describing project and issue progress. It provides product backlog, sprint backlog and user stories. GitScrum requires Php 7.1 or higher. It can use MySQL or Mariadb as the database server.

GitScrum installation is well documented on the [GitScrum repository front page](https://github.com/gitscrum-community-edition/laravel-gitscrum#installation). To install GitScrum, we need to first clone the GitScrum source code repository by issuing the command:

```bash
git clone git https://github.com/gitscrum-community-edition/laravel-gitscrum.git
```

Next we need to install the GitScrum dependencies using the commands:

```bash
cd laravel-gitscrum && composer update
composer run-script post-root-package-install
```

Next we need to set the Application URL by editing the constant APP_URL in .env file. The database connection information should also be added to the .env file.

Next we need to create the database tables for GitScrum by running the commands:

```bash
php artisan migrate && php artisan db:seed --class=SettingSeeder
```

Next we need to enter our GitLab key and secret in .env file. To fetch the key and secret values, we need to first create a new GitLab app and fetch the application Id and Secret.

### Installing IceCoder
[IceCoder](https://icecoder.net/downloads) is a simple web based code editor. It can be used to edit source code files on the server. It has a user friendly interface and can be configured to display files in any folder, provided the user under which the web server is running has permissions to read/write the files. It only requires PHP and does not use a database.

To install IceCoder, we simple need to download the files from the IceCoder website. Once the files have been downloaded, we need to extract them to the document root of the virtual host. The extracted files should be owned by the user under which the web server is running. We should then be able to access the IceCoder from browser by navigating to the server URL given in the server virtual host configuration.

We can configure the root folder that will be served by the IceCoder. This can be done by setting the docRoot configuration in **lib/config___settings.php**. By default it is set to the virtual host document root.

The IceCoder also supports viewing and editing files remotely such as over ftp or GitHub.

### Adding template files to Laravel Framework
The Laravel Framework has a built in template engine called [Blade](https://laravel.com/docs/5.5/blade#introduction). It allows html templates to be easily added to the Laravel Framework.

To quickly add a template file to Laravel framework, we need to first add a route over which the file will be served. We can do this by adding the following to **routes/web.php**.

```php
Route::get('/', function () {
    return view('/custom/home1');
});
```

This will cause the file **home1.blade.php** inside the folder **views/custom/** to be served.

Blade template files need to end with **.blade.php**. They contain plain HTML but can optionally contain configuration directives. For example the statement: **@extends('layouts.main')** will cause the current view file to use the layout file: **layouts/main.blade.php**. The directive: **@section('title', 'Welcome to ValueHub')** will case the page title to be set to: **'Welcome to ValueHub'**.

The template file can also contain sections with content that is auto inserted into other template files. For example the main layout file **layouts/main.blade.php** can contain the code: **@yied('content')**. Each view file that contains content should have code which starts with **@section('content')** and end with: **@stop**.

Template files can also include other template files. For example the command:

```php
@include('custom.header')
```

will cause the template file: **views/custom/header.blade.php** to be included. This can be useful for including a header or footer template file.

### Conclusion
Laravel Spark provides the scaffolding for developing applications that require subscription and payment processing. It a useful starting point for developing applications.

GitScrum provides tools for developing applications according to agile methodology. It provides Burn Down charts, Backlogs and Kanban boards for managing application development. Both applications can be used in the development of custom applications.
