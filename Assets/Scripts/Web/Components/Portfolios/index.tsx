import * as React from "react";
import Axios from "axios";
import {
  Row, Card, CardImg, CardBody, CardText, CardTitle, Button, 
  Form, FormGroup, Input, Col
} from "reactstrap";
import { Link } from "react-router-dom";
import * as io from 'socket.io-client';
import PortfolioCard from './PortfolioCard';
import Portfolio from "../Portfolio";


class Portfolios extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      portfolios: [],
      isCommentBoxOpen: false,
      modal: false,
      currentId: null
    }
  }

  fetchPortfolio(sort: any): void{
    let {categoryId} = this.props.match.params;
    Axios.post('/api/portfolio', {sort: sort, categoryId}).then((res: any) => {
      // console.log(res.data);
      this.setState({
        portfolios: res.data
      });
    });
  }

  componentDidMount(){
    this.fetchPortfolio('dateCreated');
  }

  componentDidUpdate(){
    let socket = io('https://www.ifopms.dev:8000');
    socket.on('loadPortfolio', (type: any) => {
      this.fetchPortfolio(type);
    });
  }

  toggleModal(e: any){
    e.preventDefault();
    let {modal} = this.state;
    this.setState({
      modal: !modal
    })
  }

  setCurrentId(id: number){
    this.setState({
      currentId: id
    })
  }

  render(){
    let {portfolios, modal, currentId} = this.state;
    return (
      <>
        <Row className="justify-content-between mt-4"> 
          {portfolios.map((portfolio: any) => 
            <PortfolioCard key={portfolio.id} portfolio={portfolio} toggleModal={this.toggleModal.bind(this)} onClick={this.setCurrentId.bind(this)}/>
          )}
        </Row>
        <Portfolio toggleModal={this.toggleModal.bind(this)} modal={modal} currentId={currentId}/>
      </>
    );
  }
}
export default Portfolios;