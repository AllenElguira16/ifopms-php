import * as React from 'react'
import { Container, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Users from './Users';
import Projects from './Projects';
import Jobs from './Jobs';
import Reports from './Reports';

class Home extends React.Component<any, any>{
  render () {
    return (
      <Container>
        <Col sm={4} className="bg-secondary mx-auto">
          <img src="/images/logo.png" alt="IFOPMSLogo" className="img-fluid"/>
        </Col>
        <Nav tabs>
          <NavItem>
            <NavLink tag={Link} to="/dashboard">Users</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/dashboard/projects">Projects</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/dashboard/jobs">Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/dashboard/reports">Reports</NavLink>
          </NavItem>
        </Nav>
        <Card>
        <Route exact path="/dashboard" component={Users} />
        <Route exact path="/dashboard/projects" component={Projects} />
        <Route exact path="/dashboard/jobs" component={Jobs} />
        <Route exact path="/dashboard/reports" component={Reports} />
          {/* <Route path="/dashboard/" component={(props: any) => 
            <Login {...props} setAsLoggedIn={this.setAsLoggedIn}/>
          }/> */}
        </Card>
      </Container>
    )
  }
}
export default Home