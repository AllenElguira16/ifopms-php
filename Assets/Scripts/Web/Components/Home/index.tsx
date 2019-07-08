import * as React from "react";
import Axios, { AxiosResponse } from "axios";
import Portfolios from "../Portfolios";
import {
  Container, Jumbotron, Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarBrand, Form, FormGroup, Input, Col, Button, InputGroup, Row
} from "reactstrap";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

class Home extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      postContent: '',
      categories: [{}],
      categoryInput: '',
      searchInput: '',
    }
  }

  submit(e: any){
    e.preventDefault();
    // Axios.post('/api/newPost', {postContent: this.state.postContent}).then((res: any) => {
    //   this.setState({
    //     postContent: ''
    //   })
    // });
    window.location.href = `/portfolios/${this.state.categoryInput}`;
  }

  handlePostContent(e: any){
    this.setState({
      postContent: e.target.value
    });
  }

  componentDidMount(){
    Axios.get('/api/getCategories').then((res: AxiosResponse) => {
      this.setState({
        categories: res.data
      })
    });
  }

  handleInputChange(e: any){
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  render(){
    let {categories, categoryInput, searchInput} = this.state;
    // console.log(categories);
    return (
      <>
        {/* <div className="position-absolute"> */}
        <Container className="d-flex justify-content-around position-absolute " style={{top: 400, left: 0, right: 0}}>
          {/* <Col lg={10}> */}
            <Form className="w-100" method="POST" onSubmit={this.submit.bind(this)}>
              <Row form="true" className="justify-content-center"> 
                <Col md={6}>
                  <FormGroup>
                    <Input type="select" className="bg-white" name="categoryInput" value={categoryInput} onChange={this.handleInputChange.bind(this)}>
                      <option value="" defaultValue="" hidden disabled>Choose</option>
                      {categories.map((category: any, i: number) => 
                        <option value={category.id} key={i}>{category.name}</option>
                      )}
                    </Input>
                  </FormGroup>
                </Col>
                {/* <Col md={8}>
                  <FormGroup>
                    <Input type="text" className="bg-white" placeholder="Search projects" name="searchInput" value={searchInput} onChange={this.handleInputChange.bind(this)}/>
                  </FormGroup>
                </Col> */}
                <Col md={2}>
                  <Button type="submit" color="primary" className="btn-raised">Get Started</Button>
                </Col>
              </Row>
            </Form>
          {/* </Col> */}
        </Container>
        <img src="/images/bg.jpg" alt="home bg" className="img-fluid"/>
        {/* </div> */}
      </>
    );
  }
}
export default Home;