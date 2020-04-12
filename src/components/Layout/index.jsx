import React from 'react'
import Helmet from 'react-helmet'
import '../../assets/scss/init.scss'
import favicon from '../../assets/favicon.ico';

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="layout">
        <Helmet defaultTitle="Pak Jiddat - Learn and Progress">
          <link rel="icon" href={favicon} />
        </Helmet>
        {children}
      </div>
    )
  }
}

export default Layout
