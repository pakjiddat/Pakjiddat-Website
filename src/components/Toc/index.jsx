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
