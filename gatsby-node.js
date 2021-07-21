const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post-template.jsx')
    const tagTemplate = path.resolve('./src/templates/tag-template.jsx')
    const indexTemplate = path.resolve('./src/templates/index-template.jsx')

    graphql(`
      {
        allMarkdownRemark(
          limit: 1000
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                layout
              }
            }
          }
        }
      }
    `).then(result => {

      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      const posts = result.data.allMarkdownRemark.edges
      const postsPerPage = 5
      const numPages = Math.ceil(posts.length / postsPerPage)
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/` : `/page/${i + 1}`,
          component: indexTemplate,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
          },
        })
      });

      _.each(result.data.allMarkdownRemark.edges, edge => {

        if (_.get(edge, 'node.frontmatter.layout') === 'post') {

          createPage({
            path: edge.node.fields.slug,
            component: slash(postTemplate),
            context: { slug: edge.node.fields.slug },
          })

          let tags = []
          if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }

          tags = _.uniq(tags)
          _.each(tags, tag => {
            const tagPath = `/tags/${_.kebabCase(tag)}/`
            createPage({
              path: tagPath,
              component: tagTemplate,
              context: { tag },
            })
          })

        }
      })

      resolve()
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`
    createNodeField({ node, name: 'slug', value: slug })
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent)    
    
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path
    }
    else if (typeof fileNode.fields !== 'undefined') {
      slug = fileNode.fields.slug
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }
  }
}
