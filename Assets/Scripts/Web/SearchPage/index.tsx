import * as React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class SearchPage extends React.Component<any, any>{
  state: any = {
    searchResults: {
      projects: [],
      users: []
    }
  }
  componentDidMount(){
    let {search} = this.props.match.params;
    Axios.get(`/api/search/${search}`).then(res => {
      // console.log(res.data);
      this.setState({searchResults: res.data});
    });
  }
  render(){
    let {projects, users} = this.state.searchResults;
    // console.log(this.state.searchResults);
    return(
      <div className="container">
        <div className="card my-4">
          <div className="card-header">
            <span>Portfolios</span>
          </div>
          <div className="card-body">
            {projects.length !== 0 ? 
              projects.map((project: any, i: number) => 
                <div key={i}>
                  <Link to={`/portfolio/${project.id}`}>{project.title}</Link>
                </div>
              ) : (
                <div>No results</div>
              )
            }
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span>Users</span>
          </div>
          <div className="card-body">
            {users.length !== 0 ? 
              users.map((user: any, i: number) => 
              <div key={i}>
                  <Link to={`/user/${user.username}`}>{user.firstname} {user.lastname}</Link>
                </div>
              ) : (
                <div>No results</div>
              )
            }
          </div>
        </div>
        {/* {searchResults.length && searchResults.map((result: any, i: number) => 
          <div key={i}>Search</div>  
        )} */}
      </div>
    );
  }
}