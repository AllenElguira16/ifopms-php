import * as React from 'react';
import Axios, { AxiosResponse } from 'axios';
import Button from 'reactstrap/lib/Button';

class Jobs extends React.Component<any, any>{
  state: any = {
    jobs: [{}]
  }
  componentDidMount(){
    this.getUsers();    
  }

  getUsers(){
    Axios.get('/api/getAllJobs').then((res: AxiosResponse) => {
      this.setState({jobs: res.data});
    });
  }
  remove(i: number){
    // console.log(this.state.users[i]);
    delete this.state.jobs[i];
    this.setState({
      jobs: this.state.jobs
    })
  }

  render(){
    let {jobs} = this.state;
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
                <th>Location</th>
                {/* <th>Email</th> */}
                <th>Options</th>
                {/* <th>Online Status</th> */}
              </tr>
            </thead>
            <tbody>
              {jobs.map((job: any, i: number) => 
                <tr key={i}>
                  <td>{job.jobTitle}</td>
                  <td>{job.jobDescription}</td>
                  <td>{job.location}</td>
                  {/* <td>{job.email}</td> */}
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
export default Jobs;