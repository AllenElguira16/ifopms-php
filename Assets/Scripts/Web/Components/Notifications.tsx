import * as React from 'react';
import { Container, Card, Col, Navbar, Nav, NavItem, NavLink, Table, Row, CardBody, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
class Notifications extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      notifications: []
    }
  }
  componentDidMount(){
    let { user } = this.props;    
    this.fetchNotifs();
  }
  componentWillReceiveProps(props: any){
    let { user } = props;
    this.fetchNotifs();
  }
  fetchNotifs(){
    Axios.get(`/api/notifications`).then(res => {
      this.setState({ notifications: res.data });
    });
  }
  render(){
    let {notifications} = this.state;
    // console.log(notifications);
    return (
      <>
        {notifications.length !== 0 && notifications.map((notif: any) => 
          <DropdownItem>
            <>
              {/* <td> */}
                <img src={`/uploads/profiles/${notif.fellowId}/${notif.file}`} alt="img" className="rounded-circle img-fluid" style={{ height: 30, width: 30 }}/>
                <Link to={`/user/${notif.username}`} className="px-2">@{notif.username}</Link>
              {/* </td>
              <td> */}
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