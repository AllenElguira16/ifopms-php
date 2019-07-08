import * as React from 'react';
import { Col, Card, CardImg, CardBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import PortfolioStatus from './portfolioStatus';

class Portfolio extends React.Component<any, any>{
  // state = {
  //   modal: false
  // }
  onClick(id: any, e: React.MouseEvent<HTMLElement>){
    console.log(this.props);
    this.props.toggleModal(e);
    this.props.onClick(id);
  }
  render(){
    let { portfolio } = this.props;
    return (
      <Col tag={"a"} href="#" onClick={this.onClick.bind(this, portfolio.id)} sm={3} className="justify-content-around text-decoration-none">
        {/* <Card tag={Link} to={`/portfolio/${portfolio.id}`} title={portfolio.title} className="shadow text-decoration-none text-dark p-2"> */}
        {/* <button className="btn position-absolute" style={{
          right: "-10px",
          top: "-20px",
          zIndex: 1
        }}><i className="material-icons">settings</i></button> */}
        {/* <UncontrolledDropdown className="btn position-absolute" style={{
          right: "-10px",
          top: "-20px",
          zIndex: 1
        }}>
          <DropdownToggle color="white">
            <i className="material-icons">settings</i>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        <Card title={portfolio.title} className="shadow text-decoration-none text-dark p-2" style={{zIndex: -1}}>
          <CardImg top src={`/uploads/preview/${portfolio.userId}/${portfolio.title}/${portfolio.preview}`} className="img-fluid" style={{ height: 200 }} />
          <CardBody className='p-0'>
            <PortfolioStatus className="d-flex px-0 py-2 justify-content-end" portfolio={portfolio} />
          </CardBody>
        </Card>
        <div className="py-2 d-flex align-items-center">
          <img src={`/uploads/profiles/${portfolio.userId}/${portfolio.profile}`} className="rounded-circle img-fluid" style={{ height: 30, width: 30 }} />
          <Link className="px-2" to={`/user/${portfolio.username}`}>@{portfolio.username}</Link>
        </div>
      </Col>
    );
  }
}
export default Portfolio;