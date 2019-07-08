import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';
import Button from 'reactstrap/lib/Button';

class Users extends React.Component<any, any>{
  state: any = {
    portfolios: [{}]
  }
  componentDidMount(){
    this.getUsers();    
  }

  getUsers(){
    Axios.get('/api/getPortfolios').then((res: AxiosResponse) => {
      this.setState({portfolios: res.data});
    });
  }
  remove(i: number){
    // console.log(this.state.users[i]);
    delete this.state.portfolios[i];
    this.setState({
      portfolios: this.state.portfolios
    })
  }

  render(){
    let {portfolios} = this.state;
    // console.log(users.splice(1, 1));
    // delete this.state.users[1];
    return (
      <div className="card">
        <header className="card-header">User lists</header>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Likes</th>
                <th>Views</th>
                <th>Comments</th>
                <th>Options</th>
                {/* <th>Online Status</th> */}
              </tr>
            </thead>
            <tbody>
              {portfolios.map((portfolio: any, i: number) => 
                <tr key={i}>
                  <td>{portfolio.title}</td>
                  <td>{portfolio.description}</td>
                  <td>{portfolio.likes}</td>
                  <td>{portfolio.views}</td>
                  <td>{portfolio.comments}</td>
                  <td>
                    <Button onClick={this.remove.bind(this, i)}>Block</Button>
                  </td>
                  {/* <td>{user.online == 1 ? 'Online' : 'Offline'}</td> */}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Users;