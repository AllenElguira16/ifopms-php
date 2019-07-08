import * as React from 'react';
import { Container, Card, Col, Navbar, Nav, NavItem, NavLink, Table, Row, CardBody } from 'reactstrap';
import Navigation from './Navigation';
import Content from './Components/Content'
import {Route} from 'react-router-dom';
import PortfolioUpload from './Components/PortfolioUpload';

class Freelancer extends React.Component<any, any>{
  
  render(){
    // console.log(this.props);
    let {user} = this.props;
    return (
      <Row>
        <Navigation></Navigation>
        <Col md={8}>
          <Route exact path="/dashboard" render={(props: any) => <Content {...props} user={user}/>  } />
          <Route exact path="/dashboard/upload" component={PortfolioUpload}/>
        </Col>
        <Col>
        
        </Col>
      </Row>
    )
  }
}
export default Freelancer;