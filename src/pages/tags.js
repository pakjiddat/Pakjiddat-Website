import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"
import startCase from "lodash/startCase"

// Components
import { Link, graphql } from "gatsby"
import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
<Layout>
      <Sidebar />
      <Page title="Tags">
        <ul>
        {group.map(tag => (
          <li key={tag.fieldValue}>
            <Link to={`/tag/${kebabCase(tag.fieldValue)}/`}>
              {startCase(tag.fieldValue)} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
      </Page>
    </Layout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: { frontmatter: { tags: SELECT }}) {
        fieldValue
        totalCount
      }
    }
  }
`
