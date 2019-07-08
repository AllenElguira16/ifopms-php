import * as React from 'react';
import { Col, Form, CardTitle, FormGroup, InputGroup, Input, Alert, Button, Container, Label } from 'reactstrap';
import Axios from 'axios';

class FormContent extends React.Component<any, any>{
  constructor(props: any){
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      repassword: '',
      image: '',
      file: '',
      alert: '',
      type: '',
    }
  }
  handleSubmit(e: any){
    e.preventDefault();
    let form = new FormData();
    form.append('file', this.state.file);
    form.append('firstname', this.state.firstname);
    form.append('lastname', this.state.lastname);
    form.append('email', this.state.email);
    form.append('username', this.state.username);
    form.append('password', this.state.password);
    form.append('repassword', this.state.repassword);
    form.append('type', this.props.registrationType);
    Axios.post("/api/register", form).then(res => {
      if(res.data.error){
        this.setState({alert: res.data.error})
      } else if(res.data.success) {
        window.location.href = "/"
      }
    });
  }
  handleInput(e: any){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleUserType(param: any){
    this.setState({type: param.type});
  }
  filePreview(e: any){
    if (e.target.files.length) {
      this.setState({
        image: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0]
      })
    }
  }
  render(){
    // let {registrationType} = this.props;
    return(
      <Col tag={Form} onSubmit={this.handleSubmit.bind(this)}>
        <CardTitle>
          <h4>Register</h4>
        </CardTitle>
        <FormGroup>
          <InputGroup>
            <Input onChange={this.handleInput.bind(this)} type="text" id="firstname" name="firstname" placeholder="Firstname"/>
            <Input onChange={this.handleInput.bind(this)} type="text" id="lastname" name="lastname" placeholder="Lastname" />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Input onChange={this.handleInput.bind(this)} type="email" id="email" name="email" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Input onChange={this.handleInput.bind(this)} type="text" id="username" name="username" placeholder="Username"/>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <Input onChange={this.handleInput.bind(this)} type="password" id="password" name="password" placeholder="Password" />
            <Input onChange={this.handleInput.bind(this)} type="password" id="repassword" name="repassword" placeholder="Re-Enter Password" />
          </InputGroup>
        </FormGroup>
        {this.state.alert.length !== 0 &&
          <Alert color="danger">{this.state.alert}</Alert>
        }
        <Container className="position-relative border d-flex justify-content-center" style={{ height: "200px" }}>
          {this.state.image !== '' &&
            <img src={this.state.image} alt="Image File" className="img-fluid position-absolute h-100" />
          }
          <FormGroup className="my-auto" style={{ zIndex: 1 }}>
            {this.state.file == '' ? 
              <Button tag={Label} for="file">Choose Profile Picture</Button>
            :
              <Button tag={Label} for="file">Change Profile Picture</Button>
            }
            <Input onChange={this.filePreview.bind(this)} type="file" id="file" style={{ display: "none" }} />
          </FormGroup>
        </Container>
        <FormGroup className="mt-2" inline>
          <Button type="submit" color="primary" className="ml-auto rounded-pill">Register</Button>
          <Button type="button" color="primary" className="ml-auto rounded-pill" onClick={() => this.props.toggle}>Back</Button>
        </FormGroup>
      </Col>
    )
  }
}
export default FormContent;