import * as React from 'react';
import { Button, Container } from 'reactstrap';
import MessageForm from './MessageForm';
import Contacts from './Contacts';
import Axios from 'axios';

class Message extends React.Component<P, S>{
  state: S = {
    users: [{}],
    isNewMsg: false,
    receiver: {},
    searchBox: false,
    receiverIsSet: false
  }

  toggleMsg = (data: any) => {
    this.setState({
      isNewMsg: !this.state.isNewMsg,
      receiver: {},
      receiverIsSet: false
    });
  }

  setAsReceiver = (user: any) => {
    this.setState({
      isNewMsg: true,
      searchBox: false,
      receiver: user,
      receiverIsSet: true
    })
  }

  searchUser = (e: React.FormEvent<HTMLInputElement>) => {
    let { currentTarget } = e;
    if (currentTarget.name === 'user') {
      Axios.post('/api/users', { user: currentTarget.value }).then((res: any) => {
        this.setState({
          users: res.data,
        });
      });
      if (currentTarget.value !== '') {
        this.setState({
          searchBox: true
        });
      } else {
        this.setState({
          searchBox: false
        });
      }
    }
  }

  render(){
    let {users, isNewMsg, receiver, searchBox, receiverIsSet} = this.state;
    return(
      <>
        <Container style={{width: 400, height: 400}} className="bg-white">
          {!isNewMsg ? 
            <>
              <header className="d-flex">
                <div className="text-center col-sm-10">Messages</div>
                <Button onClick={this.toggleMsg} color="white"><i className="material-icons col">note_add</i></Button>
              </header>
              <Contacts onClick={this.toggleMsg} setAsReceiver={this.setAsReceiver}/>
            </>
          :
            <MessageForm 
              users={users} 
              searchUser={this.searchUser} 
              receiverIsSet={receiverIsSet} 
              receiver={receiver} 
              searchBox={searchBox} 
              setAsReceiver={this.setAsReceiver} 
              onClick={this.toggleMsg}
            />
          }
        </Container>
      </>
    );
  }
}
export default Message;

interface S {
  users: any,
  isNewMsg: boolean,
  receiver: any,
  searchBox: boolean,
  receiverIsSet: boolean
};

interface P {
  user: Object
};