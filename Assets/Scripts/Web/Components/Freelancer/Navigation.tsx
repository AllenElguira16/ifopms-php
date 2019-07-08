import * as React from 'react';
import { Col, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class Navigation extends React.Component<any, any>{
  render(){
    return (
      <Col md={2} className="border-right" style={{height: `100vh`}}>
        <Nav vertical>
          <NavItem>
            <NavLink tag={Link} to={`/Hello`}>User Account Settings</NavLink>
            <NavLink tag={Link} to={`/Hello`}>Gallery Settings</NavLink>
            <NavLink tag={Link} to={`/Hello`}>View Gallery</NavLink>
            <NavLink tag={Link} to={`/dashboard/upload`}>Upload</NavLink>
          </NavItem>
        </Nav>
      </Col>
    )
  }
}
export default Navigation;