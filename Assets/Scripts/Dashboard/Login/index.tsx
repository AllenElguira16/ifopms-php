import * as React from 'react'
import { Card, Container, CardBody, Button, Form, FormGroup, Input, Col } from 'reactstrap';

class Login extends React.Component<any, any>{
  state: any = {
    username: '',
    password: ''
  };
  render() {
    return(
      <Container >
        <Col sm={4} className="bg-secondary mx-auto">
          <img src="/images/logo.png" alt="IFOPMSLogo" className="img-fluid"/>
        </Col>
        <hr/>
        <Col sm={6} className="mx-auto">
          <Card>
            <CardBody>
              <Form onClick={this.submit}>
                <FormGroup>
                  <label htmlFor="">Username</label>
                  <Input type="text" placeholder="Username" name="username" onChange={this.handleInput}/>
                </FormGroup>
                <FormGroup>
                  <label htmlFor="">Password</label>
                  <Input type="password" placeholder="Password" name="password" onChange={this.handleInput}/>
                </FormGroup>
                <Button type="submit">Log in</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Container>
    )
  }
  /**
   * handle input
   */
  private handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  
  private submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let {username, password} = this.state;
    if(username === 'admin' && password === 'admin'){
      console.log(this.props);
      this.props.setAsLoggedIn();
    }    
  }

}

export default Login;