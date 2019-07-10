import * as React from 'react';
import { Container, Button, InputGroup, Input, FormGroup } from 'reactstrap';
import Axios from 'axios';

class EditProfile extends React.Component<any, any>{
  state: any = {
    firstname: '',
    lastname: '',
    username: '',
    about: '',
    location: ''
  }
  submit = () => {
    let state = this.state;
    let form = {
      firstname: state.firstname,
      lastname: state.lastname,
      username: state.username,
      about: state.about,
      location: state.location,
    };
    Axios.post('/api/updateProfile', {form}).then((res: any) => {
      if(res.data.success){
        alert('Profile edited');
      } else {
        alert('Profile editing unsuccesfully');
      }
    });
  }
  fillTextBox(user: any){
    this.setState({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      about: user.about,
      location: user.location,
    });
  }
  componentWillReceiveProps(props: any){
    let {user}: any = props;
    this.fillTextBox(user);
  }
  componentDidMount(){
    let {user}: any = this.props;
    this.fillTextBox(user);
  }
  onChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render(){
    let {user} = this.props;
    // this.fetchUser(user);
    return (
      <Container>
        <header className="d-flex justify-content-between">
          <span>
            <h1>Edit Profile</h1>
            <span>People on bla bla bla</span>
          </span>
          <span>
            <Button color="light">Cancel</Button>
            <Button color="secondary" onClick={this.submit}>Done</Button>
          </span>
        </header>
        <section>
          <div>
            <img src={`/uploads/profiles/${user.id}/${user.file}`} alt="" className="rounded-circle img-fluid" style={{height: 120, width: 120}}/>
            <Button color="light" className="btn-raised">Change</Button>
          </div>
          <FormGroup>
            <div className="row">
              <div className="col">
                <label htmlFor="Firstname">First Name</label>
                <Input type="text" name="firstname" onChange={this.onChange} value={this.state.firstname}/>
              </div>
              <div className="col">
                <label htmlFor="Lastname">Last Name</label>
                <Input type="text" name="lastname" onChange={this.onChange} value={this.state.lastname}/>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <div>
              <label htmlFor="Username">Username</label>
              www.behance.test/user/<Input type="text" onChange={this.onChange} name="username" value={this.state.username}/>
            </div>
          </FormGroup>
          <FormGroup>
            <div>
              <label htmlFor="about">About your profile</label>
              <Input type="textarea" placeholder="Write a little bit about yourself here" name="about" onChange={this.onChange} value={this.state.about}/>
            </div>
          </FormGroup>
          <FormGroup>
            <div>
              <label htmlFor="location">Location</label>
              <Input type="text" name="location" value={this.state.location} onChange={this.onChange}/>
            </div>
          </FormGroup>
        </section>
      </Container>
    );
  }
}
export default EditProfile;