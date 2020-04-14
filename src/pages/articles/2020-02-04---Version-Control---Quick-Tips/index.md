---
title: Version Control - Quick Tips
date: "2019-04-03"
layout: post
draft: false
path: "/posts/version-control---quick-tips"
tags:
  - "quick tips"
  - "version control"
description: "Following are some quick tips related to Version Control:"
---

Following are some quick tips related to Version Control:

#### [Changing a remote GIT repository URL](https://help.github.com/en/articles/changing-a-remotes-url)
The following command can be used to set the URL of a remote git repository: **git remote set-url origin {remote-repo-url}**

#### [Error in pushing changes to remote git repository](https://confluence.atlassian.com/stashkb/error-rpc-failed-result-22-push-to-stash-fails-604537633.html)
If we have a git repository with large files, and we need to push changes to a remote repository, then we might get the following error:

```
Counting objects: 9554, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (5064/5064), done.
Writing objects: 100% (9554/9554), 2.79 GiB | 694.00 KiB/s, done.
Total 9554 (delta 4382), reused 9554 (delta 4382)
error: RPC failed; result=22, HTTP code = 502
fatal: The remote end hung up unexpectedly
fatal: The remote end hung up unexpectedly
Everything up-to-date
```

To correct this error we need to increase the size of the git configuration variable http.postBuffer. We can do this with the command:

```
git config --global http.postBuffer 157286400
```

#### [Updating last commit without changing annotated tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
If you need to make modifications to the last commit of a Git Repository, without making changes to the annotated tags, then the following script may be used. The script also updates the remote repository.

```
# add changes to staging area
git add .
# changes in the staging area are added to the last commit. last commit message can also be changed
git commit --amend
# the annotated tag called "v1.0.0" is deleted. this should be the most recent annotated tag
git tag -d v1.0.0
# the most recent annotated tag is deleted from the remote server
git push origin --delete v1.0.0
# a new annotated tag is added, pointing to the last commit
git tag -a v1.0.0 -m "initial commit"
# the last commit is pushed to the remote repository
git push origin master -f
# all annotated tags are pushed to the remote repository
git push --tags
```

#### [Storing password in SVN](http://stackoverflow.com/questions/2899209/how-to-save-password-when-using-subversion-from-the-console)
To store password for SVN commit commands, set store-passwords and store-plaintext-passwords to yes in **/home/home_folder_name/.subversion/servers**. To set the user name in the commit command, append **--username {your-user-name}** to the SVN commit command.
