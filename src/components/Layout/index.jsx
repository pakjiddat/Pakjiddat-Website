import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import favicon from '../../assets/favicon.ico';
import { withPrefix } from "gatsby"

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="Pak Jiddat - Learn and Progress">
          <link rel="icon" href={favicon} />
          <meta name="google-site-verification" content="CAokBpzRMO8MEvNysqxb-CtlLXdz-mVmtyun26wXCPw" />
          <script src={withPrefix('sidebar-btns.js')} type="text/javascript" />
        </Helmet>
        {children}
      </div>
    )
  }
}

export default Layout
