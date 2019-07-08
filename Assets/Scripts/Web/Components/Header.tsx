import * as React from "react";
import {
  Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, Collapse, NavLink,
  UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle,
  Input, InputGroup, Button, Card, CardBody, CardTitle
} from "reactstrap";

import { Link } from "react-router-dom";
import Axios from "axios";
import PortfolioModal from "./Forms/PortfolioModal"
import Message from "./Message";
import AddJobs from "./Jobs/AddJobs";
import Notifications from "./Notifications";
import Login from "./Forms/Login";

class Header extends React.Component<any, any>{
  constructor(props: any){
    super(props)
    this.state = {
      input: '',
      portfolios: [],
      isOpen: false,
      modal: false,
      results: {
        projects: [],
        users: []
      }
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  scrollTop(elem: HTMLElement){
    let height: number = elem.scrollHeight;
    window.addEventListener('scroll', () => {
      if (height < window.scrollY) elem.classList.add('fixed-top');
      else elem.classList.remove('fixed-top');
    });
  }

  componentDidMount(){
    // HTMLElement 
    // this.scrollTop(document.querySelector("#header"));
    Axios.post('/api/portfolio', {sort: 'dateCreated'}).then((res: any) => {
      this.setState({
        portfolios: res.data
      });
    });
  }

  clearInput(e: any){
    this.setState({
      input: ''
    });
  }

  // toggleModal
  toggleModal() {
    this.setState((prevState: any) => ({
      modal: !prevState.modal
    }));
  }

  input = (e: React.FormEvent<HTMLInputElement>): void => {
    // console.log(e.);
    this.setState({
      input: e.currentTarget.value
    })
    if(e.currentTarget.value !== ''){
      Axios.get(`/api/search/${e.currentTarget.value}`).then(res => {
        this.setState({results: res.data});
      });
    } else {
      this.setState({
        results: {
          projects: [],
          users: []
        }
      });
    }
  }

  captureEnterKey = (e: React.KeyboardEvent) => {
    if(e.key == 'Enter'){
      let {input} = this.state;
      window.location.href = `/search/${input}`;
    }
  }

  render (){
    let {users, projects} = this.state.results;
    return (
      <header style={{height: "auto"}}>
        <Navbar id="header" expand="sm" color="white">
          <NavbarBrand tag={Link} to="/portfolios"><img src="/images/logo.png" alt="" width="100"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar className="justify-content-end">
            <Nav navbar className="mx-auto">
              {location.pathname !== '/' && 
                <>
                  <NavItem>
                    <Button tag={Link} to="/jobs" className="mr-4 btn-raised nav-link">
                      <span className="mt-1">Jobs</span>
                    </Button>
                  </NavItem>
                  <NavItem className="position-relative">
                    <InputGroup>
                      <Input style={{width: 300}} type="text" onKeyPress={this.captureEnterKey} onChange={this.input} value={this.state.input} placeholder="Search project"/>
                    </InputGroup>
                    {this.state.input !== '' && 
                      <Card className="position-absolute w-100" style={{top: 40, zIndex: 1}}>
                        <CardBody>
                          {/* {project.map((portfolio: any) => 
                            <div key={portfolio.id}>
                              <Link to={`/portfolio/${portfolio.id}`} onClick={this.clearInput.bind(this)}>{portfolio.title}</Link>    
                            </div>)
                          } */}
                          <CardTitle>Projects</CardTitle>
                          {projects.length ? 
                            projects.map((project: any, i: number) => 
                              <div key={i}>
                                <Link to={`/portfolio/${project.id}`}>{project.title}</Link>
                              </div>
                            ) : (
                              <div>No results</div>
                            )
                          }
                          <CardTitle>Users</CardTitle>
                          {users.length ? 
                            users.map((user: any, i: number) => 
                            <div key={i}>
                                <Link to={`/user/${user.username}`}>{user.firstname} {user.lastname}</Link>
                              </div>
                            ) : (
                              <div>No results</div>
                            )
                          }
                        </CardBody>
                      </Card>
                    }
                  </NavItem>
                </>
              }
            </Nav>
            {this.props.user.length === 0 ? 
            <Nav navbar>
              <NavItem>
                <Login />
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/register">Register</NavLink>
              </NavItem>
            </Nav>
              :
            <Nav navbar>
              {/* <AddJobs/> */}
              <Link to="/portfolios" className="p-2">
                <i className="material-icons  mt-1">home</i>
              </Link>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <i className="material-icons  mt-1">home</i>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>S</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <i className="material-icons  mt-1">message</i>
                </DropdownToggle>
                <DropdownMenu right style={{ zIndex: 10}}>
                  <Message user={this.props.user}/>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <i className="material-icons  mt-1">notifications</i>
                </DropdownToggle>
                <DropdownMenu right>
                  <Notifications user={this.props.user}></Notifications>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <img src={`/uploads/profiles/${this.props.user.id}/${this.props.user.file}`} className="rounded-circle img-fluid" style={{height: 30, width: 30}}/>
                </DropdownToggle>
                <DropdownMenu right>
                  {/* {this.props.user.type === 'freelancer' && 
                    <DropdownItem tag={Link} to={`/freelancer/dashboard`}>Dashboard</DropdownItem>
                  } */}
                  <DropdownItem tag={Link} to={`/user/${this.props.user.username}`}>Profile</DropdownItem>
                  <DropdownItem tag={Link} to="/edit-profile">Edit Profile</DropdownItem>
                  <DropdownItem tag="a" href="/api/logout">Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>}
          </Collapse>        
        </Navbar>
        <Navbar style={{zIndex: 0}}>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink tag={Link} to="/jobs">See all Jobs</NavLink>
            </NavItem>
            <NavItem>|</NavItem>
            <NavItem>
              <NavLink tag={Link} to="/portfolios">See all Categories</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </header>
    )
  }
}
export default Header