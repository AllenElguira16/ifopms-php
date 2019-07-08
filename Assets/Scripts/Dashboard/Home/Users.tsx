import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';
import Button from 'reactstrap/lib/Button';

class Users extends React.Component<any, any>{
  state: any = {
    users: [{}]
  }
  componentDidMount(){
    this.getUsers();    
  }

  getUsers(){
    Axios.get('/api/users').then((res: AxiosResponse) => {
      this.setState({users: res.data});
    });
  }
  remove(i: number){
    // console.log(this.state.users[i]);
    delete this.state.users[i];
    this.setState({
      users: this.state.users
    })
  }

  render(){
    let {users} = this.state;
    // console.log(users.splice(1, 1));
    // delete this.state.users[1];
    return (
      <div className="card">
        <header className="card-header">User lists</header>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
                <th>Email</th>
                <th>Options</th>
                {/* <th>Online Status</th> */}
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, i: number) => 
                <tr key={i}>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
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