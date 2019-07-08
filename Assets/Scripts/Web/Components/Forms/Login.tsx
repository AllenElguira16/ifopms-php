import * as React from 'react';
import {
  Button, Form, FormGroup, Label, Input, FormText, InputGroup,
  Col, Container, Card, CardBody, CardTitle, UncontrolledAlert, Alert, Modal, ModalHeader, ModalBody, NavLink
} from 'reactstrap';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends React.Component<any, any>{
  constructor(props: any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      alert: '',
      modal: false
    }
  }
  handleSubmit(e: any) {
    e.preventDefault();
    
    let form = {
      username: this.state.username,
      password: this.state.password,
    }
    // console.log(this.state)
    Axios.post("/api/login", form).then(res => {
      if (res.data.error) {
        this.setState({
          alert: res.data.error
        })
      } else if (res.data.success) {
        if(this.state.username == 'admin' && this.state.username == 'admin'){
          window.location.href = "/dashboard"
        }
        window.location.href = "/"
      }
    });
  }
  handleInput(e: any) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  toggleModal(){
    this.setState({
      modal: !this.state.modal
    })
  }
  render() {
    let {modal} = this.state;
    return (
      // <Container tag={Col} sm={8}>
      <>
        <NavLink tag={Button} onClick={this.toggleModal.bind(this)}>Login</NavLink>
        <Modal isOpen={modal} toggle={this.toggleModal.bind(this)}>
          {/* <CardBody> */}
            <ModalHeader toggle={this.toggleModal.bind(this)}>
              <h4>Login</h4>
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                  <Input onChange={this.handleInput.bind(this)} type="text" id="username" name="username" placeholder="Username" />
                </FormGroup>
                <FormGroup>
                  <Input onChange={this.handleInput.bind(this)} type="password" id="password" name="password" placeholder="Password" />
                </FormGroup>
                {this.state.alert.length !== 0 && <Alert color="danger">{this.state.alert}</Alert>}
                <FormGroup>
                  <Button type="submit" color="primary" className="ml-auto rounded-pill">Login</Button>
                </FormGroup>
              </Form>
            </ModalBody>
          {/* </CardBody> */}
        </Modal>
      </>
      // </Container>
    );
  }
}
export default Login;