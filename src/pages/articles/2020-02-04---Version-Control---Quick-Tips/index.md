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

```bash
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

```bash
git config --global http.postBuffer 157286400
```

#### [Updating last commit without changing annotated tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
If you need to make modifications to the last commit of a Git Repository, without making changes to the annotated tags, then the following script may be used. The script also updates the remote repository.

```bash
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

#### [Update commit message history](https://help.github.com/en/github/committing-changes-to-your-project/changing-a-commit-message)
To rename previous commit messages, enter the command:

```bash
git rebase -i HEAD~n
```

In the above command **n** is the number of commits back in history since the last commit. The command will cause the command line editor to open with the last **n** commit messages. Each commit message is prefix with the text: **pick**. Replace this with **reword** for the commit message that needs to be updated.

Next save the changes and exit the editor. This will cause a new editor window to open allowing editing of a commit message. After changing the commit message, save the changes and exit the editor. The editor will open up again allowing editing of the next commit message. Do this for each commit message that needs to be updated.

#### [Editing particular commit](https://stackoverflow.com/questions/1186535/how-to-modify-a-specified-commit)
To edit files belonging to a particular commit, enter the command:

```
git rebase --interactive 'SHA-1^'
```

SHA-1 is the hash for the particular commit. It can be found using the command: **git log --oneline**

This will open a command line editor which will list all commits made after the particular commit. Change the text "pick" to "edit" besides the particular commit. Save the changes and exit the editor.

This will switch the HEAD to the given commit and will copy the commit files to the current working tree. The current working tree will be just like it was when the commit was made. Next make the necessary changes to the files and commit the changes using the command:

```
 git commit --all --amend --no-edit
 ```

 After that enter the command:

 ```
 git rebase --continue
 ```

This will make the changes to the particular commit and will switch the HEAD back to the master branch. After that the changes can be pushed to the configured remote git repository using the command:

 ```
 git push -u origin master --force
 ```
 
#### [Removing large files from all commits](https://htmlpreview.github.io/?https://github.com/newren/git-filter-repo/blob/docs/html/git-filter-repo.html)
To remove large files from all commits in a git repository, the git-filter-repo tool can be used. To install the tool follow this [install guide](https://newbedev.com/how-do-you-install-git-filter-repo).

Next run the following command to remove the directory dir1/dir2 from all commits:

```
git-filter-repo --path "dir1/dir2" --invert-paths
```

The **path** option specifies the files or folders to include. The **invert-paths** option inverts the paths so the end result is that all files and folder except those given by the **path** option are included. In this way files and folders can be removed.

The git-filter-repo supports many other options including removing objects larger than given size and editing commit messages.

#### [Tagging specific commit](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
To tag a specific commit, the following command can be used:

```
git tag -a tag-version commit-checksum -m "commit messsage"
```

The above command adds an annotated tag named "tag-version". The commit-checksum is the checksum of the commit. It can be found using the command:

```
git log --oneline
``` 


```
git-filter-repo --path "dir1/dir2" --invert-paths
```

The **path** option specifies the files or folders to include. The **invert-paths** option inverts the paths so the end result is that all files and folder except those given by the **path** option are included. In this way files and folders can be removed.

The git-filter-repo supports many other options including removing objects larger than given size and editing commit messages.



