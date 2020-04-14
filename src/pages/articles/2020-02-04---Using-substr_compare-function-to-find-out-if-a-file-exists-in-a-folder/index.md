---
title: Using substr_compare function to find out if a file exists in a folder
date: "2018-08-04"
layout: post
draft: false
path: "/posts/using-substr-compare-function-to-find-out-if-a-file-exists-in-a-folder"
tags:
  - "php"
description: "The substr_compare function is a useful function that can be used to check if a given string occurs at the end of a larger string."
---

The [substr_compare](http://php.net/manual/en/function.substr-compare.php) function is a useful function that can be used to check if a given string occurs at the end of a larger string.

We can use the **substr_compare** function to check if a given file name segment occurs at the end of a given path. It can be used to implement a function that checks recursively if a file segment is present in a folder

The offset argument of the substr_compare function is set to the length of the file to search multiplied by -1. The length parameter is set to the length of the file name segment to be searched. The following code can be used. It checks if a string occurs at the end of a given string:

```
/** The file name segment is prefixed with '/' */
$file_name         = "/" . ltrim($file_name, "/");
/** The length of the file name */
$file_name_length  = strlen($file_name);
/** The offset at which to start the comparison. It is negative, so it is taken to be from the end of the string */
$offset            = (-1 * $file_name_length);   
/** If the file name segment occurs at the end of the item path */
if (substr_compare($item_path, $file_name, $offset, $file_name_length) === 0) {
    /** The function returns true */
    return true;
}
/** The function returns false */
else return false;
```

Another option is to simply split the string into two parts using explode function and then check if the second array element matches the file name segment. The following code may be used:

```
/** The larger string is split on the file name */
$path_segments = explode($file_name, $item_path);
/** If the second array element matches the file name, then the function returns true */
if ($path_segments[1] == $file_name) return true;
else return false;
```
