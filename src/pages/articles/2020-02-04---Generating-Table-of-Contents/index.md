---
title: Generating Table of Contents
date: "2019-03-16"
layout: post
draft: false
path: "/posts/generating-table-of-contents"
category: "algorithms"
tags:
  - "algorithms"
description: "Table of contents gives an overview of the article. It describes what the article contains. A quick glance at the table of contents gives a useful overview of the article. Most articles have a table of contents which contains links to the important parts of an article."
---

### Introduction
Table of contents gives an overview of the article. It describes what the article contains. A quick glance at the table of contents gives a useful overview of the article. Most articles have a table of contents which contains links to the important parts of an article.

### Basic Usage
To generate a table of contents using PHP, the following code can be used:

```
$toc = new TOC();
$toc_data = $toc->GenerateToc($article_text);
```

### How the code works
In the above code, the **$article_text** is the article for which the table of contents needs to be generated. The **$toc_data** variable is an associative array containing two entries.

The **toc_list** entry is the table of contents formatted as an unordered HTML list. The **updated_text** is the updated article text. The headings in this updated text are marked with ids, so when the user clicks on a link in the table of contents, it scrolls to the article heading

The code for generating the table of contents does three things. First it extracts the headings from the article text using regular expressions. The headings are extracted recursively. Next the script generates an unordered HTML list from the extracted headings. After that the script updates the article text, adding ids to the HTML headings

### Features
The script extracts all heading tags from h1-h6. It also adds ids to the article text. The table of contents is an unordered HTML list. Each item in the list is a link to a heading.

In the article text a heading level may be skipped. For example h5 headings can follow a h3 heading

### Limitations
The headings in the article text must be nested. So after h1, there must be a lower level heading such as **h2, h3, h4, h5, or h6**.

[Download PHP class for generating Table of Contents](https://gist.github.com/nadirlc/9d1368f86fa3d96bca70a7cd626c8890)
