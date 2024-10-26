import React from "react";

import { useSiteMetadata } from "@/hooks";
import { getContactHref } from "@/utils";

import * as styles from "./Author.module.scss";

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles.author}>
      <p className={styles.bio}>
        {author.bio}
        <a
          className={styles.twitter}
          href={getContactHref("twitter", author.contacts.twitter)}
          rel="noopener noreferrer"
          target="_blank"
        >          
        </a>
      </p>
    </div>
  );
};

export default Author;
