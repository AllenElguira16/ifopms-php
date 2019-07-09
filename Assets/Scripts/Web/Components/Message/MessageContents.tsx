import * as React from 'react';
import Axios from 'axios';
import * as io from 'socket.io-client';

export default class MessageContents extends React.Component<any, any>{
  state = {
    messages: [{}]
  }

  loadMsg(receiverId: number){
    Axios.post('/api/messages', {receiverId: receiverId}).then(res => {
      this.setState({
        messages: res.data
      });
    });
  }

  componentDidMount(){
    let { receiver } = this.props;
    this.loadMsg(receiver.id);
  }

  componentWillUpdate(){
    let socket = io(':8000');
    let { receiver } = this.props;
    socket.on('newMessage', () => {
      this.loadMsg(receiver.id);
    });
  }

  detectPosition(message: any){
    let {receiver} = this.props;
    if(message.receiverId == receiver.id){
      return 'd-flex justify-content-end';
    } else {
      return 'd-flex justify-content-start';
    }
  }

  render(){
    let {messages} = this.state;
    return (
      <>
        {messages.length ? messages.map((message: any, i: number) => 
          <div key={i} className={this.detectPosition(message)}>
            <pre>{message.content}</pre>
          </div>
        )
        :
          <div>No messages</div>
        }
      </>
    );
  }
}