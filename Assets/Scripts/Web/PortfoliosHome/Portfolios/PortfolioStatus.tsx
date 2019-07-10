import * as React from 'react';

class PortfolioStatus extends React.Component<any, any>{
  render(){
    let portfolio = this.props.portfolio;
    return (
      <div className={this.props.className}>
        <span className="d-flex align-items-center mx-1">
          <i className="material-icons">visibility</i>
          <small className="m-1">{portfolio.views}</small>
        </span>
        <span className="d-flex align-items-center mx-1">
          <i className="material-icons">message</i>
          <small className="m-1">{portfolio.comments}</small>
        </span>
        <span className="d-flex align-items-center mx-1">
          <i className="material-icons">thumb_up</i>
          <small className="m-1">{portfolio.likes}</small>
        </span>
      </div>
    )
  }
}
export default PortfolioStatus;