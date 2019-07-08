import * as React from 'react';
import { ModalBody, Modal, ModalHeader, ModalFooter, Button, Row, Col, Card, CardBody } from 'reactstrap';
import * as io from 'socket.io-client';
import Axios, { AxiosResponse } from 'axios';

export default class JobModal extends React.Component<any, any>{
  state: any = {
    alreadyInContacts: false
  }
  toggleModal(e: any){
    this.props.toggleModal();
  }
  openMessage(){
    let socket = io("https://www.ifopms.dev:8000");    
    socket.emit('openMsg');
  }
  componentWillReceiveProps(props: any){
    document.title = 'IFOPMS - Jobs';
    let {job} = props;
    Axios.get(`/api/checkIfAlreadyInContacts/${job.userId}`).then(res => {
      this.setState({
        alreadyInContacts: res.data
      })
    });
  }
  addToContacts(id: number, e: any){
    Axios.post('/api/addToContacts', {id: id}).then((res: AxiosResponse) => {
      if(res.data.success){
        this.setState({
          alreadyInContacts: true
        })
      }
    });
  }

  render() {
    let {alreadyInContacts} = this.state;
    let {job, modal} = this.props;
    // console.log(job);
    return(
      <Modal isOpen={modal} toggle={this.toggleModal.bind(this)} size="xl">
        <ModalHeader toggle={this.toggleModal.bind(this)} className="mx-auto text-center">
          <div className="display-4">{job.jobTitle}</div>
          <div className="text-muted small">{job.firstname} {job.lastname} | {job.location}</div>
          <Button className={`btn-raised rounded-pill`} disabled={alreadyInContacts ? true : false} onClick={this.addToContacts.bind(this, job.userId)}> Add to Contacts </Button>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex">
            <Col sm={8}>{job.jobDescription}</Col>    
            <Col sm={4}>
              <Card>
                <CardBody>
                  <div className="pb-4">
                    <div className="text-muted font-weight-bold small">JOB TYPE</div>
                    <div className="font-weight-bold">{job.type}</div>
                  </div>
                  <div className="pb-4">
                    <div className="text-muted font-weight-bold small">LOCATION</div>
                    <div className="font-weight-bold">{job.location}</div>
                  </div>
                  <div className="pb-4">
                    <div className="text-muted font-weight-bold small">JOB POSTED</div>
                    <div className="font-weight-bold">{job.dateCreated}</div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* <Button onClick={this.openMessage.bind(this)} type="button" color="primary">Message</Button> */}
          <Button onClick={this.toggleModal.bind(this)} type="button">Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}