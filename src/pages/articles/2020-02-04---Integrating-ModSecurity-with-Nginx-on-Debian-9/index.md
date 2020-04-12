---
title: Integrating ModSecurity with Nginx on Debian 9
date: "2019-04-13"
layout: post
draft: false
path: "/posts/integrating-modsecurity-with-nginx-on-debian-9"
category: "server security"
tags:
  - "server security"
  - "web servers"
description: "ModSecurity is a an open source Web Application Firewall (WAF). It can detect as well as prevent attacks to web applications. Initially released as an Apache web server module, ModSecurity now supports all major Web Servers including IIS, Nginx and Apache."
---

### Introduction
[ModSecurity](https://www.modsecurity.org/) is a an open source Web Application Firewall (WAF). It can detect as well as prevent attacks to web applications. Initiallly released as an Apache web server module, ModSecurity now supports all major Web Servers including IIS, Nginx and Apache.

It also provides a standalone library called [Libmodsecurity](https://github.com/SpiderLabs/ModSecurity) that can be used in external applications. Connectors are used to allow external applications to use the Libmodsecurity library. The connectors serve as interfaces between external applications and Libmodsecurity. For example Nginx uses Libmodsecurity through the ModSecurity-nginx connector. In this article I will describe how to install ModSecurity and integrate it with Nginx on Debian Stretch using the ModSecurity-nginx connector.

### Installation
ModSecurity can be integrated with Nginx web server using the [ModSecurity-nginx connector](https://github.com/SpiderLabs/ModSecurity-nginx). The ModSecurity-nginx connector is a Nginx module which uses the Libmodsecurity library. ModSecurity can be enabled for the following contexts: **server, http and location**. the main Nginx directives provided by the ModSecurity are: **modsecurity on | off** and **modsecurity_rules_file [path to rules file]**. Once enabled it checks each request and compares it with the [OWASP ModSecurity Core Rule Set (CRS)](https://coreruleset.org/).

The OWASP ModSecurity Core Rule Set (CRS) is a set of attack detection rules which aims to protect Web Applications from a wide range of attacks including the [OWASP Top Ten list](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project). The CRS is intended for ModSecurity but may be used by other applications.

ModSecurity may be configured in detection mode or in prevention mode. In detection mode, ModSecurity simply logs the error message to a log file. In prevention mode, the error is not only logged, but the request is blocked and an error response is sent to the sender of the request.

I followed the steps given in the article: [ModSecurity and nginx](https://www.linuxjournal.com/content/modsecurity-and-nginx). The article is useful and covers all the steps, but has some short commings. The guide: [ModSecurity 3.0 and NGINX: Quick Start Guide](https://www.nginx.com/resources/library/modsecurity-3-nginx-quick-start-guide/), provided by the Nginx website is a comprehensive guide which may be regarded as the official documentation for integrating ModSecurity with Nginx. The main steps involved in integrating ModSecurity with Nginx are on Debian 9 (Stretch) are:

#### Install Nginx
The installation of Nginx on Debian is documented on the [Nginx website](http://nginx.org/en/linux_packages.html#Debian). The main steps are:

```
# Add the repository url to the apt sources list
echo "deb http://nginx.org/packages/debian `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
# Add the package signing key
curl -fsSL https://nginx.org/keys/nginx_signing.key | sudo apt-key add -
# Verify the package signing key
apt-key fingerprint ABF5BD827BD9BF62
# Update system package list
sudo apt-get update
# Install Nginx
sudo apt-get install nginx
# Verify the Nginx version
nginx -v
```

#### Compile the Libmodsecurity
To compile the Libmodsecurity library, we need to first install the dependencies. Next we need to download and compile the Libmodsecurity source code.

##### Install the dependencies
Use the following command to install the packages required by Libmodsecurity library:

```
apt-get install libtool autoconf build-essential libpcre3-dev zlib1g-dev libssl-dev libxml2-dev libgeoip-dev liblmdb-dev libyajl-dev libcurl4-openssl-dev libpcre++-dev pkgconf libxslt1-dev libgd-dev
```

##### Download the code
Use the following commands to download the correct version of Libmodsecurity source code. Note that the command given in the [ModSecurity and nginx](https://www.linuxjournal.com/content/modsecurity-and-nginx) article mentions the old source code. Use the command which is mentioned in the [ModSecurity 3.0 and NGINX: Quick Start Guide](https://www.nginx.com/resources/library/modsecurity-3-nginx-quick-start-guide/)

```
cd /opt/
# The correct command for downloading the latest Libmodsecurity source code
git clone --depth 100 -b v3/master --single-branch https://github.com/SpiderLabs/ModSecurity
cd ModSecurity
git submodule init
git submodule update
```

##### Compile the code
Use the following command to compile the Libmodsecurity source code:

```
# Generate configure file
sh build.sh
# Pre compilation step. Checks for dependencies
./configure
# Compiles the source code
make
# Installs the Libmodsecurity to **/usr/local/modsecurity/lib/libmodsecurity.so**
make install
```

#### Compile the connector
It requires downloading the Nginx source code and the source code for ModSecurity-nginx connector. When downloading the Nginx source code, make sure the version matches the currently installed Nginx version. Even though we just need to compile the ModSecurity-nginx connector, we need the Nginx source code. The following steps are involved:

```
# Fetch the Nginx source code. See the directory: **http://nginx.org/download/** for all versions of Nginx
wget http://nginx.org/download/nginx-1.14.2.tar.gz
# Extract the downloaded source code
tar -xvzf nginx-1.14.2.tar.gz        
# Fetch the source code for ModSecurity-nginx connector
git clone https://github.com/SpiderLabs/ModSecurity-nginx
# Change directory to the Nginx source code
cd nginx-1.14.2/
# Note the compile time flags used to generate the current Nginx binary
nginx -V
# Compile the Nginx using the compile time flags noted above. Exclude the **add-dynamic-module** options since we only need to compile the ModSecurity-nginx module
./configure [your-compile-time-options noted above] --add-dynamic-module=[path-to-ModSecurity-nginx connector source code]
# Generate the module
make modules
# Copy the module to the Nginx module directory
cp objs/ngx_http_modsecurity_module.so /etc/nginx/modules/
```

#### Configure the connector
To configure and enable the ModSecurity-nginx connector, we need to first load the ModSecurity Nginx module. Next we need to download the ModSecurity rules. After that we need to configure the ModSecurity-nginx connector.

##### Load the module
Add following line to **/etc/nginx/nginx.conf**:

```
load_module modules/ngx_http_modsecurity_module.so;
```

##### Download the rules
```
# Create the modsec folder in the Nginx configuration folder. It will contain the ModSec rules
mkdir /etc/nginx/modsec
# Change directory
cd /etc/nginx/modsec
# Download the rules
git clone https://github.com/SpiderLabs/owasp-modsecurity-crs.git
# Rename the default ModSecurity rules configuration file
mv /etc/nginx/modsec/owasp-modsecurity-crs/crs-setup.conf.example /etc/nginx/modsec/owasp-modsecurity-crs/crs-setup.conf
```

##### Configure the connector
```
# Copy the default ModSecurity configuration file to the modesec folder
cp /opt/ModSecurity/modsecurity.conf-recommended /etc/nginx/modsec/modsecurity.conf
# Create a configuration file that will be loaded by Nginx. This file will load the ModSec rules configuration file and the ModSec configuration file
vi /etc/nginx/modsec/main.conf
# Add following lines to the file
Include /etc/nginx/modsec/modsecurity.conf
Include /etc/nginx/modsec/owasp-modsecurity-crs/crs-setup.conf
Include /etc/nginx/modsec/owasp-modsecurity-crs/rules/*.conf
# Restart Nginx
service nginx restart
# If you see an error that mentions missing **unicode.mapping** file, then copy the file to the mod sec folder
cp /opt/ModSecurity/unicode.mapping /etc/nginx/modsec            
```

#### Testing the ModSecurity
To test the ModSecurity Nginx integration, we need to enable the Nginx ModSecurity module for the default virtual host. Add the following 2 lines to **/etc/nginx/conf.d/default.conf**. The lines should be added under the **server_name** line:

```
modsecurity on;
modsecurity_rules_file /etc/nginx/modsec/main.conf;
```

Next we need to restart the Nginx server using **service nginx restart**. We can test the ModSecurity by sending a suspicious request to the Nginx web server. The following command sends a curl request containing a banned user agent: **curl -H "User-Agent: masscan" http://localhost/**. The following should be logged to the ModSecurity log file which is **/var/log/modsec_audit.log**:

```
ModSecurity: Warning. Matched "Operator `PmFromFile' with parameter `scanners-user-agents.data' against &amp;rarrhkk;variable `REQUEST_HEADERS:User-Agent' (Value: `masscan' )
```

This indicates that ModSecurity successfully detected the suspicious request. However the request was allowed to pass through to Nginx. This is because ModSecurity operations in detection mode by default, which means it only logs the suspicious requests. To enable ModSecurity to block requests, we need to edit the ModSecurity configuration file: **/etc/nginx/modsec/modsecurity.conf** and change: **SecRuleEngine DetectionOnly** to **SecRuleEngine On**. Next we need to restart Nginx. After that the previous curl command should fail with a **403** error message, indicating that ModSecurity has successfully intercepted and blocked the request. The blocked request will also be logged.

### Conclusion
ModSecurity is a very useful tool which allows protecting web applications from malicious attacks. Although it can stop most attacks, it cannot stop attacks that resemble normal user requests. For example spam attacks on WordPress websites may not be stopped by ModSecurity alone. To stop such attacks we can use a tool such as [Fail2Ban](https://en.wikipedia.org/wiki/Fail2ban) or a WordPress security plugin like the [All In One WP Security & Firewall](https://wordpress.org/plugins/all-in-one-wp-security-and-firewall)
