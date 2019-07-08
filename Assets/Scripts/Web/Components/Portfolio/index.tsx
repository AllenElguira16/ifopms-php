import * as React from 'react';
import Axios from 'axios';
import UserPortfolios from "./UserPortfolios";
import Comment from "./Comment/Comment";
import { Link } from 'react-router-dom';
import { 
  Col, Container, Card, CardImg, CardBody, Row, CardHeader, Modal, ModalHeader, ModalBody, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import LikeNav from "./LikeNav";
import File from "../File";
import Content from './Content';

class Portfolio extends React.PureComponent<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      portfolio: {},
      loading: true,
      commentOpen: false,
      user: {}
    }
    console.log('yow');
  } 

  fetchData(id: any){
    Axios.get(`/api/portfolio/${id}`).then(res => {
      this.setState({
        portfolio: res.data[0],
        loading: false
      })
    });
  }

  toggleComment(e: any){
    e.preventDefault();
    this.setState({
      commentOpen: !this.state.commentOpen
    });
  }

  componentDidMount(){
    Axios.get('/api/getUser').then(res => {
      this.setState({
        user: res.data
      })
    });
  }

  componentWillReceiveProps(props: any){
    let {currentId} = props;
    console.log(props);
    if(currentId !== null){
      this.fetchData(currentId);
    }
  }

  render(){
    let {portfolio, loading, user} = this.state;
    let {modal} = this.props;
    // if(!this.state.loading){
      return (
        <div>
          <Modal isOpen={modal} toggle={this.props.toggleModal} size="xl">
            {!loading ? 
              <>
                <ModalHeader toggle={this.props.toggleModal}>
                  <div>
                    <span>{portfolio.title}</span>
                    {/* <Button className="rounded-circle" color="none">
                      <i className="material-icons align-middle">edit</i>
                    </Button> */}
                    <UncontrolledDropdown tag={"span"}>
                      <DropdownToggle color="white" className="">
                        <i className="material-icons">edit</i>
                      </DropdownToggle>
                      <DropdownMenu left>
                        <DropdownItem>Edit</DropdownItem>
                        <DropdownItem>Delete</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>  
                  <div className="small">
                    <span className="text-muted"> By </span><Link to={`/user/${portfolio.username}`}>{portfolio.username}</Link>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div className="border-bottom pb-4" style={{whiteSpace: "pre-line"}}>{portfolio.description}</div>
                  <div className="wrapper position-relative overflow-hidden">
                    <Content portfolio={portfolio}/>
                  </div>
                  <Row>
                    <Col sm={8}>
                      {user.id !== undefined ?  
                        <>
                          <LikeNav userId={portfolio.userId} id={portfolio.id} toggleComment={this.toggleComment.bind(this)} commentOpen={this.state.commentOpen}/>
                          {this.state.commentOpen && <Comment portfolioId={portfolio.id}/> }
                        </>
                      : 
                      <Link to="/login">Login first</Link>}
                    </Col>
                    <Col sm={4}>
                      <UserPortfolios portfolio={portfolio}></UserPortfolios>
                    </Col>
                  </Row>
                </ModalBody>
              </>
            :
            <Container>Loading...</Container>
          }
          </Modal>
          {/* <header className="p-5 bg-light">
            <Container>
              <h5>{portfolio.title}</h5>
              <span><span className="text-muted">By</span><Link to={`/user/${portfolio.username}`}>{portfolio.username}</Link></span>
            </Container>
          </header>
          <div className="wrapper position-relative overflow-hidden">
            <Content portfolio={portfolio}/>
          </div>
          <div className="p-5 bg-light">
            <Container>
              <Row>
                <Col sm={8}>
                  <div className="border-bottom pb-4" style={{whiteSpace: "pre-line"}}>{portfolio.description}</div>
                  {user.id !== undefined ?  
                    <>
                      <LikeNav userId={portfolio.userId} id={portfolio.id} toggleComment={this.toggleComment.bind(this)} commentOpen={this.state.commentOpen}/>
                      {this.state.commentOpen && <Comment portfolioId={portfolio.id}/> }
                    </>
                  : 
                  <Link to="/login">Login first</Link>}
                </Col>
                <Col sm={4}>
                  <UserPortfolios portfolio={portfolio}></UserPortfolios>
                </Col>
              </Row>
            </Container>
          </div> */}
        </div>
      );
    // } 
    // else {
    //   return (
    //     <Container>
    //       Loading...
    //     </Container>
    //   )
    // }
  }
}
export default Portfolio;