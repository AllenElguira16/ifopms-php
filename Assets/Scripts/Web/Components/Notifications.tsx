import * as React from 'react';
import { Container, Card, Col, Navbar, Nav, NavItem, NavLink, Table, Row, CardBody, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Axios, { AxiosResponse } from 'axios';
class Notifications extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      notifications: []
    }
  }
  
  componentDidMount(){
    this.fetchNotifs();
  }
  // componentWillReceiveProps(props: any){
  //   this.fetchNotifs();
  // }
  async fetchNotifs(){
    let { data }: AxiosResponse = await Axios.get(`/api/notifications`)
    // .then(res => {
    this.setState({ notifications: data });
    // });
  }
  
  render(){
    let {notifications} = this.state;
    // console.log(notifications);
    return (
      <>
        {notifications.length !== 0 && notifications.map((notif: any, i: number) => 
          <DropdownItem key={i}>
            <>
              <img src={`/uploads/profiles/${notif.fellowId}/${notif.file}`} alt="img" className="rounded-circle img-fluid" style={{ height: 30, width: 30 }}/>
              <Link to={`/user/${notif.username}`} className="px-2">@{notif.username}</Link>
              {notif.type === 'like' && 
                <>
                <span>liked your </span>
                <Link to={`/portfolio/${notif.portfolioId}`}>{` project`}</Link>
                </>
              }
              {notif.type === 'comment' &&
                <>
                <span>commented your </span>
                <Link to={`/portfolio/${notif.portfolioId}`}>{` project`}</Link>
                </>
              }
            </>
          </DropdownItem>
        )}
      </>
    );
  }
}
export default Notifications;