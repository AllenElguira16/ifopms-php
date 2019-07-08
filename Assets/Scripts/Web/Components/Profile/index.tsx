import * as React from "react";
import Axios from "axios";
import Portfolios from "./Portfolios";
import Info from "./Info";
import {
  Container, Row, Col
} from "reactstrap";
import PortfolioCard from "../Portfolios/PortfolioCard";
import Portfolio from "../Portfolio";

class Profile extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      user: {},
      loading: true,
      portfolios: [],
      isSameUser: false,
      modal: false,
      currentId: null
    }
  }
  // get Data after component render
  componentWillReceiveProps(props: any){
    // console.log(this.props.match.params.username);
    this.fetchUser(props);
    this.fetchData(props.match.params.username, 'dateCreated');
  }
  componentDidMount() {
    // console.log(this.props.match.params.username);
    this.fetchUser(this.props);
    this.fetchData(this.props.match.params.username, 'dateCreated');
  }
  // Fetch data by the given username
  fetchUser(props: any){
    let {user} = props;
    Axios.get(`/api/user/${props.match.params.username}`).then((res: any) => {
      let profile = res.data[0];
      // setTimeout(() => {
        this.setState({
          user: res.data[0],
          loading: false,
          isSameUser: profile.id == user.id
        })
      // }, 1200);
    });
  }
  fetchData(username: any, sort: string) {
    Axios.post(`/api/portfolios/${username}`, {sort: sort}).then(res => {
      this.setState({
        portfolios: res.data
      });
    });
  }
  onChange(sort: string){
    this.fetchData(this.state.user.username, sort);
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
    let {user, isSameUser, portfolios, modal, currentId} = this.state;
    // console.log(isSameUser);
    if(!this.state.loading){
      return (
        <>
          <div className="jumbotron m-0 p-4">
            <Info user={user} isSameUser={isSameUser} onChange={this.onChange.bind(this)}/>
          </div>
          <Container>
            <Row className="justify-content-around mt-4">
              {portfolios.length !== 0 && portfolios.map((portfolio: any) => 
                <PortfolioCard key={portfolio.id} portfolio={portfolio} toggleModal={this.toggleModal.bind(this)} onClick={this.setCurrentId.bind(this)}/>  
              )}
            </Row>
            <Portfolio toggleModal={this.toggleModal.bind(this)} modal={modal} currentId={currentId}/>
          </Container>
        </>
      );
    }
    else {
      return (<div>Loading</div>);
    }
  }
}
export default Profile;