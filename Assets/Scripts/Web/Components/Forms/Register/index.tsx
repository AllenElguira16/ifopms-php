import * as React from 'react';
import {
  Button, Form, FormGroup, Label, Input, FormText, InputGroup, Row,
  Col, Container, Card, CardBody, CardTitle, UncontrolledAlert, Alert
} from 'reactstrap';
import Axios from 'axios';
import FormContent from './FormContent';

class Register extends React.Component<any, any>{
  state: any = {
    backgroundImage: '',
    registrationType: ''
  }
  setRegistrationType(type: string, backgroundImage: string){
    this.setState({registrationType: type, backgroundImage: backgroundImage});
  }
  toggleForm = (e: any) => {
    console.log('called');
    this.setState({registrationType: ''});
  }
  render(){
    let {backgroundImage, registrationType} = this.state;
    return (
      <>
        <>
          {registrationType === '' ? 
            <>
              <Container>
                  {/* <Row> */}
                  <Col sm={4} className="position-absolute" style={{top: 250}}>
                    <h1 className="text-white">WELCOME!</h1>
                    <h1 className="text-white">WHAT ARE YOU LOOKING FOR?</h1>
                    <Button 
                      type="button" 
                      onClick={this.setRegistrationType.bind(this, 'freelancer', '/images/freelance-reg.jpg')} 
                      block
                      className="btn-raised"
                    >I am here to offer my services.</Button>
                    <Button 
                      type="button" 
                      onClick={this.setRegistrationType.bind(this, 'client', '/images/client-reg.jpg')} 
                      block
                      className="btn-raised"
                    >I am here to look for a freelancer.</Button>
                  </Col>
                  <img src="/images/choose-reg.jpeg" alt="" className="img-fluid w-100" style={{zIndex: -1}}/>
                  {/* <Col sm={8}> */}
                  {/* </Col>
                </Row> */}
              </Container>
            </>
          :
            <Container>
              <Row>
                <FormContent registrationType={registrationType} toggle={this.toggleForm}/>
                <Col sm={8}>
                  <img src={backgroundImage} alt="" className="img-fluid w-100"/>
                </Col>
              </Row>
            </Container>
          }
        </>
      </>
    );
  }
}
export default Register;