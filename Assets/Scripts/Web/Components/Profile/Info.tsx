import * as React from "react";
import { Button, Container, Row, Col, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import PortfolioModal from "../Forms/PortfolioModal";
import { Link } from "react-router-dom";
import Axios, { AxiosResponse } from 'axios';

class Info extends React.Component<any, any>{
  state: any = {
    modal: false,
    isFollowed: false,
    follow: {
      follower: 0,
      following: 0
    },
    alreadyInContacts: false
  }
  onChange(sort: any){
    this.props.onChange(sort);
  }
  toggleModal = () =>{
    this.setState({
      modal: !this.state.modal
    });
  }

  followUser(id: number){
    Axios.post('/api/follow', {following: id}).then((res: any) => {
      // console.log(res.data);
      this.setState({
        isFollowed: !this.state.isFollowed
      });
    });
  }
  totality(id: number){
    Axios.post('/api/totalFollow', {id}).then(res => {
      this.setState({
        follow: res.data
      });
    });
  }
  componentWillReceiveProps(props: any){
    Axios.post('/api/checkIfFollowed', {id: props.user.id}).then(res => {
      this.setState({
        isFollowed: res.data
      })
    });
    Axios.get(`/api/checkIfAlreadyInContacts/${props.user.id}`).then(res => {
      this.setState({
        alreadyInContacts: res.data
      })
    });
    this.totality(props.user.id);
  }
  addToContacts(id: number, e: any){
    Axios.post('/api/addToContacts', {id: id}).then((res: AxiosResponse) => {
      if(res.data.success){
        this.setState({
          alreadyInContacts: true
        })
      }
    });
  }
  render(){
    let { isSameUser, user } = this.props;
    let { isFollowed, follow, alreadyInContacts } = this.state;
    return (
      <Container>
        <div className="d-flex justify-content-between">
          <div>
            <h1 className="display-2">{user.firstname} {user.lastname}</h1>
            <div>
              <span>{follow.follower} Followers <strong>&#8226;</strong> {follow.following} Following</span>
            </div>
          </div>
          <div>
            <img src={`/uploads/profiles/${user.id}/${user.file}`} alt="profile picture" className="rounded-circle" style={{height: 200, width: 200}}/>
          </div>
        </div>
        <div className="d-flex">
          {/* <div> */}
            {isSameUser && 
              <>
                {/* <Button className="btn-raised rounded-pill text-dark" color="light">Portfolio</Button> */}
                {user.type === "freelancer" &&
                  <Button className="rounded-pill" color="none" onClick={this.toggleModal.bind(this)}>
                    {/* <i className="material-icons align-middle" onClick={this.toggleModal.bind(this)}>add</i> */}
                    Post Jobs
                  </Button>
                }
                <PortfolioModal modal={this.state.modal} toggleModal={this.toggleModal}/>
              </>
            }
            {/* <UncontrolledDropdown>
              <DropdownToggle className="btn-raised text-dark rounded-pill" color="light">Sort By</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.onChange.bind(this, 'views')}>Views</DropdownItem>
                <DropdownItem onClick={this.onChange.bind(this, 'likes')}>Likes</DropdownItem>
                <DropdownItem onClick={this.onChange.bind(this, 'comments')}>Comments</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            {!isSameUser &&
              <Button className={`btn-raised rounded-pill`} disabled={alreadyInContacts ? true : false} onClick={this.addToContacts.bind(this, user.id)}> Add to Contacts </Button>
            }

            {/* {!isSameUser && <Button onClick={this.followUser.bind(this, user.id)}>Follow</Button>} */}
            {!isSameUser ?
              !isFollowed ? 
                <Button className="btn-raised rounded-pill" color="primary" onClick={this.followUser.bind(this, user.id)}>Follow</Button>
              : 
                <Button className="btn-raised rounded-pill" color="secondary" onClick={this.followUser.bind(this, user.id)}>Unfollow</Button>
            : ''
            }
          {/* </div> */}
        </div>
      </Container>
    );
  }
}
export default Info;