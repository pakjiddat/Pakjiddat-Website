---
title: Linux Command Line Tools - Quick Tips
date: "2019-04-03"
template: post
draft: false
slug: "/posts/linux-command-line-tools---quick-tips"
category: "server management"
tags:
  - "server management"
description: "Following are some quick tips related to Linux Command Line Tools:"
---

Following are some quick tips related to Linux Command Line Tools:

#### [Using SED tool for replacing text in files](http://stackoverflow.com/questions/6945621/using-sed-to-remove-a-block-of-text/36493035#3649303)
The following script can be used for updating all occurrences of a text inside files:

```bash
find folder_name -type f -print0 | xargs -0 sed -i 's/current_text/new_text/g'
```

#### [Using SED tool for removing line that starts with some text in all files](https://stackoverflow.com/questions/8206280/delete-all-lines-beginning-with-a-from-a-file)
The following script can be used for updating all occurrences of a text inside files:

```bash
find . -type f -exec sed -i '/^category:/ d' {} +
```

#### [Using Rsync fore recursive file copy](https://linux.die.net/man/1/rsync)
To use Rsync for copying all mp3 files recursively from one folder to a single folder, use following command: **rsync -avz .*/.*.mp3 destination_folder/**. The command should be issued from the source folder

#### [Viewing number of files in directory](https://linuxconfig.org/wc-1-manual-page)
Use following command for fetching number of files in directory: **ls | wc -l**

#### [Convert pdf files to text files](http://www.cyberciti.biz/faq/converter-pdf-files-to-text-format-command/)
The pdftotext utility which is part of poplar-utils package allows converting pdf files to text files

#### [Automate scp command using sshpass](http://serverfault.com/questions/318474/how-to-pass-password-to-scp-command-used-in-bash-script)
To use the **scp** command non-interactively, for example in a script, we can use the **sshpass** utility.
The following command can be used to copy a file to a remote server:

```bash
sshpass -p '{password}' scp {source_file_name} {remote_user}@{remote_server}:{remote_server_path}
```

#### [Delete downloaded file using Wget](https://linux.die.net/man/1/wget)
The **delete-after** command line option of wget is used to delete the downloaded file

#### [Fetching website resource over https using wget](https://www.gnu.org/software/wget/manual/wget.html)
To fetch a website resource over https, we can use wget command. If the website's https certificate is not trusted by wget, then we can use the **--no-check-certificate switch with wget**. For example:

```bash
wget https://example.com/path_to_resource --no-check-certificate
```

#### [Monitoring user activity with acct package](http://www.tecmint.com/how-to-monitor-user-activity-with-psacct-or-acct-tools/)
The **acct** package provides tools for monitoring user activity. For Centos/Fedora this package is called **psacct**. For Debian based systems it is called **acct**
One of the tools provided by the acct package is called sa. It prints a summary of the command executed by users
Another tool called ac lists the total time for which users have been logged in

#### [Split large files using split command in Linux](http://askubuntu.com/questions/54579/how-to-split-larger-files-into-smaller-parts)
To split a large file into smaller files, we can use the split command that is part of most Linux distributions. For example the following command splits a file into smaller files of size 5 Mb: **split large_file_name -b 5M;**
To combine the file parts back to the original file, we need to use the command: **cat x* > original_file_name**

#### [Using Rsync over custom SSH port](https://linux-tips.com/t/using-custom-port-for-rsync-over-ssh/467/2)
Rsync can be used with custom SSH ports. For example to copy data from a remote server that is running SSH server over port 3000, the following command can be used:

```bash
rsync -avze "ssh -p 3000"  {user}@{server}:{remote_folder} {local_folder}
```

#### [Setting file permissions with rsync](https://unix.stackexchange.com/questions/148264/force-new-permissions-on-files-after-rsync-from-seedbox)
If we need to upload files to a remote server using rsync, and the files need to have certain ownership, then the **chown** option of rsync can be used. For example the following rsync command uploads the contents of the current folder to a remote server and sets the owner and group of the uploaded data to www-data:

```bash
rsync -avz * {remote_user}@{remote_server}/{remote_server_path} --chown=www-data:www-data
```

#### [Rsync over SSH with key authentication](https://andykdocs.de/development/Linux/2013-01-17+Rsync+over+SSH+with+Key+Authentication)
The following rsync command can be used to copy files on a remote server using SSH key authentication:

```bash
rsync --progress -avz -e "ssh -i {key_file_location}" \
remote-user@remote-server:remote-folder local-folder
```

#### [Deleting files older than 1 year using Linux command line tools](https://superuser.com/questions/192425/how-to-delete-files-in-linux-older-than-1-year)
If you want to recursively delete all files in a folder that were modified over 1 year ago, then the following command can be used:

```bash
find folder_path -type f -mtime +365 -ls -exec rm -f -- {} \;
```

#### [Deleting empty folders recursively using Linux command line tools](https://unix.stackexchange.com/questions/46322/how-can-i-recursively-delete-empty-directories-in-my-home-directory)
If you want to recursively delete all folders within a given folder that are empty, then the following command may be used:

```bash
find . -type d -empty -delete
```

The following command can be used to recursively list all empty folders within a given folder:

```bash
find . -type d -empty
```

#### [Renaming multiple files in folder with BASH](https://askubuntu.com/a/643410/547282)
We often have a need to rename all files at once. For example we may need to add a certain text to all files within a folder. We can do this using a programming language. However the Bash programming language allows us to do this very easily using the **rename** command.

For example to add the text "_test" before the file extension to all mp3 files in a directory, we can use the following command:

```bash
rename -n 's/(.*)\.mp3/$1_test.mp3/' *.mp3.
```

This was suggested in an answer to the question [Add text to end of the filename but before extension](https://unix.stackexchange.com/questions/370313/add-text-to-end-of-the-filename-but-before-extension/511382#511382) on StackOverflow.

#### [Recursively change folder ownership](https://stackoverflow.com/questions/3740152/how-do-i-change-permissions-for-a-folder-and-all-of-its-subfolders-and-files-in)
If you want to change the permissions of all folders under current directory to 755

```bash
find . -type d -exec chmod 755 {} \;
```

#### [Appending text to end of file with Bash](https://www.cyberciti.biz/faq/linux-append-text-to-end-of-file/)
To append text to the end of a file in Linux:

```bash
echo "Some new text" >> /tmp/file_name.txt
```
