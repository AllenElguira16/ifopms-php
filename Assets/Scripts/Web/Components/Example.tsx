import * as React from 'react';
import {
  Input, Form, FormGroup, Button
} from 'reactstrap';
import Axios from 'axios';

class Example extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      folder: ''
    }
  }
  onChange(e: any){
    let files = e.target.files;
    this.setState({
      folder: files
    })
  }
  submit(e: any){
    e.preventDefault();
    let form = new FormData();
    form.set('file', '');
    for(let i = 0; i < this.state.folder.length; i++){
      // console.log(this.state.folder[i]);
      // console.log(i);
      form.append('file', this.state.folder[i]);
    }
    Axios.post('/api/example', form, {
      headers: {
        'ContentType': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res.data);
    });
  }
  
  render (){
    // console.log(this.state.folder);
    return (
      <div>
        <Form onSubmit={this.submit.bind(this)} encType="multipart/form-data">
          <FormGroup>
            <Input type="file" name="file[]" id="FileUpload" onChange={this.onChange.bind(this)} webkitdirectory="true" directory="true" />
            <Button type="submit">Submit</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default Example;