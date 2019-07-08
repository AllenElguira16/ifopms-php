import * as React from 'react';
import {
  Col, Navbar, NavItem, NavLink, Nav
} from 'reactstrap';

class MainNav extends React.Component<any, any>{
  render(){
    return (
      <Navbar light>
        <Nav vertical>
          <NavItem>
            <NavLink className="d-flex">
              <i className="material-icons">folder</i>
              <span>RootDirectory</span>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}
export default MainNav;