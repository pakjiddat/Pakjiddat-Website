---
title: Adding Table of Contents to a Gatsby website
date: "2020-04-26"
layout: post
draft: false
path: "/posts/adding-table-of-contents-to-gatsby-website"
tags:
  - "headless cms"

description: "Gatsby is a modern CMS that is well suited for publishing Blog posts. However managing a Gatsby Blog is like managing a web application and can be difficult for those not familiar with Software Development. In this blog post I will describe how I managed to add Table of contents to my Gatsby Blog."
---

### Introduction
Gatsby is a modern CMS that is well suited for publishing Blog posts. However managing a Gatsby Blog is similar to managing a web application and can be difficult for those not familiar with Software Development.

One of the useful features of Gatsby is that it provides a clean separation between the different stages involved in Web Development. For example connecting the blog to a data source, adding features using plugins etc. Features such as Sitemaps, Search Engine Optimization (SEO), Pagination etc can be easily added by installing and configuring plugins. In an earlier post I described my experience with [migrating my blog to Gatsby](/posts/migrating-blog-to-gatsby).

In this blog post I will describe how I managed to add Table of contents to my Gatsby website.

### Table of contents script
My blog was initially based on a custom Php framework called [Pak Php Framework](/posts/pak-php-framework). I had created a script in Php language for [generating table of contents from HTML text](https://gist.github.com/nadirlc/9d1368f86fa3d96bca70a7cd626c8890). After moving my blog to Gatsby, I needed a table of contents for each article.

Gatsby provides a plugin called [Remark Table of Contents](https://www.gatsbyjs.org/packages/gatsby-remark-table-of-contents/), which allows adding a Table of Contents to markdown files. My blog posts were in markdown format. There are about 150 posts on my blog, so it would take some time to add the table of contents code to each file. Also if I wanted to customize the table of contents, it would require editing all 150+ files.

My Gatsby website is based on the [Lumen Starter Theme](gatsbyjs.org/starters/gatsbycentral/gatsby-v2-starter-lumen/). The theme fetches data from Markdown files using GraphQL. It converts the Markdown to HTML and displays the HTML inside React Js template files.

To generate a table of contents I would need JavaScript which extracts HTML headings from HTML text and displays them inside the React Js template. The solution was to convert my [Table of Contents script](https://gist.github.com/nadirlc/9d1368f86fa3d96bca70a7cd626c8890) from Php to JavaScript.

I managed to convert the script and publish it as a NPM module. The NPM package is called [Node.js Table of Contents Generator (TOC)](https://www.npmjs.com/package/@pakjiddat/toc). The script can be used to add table of contents to a Gastby website. It can also be used on other headless CMSs.

The script takes as input article text in HTML format and produces an unordered nested HTML list, which is the table of contents. The script also returns updated article text, which includes heading ids.

### Adding Table of Contents to Gatsby blog
To add Table of Contents, you need to follow these steps:

- Install the table of contents script using the command:
```
npm i @pakjiddat/toc --save
```
- Create a new Gatsby component called Toc. To create the component, create folder called Toc under the **src/components/** folder. Add a file to this folder called **index.jsx** with following contents:

```
import React from 'react'
import './style.scss'

class Toc extends React.Component {
  render() {

    const tocList = this.props.tocList;

    return (
      <div className="toc-list" id="tox-box">
        <h5 class="toc-header">Table Of Contents</h5>
        <div dangerouslySetInnerHTML={{__html: tocList}} />
      </div>
    )
  }
}

export default Toc
```

Next add a file called style.scss with following contents:

```
.toc-list {
  top: 15%;
  left: 76%;
  margin-right: 30px;
  position: fixed;
  border: 2px solid gray;
  border-radius: 2px;
  background-color: white;
  max-height: 350px;
  overflow: auto;
  width: 20%;
}

.toc-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  margin-top: 0;
  background-color: rgba(0,0,0,.03);
  border-bottom: 1px solid rgba(0,0,0,.125);
}

ul {
  margin-bottom: 0 !important;
}

li {
  margin-bottom: 0 !important;
}
```

The **style.scss** file is used to style the table of contents. Update this file if you want to change the look and feel of the table of contents.

- Next import this component into your blog post template file. This can be done using the following code:

```
import Toc from '../Toc'
const toc    = require("@pakjiddat/toc/index");
```

- Next within your blog post template file, generate the table of contents from your article HTML text using:
```
const tocData = toc.Generate(post.html);
```

The above code assumes that your article HTML text is in the **post.html** variable

- Next display the updated article text returned by the table of contents script. The updated article text is in the variable: **tocData.updatedText**. Use this variable instead of the **post.html** variable.

- Add the table of contents component to your post template file using the following code:

```
<Toc tocList={tocData.tocList} />
```

After following  the above steps you should have a table of contents on each blog post.

### Limitations
The table of contents script requires that your article headings are ordered correctly. i.e lower order headings are nested within higher order headings.

### Future work
The table of contents script may be extended so it adds an anchor icon to each article heading. The script may also be extended to support extraction of headings from Markdown files.

### Conclusion
In this blog post I have described how to add table of contents to a Gatsby Blog. The main steps outlined in the article may be applied to other headless CMSs.
