import * as React from 'react';
import Axios from 'axios';

export default class Contacts extends React.Component<any, any>{
  state = {
    contacts: [{}]
  }
  componentDidMount(){
    Axios.get('/api/contacts').then(res => {
      this.setState({
        contacts: res.data
      })
    });
  }
  render(){
    let {contacts} = this.state;
    return (
      <div>
        {contacts.length !== 0 && contacts.map((contact: any, i: number) => 
          <div key={i} style={{cursor: "pointer"}} className="border-bottom p-2" onClick={() => this.props.setAsReceiver(contact)}>
            <span>{contact.firstname} {contact.lastname}</span>
          </div>  
        )}
      </div>
    );
  }
}