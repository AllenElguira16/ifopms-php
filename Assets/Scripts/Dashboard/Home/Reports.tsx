import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';
import Button from 'reactstrap/lib/Button';

class Users extends React.Component<any, any>{
  state: any = {
    reports: [{
        username: 'MarvinSingh',
        accused: 'Kramkram',
        reason: 'plagiarized'
      },{
        username: 'MarvinSingh',
        accused: 'Kramkram',
        reason: 'plagiarized'
      },{
        username: 'MarvinSingh',
        accused: 'Kramkram',
        reason: 'plagiarized'
      },{
        username: 'MarvinSingh',
        accused: 'Kramkram',
        reason: 'plagiarized'
      }
    ]
  }

  remove(i: number){
    // console.log(this.state.users[i]);
    delete this.state.users[i];
    this.setState({
      users: this.state.users
    })
  }

  render(){
    let {reports} = this.state;
    // console.log(users.splice(1, 1));
    // delete this.state.users[1];
    return (
      <div className="card">
        <header className="card-header">User lists</header>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Accused</th>
                <th>Report</th>
                {/* <th></th> */}
                <th>Options</th>
                {/* <th>Online Status</th> */}
              </tr>
            </thead>
            <tbody>
              {reports.map((report: any, i: number) => 
                <tr key={i}>
                  <td>{report.username}</td>
                  <td>{report.accused}</td>
                  <td>{report.reason}</td>
                  {/* <td>{user.username}</td>
                  <td>{user.email}</td> */}
                  <td>
                    <Button onClick={this.remove.bind(this, i)}>Block</Button>
                  </td>
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