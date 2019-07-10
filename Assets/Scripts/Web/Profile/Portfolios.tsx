import * as React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import {
    Row
} from "reactstrap";

class Portfolios extends React.Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
        portfolios: []
    };
  }

  fetchData(username: any) {
    Axios.get(`/api/portfolios/${username}`).then(res => {
      this.setState({
        portfolios: res.data
      });
    });
  }

  componentWillMount(){
    this.fetchData(this.props.username)
  }

  render() {
    return (
      this.state.portfolios.map((portfolios: any) =>
        <div key={portfolios.id} className={this.props.className} title={portfolios.title}>
          <Link to={`/portfolio/${portfolios.id}`}>
            <img src={`/uploads/preview/${portfolios.userId}/${portfolios.title}/${portfolios.preview}`} alt="" className="img-fluid" style={{
              height: 200, 
              width: 200
            }}/>
          </Link>
        </div>
      )
    );
  }
}
export default Portfolios;