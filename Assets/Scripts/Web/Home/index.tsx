import React from "react";
import Axios, { AxiosResponse } from "axios";
import Portfolios from "../PortfoliosHome/Portfolios";
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
      categories: [],
      categoryInput: '',
      searchInput: '',
    }
  }

  submit(e: any){
    e.preventDefault();
    window.location.href = `/portfolios/${this.state.categoryInput}`;
  }

  handlePostContent(e: any){
    this.setState({ postContent: e.target.value });
  }

  async componentDidMount(){
    let {data}: AxiosResponse = await Axios.get('/api/getCategories')
    this.setState({ categories: data })
  }

  handleInputChange(e: any){
    this.setState({ [e.currentTarget.name]: e.currentTarget.value })
  }

  render(){
    let {categories, categoryInput, searchInput} = this.state;
    return (
      <>
        <Container className="d-flex justify-content-around position-absolute " style={{top: 400, left: 0, right: 0}}>
          <Form className="w-100" method="POST" onSubmit={this.submit.bind(this)}>
            <Row className="justify-content-center"> 
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
              <Col md={2}>
                <Button type="submit" color="primary" className="btn-raised">Get Started</Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <img src="/images/bg.jpg" alt="home bg" className="img-fluid"/>
      </>
    );
  }
}
export default Home;