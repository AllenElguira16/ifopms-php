import * as React from 'react';
import { Container, Card, Col, Navbar, Nav, NavItem, NavLink, Table, Row, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';

class Content extends React.Component<any, any>{
  render(){
    return (
      <Container>
        <Notifications user={this.props.user}></Notifications>
        {/* <header>Messages: </header>
        <Card tag={Table} className="w-100">
          <CardBody tag={"tbody"}>
            <tr>
              <td className="row">
                <img src="" alt="img" />
                <div>
                  <Link to={`/user`}>User</Link>
                  <span>Hi sir bla bla bla bla bla blabla bla </span>
                </div>
              </td>
            </tr>
          </CardBody>
        </Card> */}
      </Container>
    );
  }
}
export default Content;