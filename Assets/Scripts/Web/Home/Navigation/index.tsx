import React from 'react';
import { Navbar, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import PortfolioModal from '../../Forms/PortfolioModal';
import Axios, { AxiosResponse } from 'axios';

class Navigation extends React.Component<any, any>{
  state = {
    categories: [{}],
    modal: false
  }
  loadPortfolio(type: any){
    let socket = io(':8000');
    socket.emit('loadPortfolio', type);
  }
  componentDidMount(){
    Axios.get('/api/getCategories').then((res: AxiosResponse) => {
      this.setState({
        categories: res.data
      })
    });
  }
  toggleModal = () =>{
    this.setState({
      modal: !this.state.modal
    });
  }
  render(){
    let {user} = this.props;
    return (
      <Navbar expand="sm" className="justify-content-between" style={{zIndex: 0}}>
        <Nav navbar>
          {/* <NavItem className="text-light">Featured</NavItem> */}
          
          {user.type === "freelancer" &&
            <Button className="btn-raised border rounded" color="none" onClick={this.toggleModal.bind(this)}>Post Project</Button>
          }
          <PortfolioModal modal={this.state.modal} toggleModal={this.toggleModal}/>
        </Nav>
        <Nav navbar>
          <UncontrolledDropdown nav inNavbar className="px-2">
            <DropdownToggle nav className="btn btn-raised border rounded">Category</DropdownToggle>
            <DropdownMenu right>
            {/* {this.state.category.map((category: any, i: any) => 
              <DropdownItem key={i} >{category}</DropdownItem>                
            )} */}
            {this.state.categories.map((category: any, i: number) => 
              <DropdownItem key={i} onClick={() => 
                location.href = `/portfolios/${category.id}`
              }>{category.name}</DropdownItem>
            )}
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav inNavbar className="px-2">
            <DropdownToggle nav className="btn btn-raised border rounded">Sort By</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.loadPortfolio.bind(this, 'views')}>Views</DropdownItem>
              <DropdownItem onClick={this.loadPortfolio.bind(this, 'likes')}>Likes</DropdownItem>
              <DropdownItem onClick={this.loadPortfolio.bind(this, 'comments')}>Comments</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    )
  }
}
export default Navigation;