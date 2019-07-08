import * as React from 'react';
import {Jumbotron, Container, Row} from 'reactstrap';
import Axios from 'axios';
import JobCard from './JobCard';
import AddJobs from './AddJobs';

export default class Jobs extends React.Component<any, any>{
  state = {
    jobs: [{}]
  }
  componentDidMount(){
    Axios.get('/api/getJobs').then(res => {
      this.setState({jobs: res.data});
    });
  }
  render() {
    let {jobs} = this.state;
    let {user} = this.props;
    // console.log();
    return (
      <>
        <Jumbotron className="text-center shadow">
          <div className="display-2">Find Creative Jobs</div>
          <div>Discover your next career move, freelance gig or internship</div>
        </Jumbotron>
        <Container>
          {user.length !== 0 && <AddJobs />}
          <Row>
            {jobs.map((job: any, i: number) => 
              <JobCard key={i} job={job} className="col-sm-3 m-2"/>  
            )}
          </Row>
        </Container>
      </>
    );
  }
}