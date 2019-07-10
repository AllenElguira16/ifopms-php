import * as React from 'react';
import { Card, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
import JobModal from './JobModal'

export default class JobCard extends React.Component<any, any>{
  state: any = {
    modal: false
  }
  toggleModal = (e: any) => {
    this.setState({modal: !this.state.modal});
  }
  render() {
    let {job, className} = this.props;
    let {modal} = this.state;
    return (
      <Card className={className} onClick={this.toggleModal.bind(this)} style={{cursor: "pointer"}}>
        <CardBody>
          <CardText className="">
            <span className="d-block px-1">{job.firstname} {job.lastname}</span>
            <span className="d-block small text-muted"><i className="material-icons align-middle">location_on</i>{job.location}</span>
          </CardText>
          <CardTitle>{job.jobTitle}</CardTitle>
          <CardText className="small text-muted">{job.jobDescription}</CardText>
          <CardFooter className="bg-white small p-0">
            <span>
              <i className="material-icons align-middle">work</i>
              <span>{job.type}</span>
            </span>
            <span>
              <i className="material-icons align-middle">watch_later</i>
              <span>9 hours ago</span>
            </span>
            {/* <span><i className="material-icons">watch_later</i>{job.dateCreated}</span> */}
          </CardFooter>
        </CardBody>
        <JobModal job={job} modal={modal} toggleModal={this.toggleModal.bind(this)}/>
      </Card>
    );
  }
}