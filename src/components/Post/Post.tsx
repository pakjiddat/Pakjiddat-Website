import React from "react";

import { Button } from "@/components/Button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import type { Node } from "@/types";

import { Author } from "./Author";
import { Comments } from "./Comments";
import { Content } from "./Content";
import { Meta } from "./Meta";
import { Tags } from "./Tags";

import { Toc } from "./Toc";
const toc    = require("@pakjiddat/toc/index");
import * as tocStyles from "./Toc/Toc.module.scss";

import * as styles from "./Post.module.scss";

interface Props {
  post: Node;
}

const Post: React.FC<Props> = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;
  
  const tocData = toc.Generate(post.html);
  let page_html = tocData.updatedText;
  let toc_list = tocData.tocList
  let visibility_class = tocStyles.visible
    
  if (tocData.updatedText === "") {
    page_html = post.html
    toc_list = ""
    visibility_class = "hidden"
  }
    
  return (
    <div className={styles.post}>
      <div className={styles.buttons}>
        <Button className={styles.buttonArticles} title="All Articles" to="/" />
        <ThemeSwitcher />
      </div>

      <div className={styles.content}>
        <Content body={page_html} title={title} />
      </div>

      <Toc tocList={toc_list} visibilityClass={visibility_class} />    
      <button id="scroll-btn" className={tocStyles.sidebarBtns + " " + tocStyles.scrollBtn} title="Scroll to top" aria-label="Scroll to top"></button>
      <button id="toggle-toc-btn" className={tocStyles.sidebarBtns + " " + visibility_class + " " + tocStyles.toggleTocBtn} title="Toggle Table of Contents" aria-label="Toggle Table of Contents"></button>
          
      <div className={styles.footer}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles.comments}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
