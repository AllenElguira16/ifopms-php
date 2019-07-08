import * as React from 'react';
import { Form, Button, FormGroup, Input, Card, InputGroup, InputGroupAddon } from 'reactstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import MessageContents from './MessageContents';

export default class MessageForm extends React.Component<Props, State>{
  state: State = {
    users: [{}],
    content: '',
    searchBox: false,
    receiverIsSet: false,
    receiver: {}
  }
  
   
  handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if(Object.keys(this.state).includes(e.currentTarget.name)){
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value
      } as unknown as Pick<State, keyof State>);
    }
  }
    
  submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let {content} = this.state;
    let {receiver} = this.props;
    Axios.post('/api/newMessage', {receiver, content}).then(res => {
      this.setState({content: ''});
    });
  }

  render(){
    let {content} = this.state;
    let {users, receiver, searchBox, receiverIsSet} = this.props;
    // console.log(receiver);
    return(
      <Form onSubmit={this.submit}>
        <header className="d-flex justify-content-end">
          {/* <span>New message</span> */}
          <Button tag={"a"} onClick={this.props.onClick} color="white">Cancel</Button>
        </header>
        <FormGroup>
          {receiverIsSet ? 
            <div className="form-control text-dark">{receiver.username}</div>
          :
            <Input className="text-dark" type="text" disabled={receiverIsSet} name="user" autoComplete="off" onChange={this.props.searchUser} placeholder="Search User"/>
          }
          {searchBox && 
            <Card>
              {users.map((user: any, i: number) => 
                <Button key={i} onClick={this.props.setAsReceiver.bind(this, user)}>
                  <span>{user.username}</span>
                </Button>  
              )}
            </Card>
          }
        </FormGroup>
        <div style={{width: 370, height: 259, overflowY: "auto"}}>
          {receiverIsSet && <MessageContents receiver={receiver}/>}
        </div>
        <InputGroup className="text-dark">
          <Input className="text-dark" type="textarea" style={{ height: 40 }} name="content" onChange={this.handleInput} value={content} placeholder="Send Message" />
          <InputGroupAddon tag={Button} type="submit" color="primary" addonType="append">
            <i className="material-icons">send</i>
          </InputGroupAddon> 
        </InputGroup>
      </Form>
    );
  }
}

interface State{
  users: Array<Object>,
  content: string,
  searchBox: boolean,
  receiverIsSet: boolean,
  receiver: any
}

interface Props{
  users: Array<Object>,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  setAsReceiver: React.MouseEventHandler<HTMLButtonElement>,
  receiverIsSet: boolean,
  receiver: any,
  searchBox: boolean,
  searchUser: any
}


