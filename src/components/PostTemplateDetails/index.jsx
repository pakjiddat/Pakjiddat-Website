import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Toc from '../Toc'
import './style.scss'

const toc    = require("@pakjiddat/toc/index");

class PostTemplateDetails extends React.Component {
  render() {
    const { subtitle } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const tags = post.fields.tagSlugs
    const tocData = toc.Generate(post.html);
    
    let page_html = tocData.updatedText;
    let toc_list = tocData.tocList
    let visibility_class = "visible"
    
    if (tocData.updatedText === "") {
        page_html = post.html
        toc_list = ""
        visibility_class = "hidden"
    }

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">
          All Articles
        </Link>
      </div>
    )

    const tagsBlock = (
      <div className="post-single__tags">
        <ul className="post-single__tags-list">
          {tags &&
            tags.map((tag, i) => (
              <li className="post-single__tags-list-item" key={tag}>
                <Link to={tag} className="post-single__tags-list-item-link">
                  {post.frontmatter.tags[i]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.frontmatter.title}</h1>
            <div
              className="post-single__body"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: page_html }}
            />
            <div className="post-single__date">
              <em>
                Published {moment(post.frontmatter.date).format('D MMM YYYY')}
              </em>
            </div>
          </div>

          <Toc tocList={toc_list} visibilityClass={visibility_class} />
          
          <button id="scroll-btn" className="sidebar-btns" title="Scroll to top" aria-label="Scroll to top"></button>
          <button id="toggle-toc-btn" className={"sidebar-btns " + visibility_class} title="Toggle Table of Contents" aria-label="Toggle Table of Contents"></button>

          <div className="post-single__footer">
            {tagsBlock}
            <hr />
            <p className="post-single__footer-text">
              {subtitle}
            </p>

          </div>
        </div>
      </div>
    )
  }
}

export default PostTemplateDetails
