import React from "react";
import Axios from "axios";
import Portfolios from "./Portfolios";
import {
  Container, Jumbotron, Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarBrand
} from "reactstrap";
import { Link } from "react-router-dom";
import Navigation from "../Home/Navigation";

class PortfoliosHome extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      postContent: ''
    }
  }

  submit(e: any){
    e.preventDefault();
    Axios.post('/api/newPost', {postContent: this.state.postContent}).then((res: any) => {
      this.setState({
        postContent: ''
      })
    });
  }

  handlePostContent(e: any){
    this.setState({
      postContent: e.target.value
    });
  }

  render(){
    return (
      <>
        <Jumbotron className="mb-0 p-0 bg-white">
          <Container>
            <img src="/Images/heading.jpg" alt="header" className="img-fluid"/>
            {/* <Container>
              <div className="text-center py-5"> */}
                {/* <h1 style={{ textShadow: "2px 2px #000"}} className="lemon-milk">IT FREELANCERS ONLINE PORTFOLIO MANAGEMENT SYSTEM</h1> */}
              {/* </div>
            </Container> */}
          </Container>
        </Jumbotron>
        <Container>
          <Navigation {...this.props}/>
          <Portfolios {...this.props}/>
        </Container>
      </>
    );
  }
}
export default PortfoliosHome;