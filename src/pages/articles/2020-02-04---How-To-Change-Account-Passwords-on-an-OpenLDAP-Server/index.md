---
title: How To Change Account Passwords on an OpenLDAP Server
date: "2018-10-19"
layout: post
draft: false
path: "/posts/how-to-change-account-passwords-on-an-openldap-server"
tags:
  - "command line tools"
  - "server management"
description: "To change the LDAP admin password, we need to first save the rootdn account information. We can do this with the command:"
---

To change the LDAP admin password, we need to first save the rootdn account information. We can do this with the command:

```
ldapsearch -H ldapi:// -LLL -Q -Y EXTERNAL -b "cn=config" "(olcRootDN=*)" dn olcRootDN olcRootPW | tee }/newpasswd.ldif
```

Next we need to generate a hash of the password using the slappasswd utility. The password should be appended to the LDAP configuration file. We can do this with the command:

```
/usr/sbin/slappasswd -h {SSHA} >> }/newpasswd.ldif
```

Next we need to place the generated hash password in the current location in the ldap configuration file. The new file should look similar to the following:

```
dn: olcDatabase={1}hdb,cn=config
#olcRootDN: cn=admin,dc=example,dc=com
changetype: modify
replace: olcRootPW
olcRootPW: {SSHA}lieJW/YlN5ps6Gn533tJuyY6iRtgSTQw
```

The hdb string is the type of LDAP database. It can have other values such as mdb.

After that we need to apply the changes using the command:

```
ldapmodify -H ldapi:// -Y EXTERNAL -f }/newpasswd.ldif
```

This changes the password in the administrative section of the LDAP configuration

We also need to change the password for the user. To do this we need to update the configuration file so it looks like following:

```
dn: cn=admin,dc=example,dc=com
changetype: modify
replace: userPassword
userPassword: {SSHA}lieJW/YlN5ps6Gn533tJuyY6iRtgSTQw
```

After that we need to apply the changes using the command:

```
ldapmodify -H ldap:// -x -D "cn=admin,dc=example,dc=com" -W -f }/newpasswd.ldif
```

The article [How To Change Account Passwords on an OpenLDAP Server](https://www.digitalocean.com/community/tutorials/how-to-change-account-passwords-on-an-openldap-server#changing-the-rootdn-password) describes how to change account passwords on an OpenLDAP server.
