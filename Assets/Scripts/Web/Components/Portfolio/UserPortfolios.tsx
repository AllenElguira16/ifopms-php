import * as React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import {
  Row
} from "reactstrap";

class UserPortfolios extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      portfolios: []
    };
  }

  fetchData(portfolio: any){
    let count = 0;
    let data;
    Axios.post(`/api/portfolios/${portfolio.username}`, {sort: 'dateCreated'}).then((res: any) => {
      res.data.map((portfolios: any) => {
        if(portfolios.id === portfolio.id){
            res.data.splice(count, 1);
        }
        count++;
      });
      this.setState({
        portfolios: res.data
      });
    });
  }

  componentWillReceiveProps(props: any){
    let portfolio = this.props.portfolio;
    if(portfolio.id !== props.portfolio.id){
      this.fetchData(props.portfolio);
    }
  }

  componentDidMount(){
    this.fetchData(this.props.portfolio)
  }

  render(){
    let portfolio = this.props.portfolio;
    return (
      this.state.portfolios.length !== 0 &&
      <aside>
        <header>More from <Link to={`/user/${portfolio.username}`}>{portfolio.username}</Link></header>
        <Row>
        {this.state.portfolios.map((portfolios: any) =>
          <div key={portfolios.id} className="col-sm-6">
            <Link to={`/portfolio/${portfolios.id}`}>
              <img src={`/uploads/preview/${portfolios.userId}/${portfolios.title}/${portfolios.preview}`} alt="" className="img-fluid"/>
            </Link>
          </div>
        )}
        </Row>
      </aside>
    );
  }
}
export default UserPortfolios;