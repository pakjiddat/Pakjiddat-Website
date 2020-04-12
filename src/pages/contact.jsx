import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Sidebar from '../components/Sidebar'
import Layout from '../components/Layout'

class ContactRoute extends React.Component {
  render() {

    const { title } = this.props.data.site.siteMetadata

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`Contact Us - ${title}`}</title>
            <meta name="description" content="contact page" />
          </Helmet>
          <Sidebar {...this.props} />
          <div className="content">
            <div className="content__inner">
              <div className="page">
                <h1 className="page__title" id="contact-container">Contact Us</h1>
                <div className="page__body">
                  <p>
                  <form method="post" name="contact" id="contact"
                    netlify-honeypot="bot-field"
                    data-netlify="true">

                    <label for="name">
                      Name:<br/>
                      <input type="text" name="name" id="name" />
                    </label><br/>

                    <label for="email">
                      Email:<br/>
                      <input type="text" name="email" id="email" />
                    </label><br/>

                    <label for="subject">
                      Subject:<br/>
                      <input type="text" name="subject" id="subject" />
                    </label><br/>

                    <br/><label for="message">
                      Message:<br/>
                      <textarea id="message" name="message" rows="5" cols="30"/>
                    </label><br/>

                    <br/><br/>

                    <button type="submit">Send</button>

                    <input type="hidden" name="bot-field" />
                    <input type="hidden" name="form-name" value="contact" />
                  </form>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ContactRoute

export const pageQuery = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          github
          rss
        }
      }
    }
  }
`
