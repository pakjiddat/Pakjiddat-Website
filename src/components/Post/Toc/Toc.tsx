import React from 'react'
import * as tocStyles from "./Toc.module.scss";

class Toc extends React.Component {
  render() {

    const tocList = this.props.tocList;
    const visibilityClass = this.props.visibilityClass
    
    return (
      <div className={tocStyles.tocList + " " + visibilityClass} id="toc-box">
        <h5 className={tocStyles.tocHeader}>Table Of Contents</h5>
        <div dangerouslySetInnerHTML={{__html: tocList}} />
      </div>
    )
  }
}

export default Toc;
