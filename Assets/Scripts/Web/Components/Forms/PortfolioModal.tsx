import * as React from "react";
import Axios, { AxiosResponse } from "axios";

import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, Row, FormGroup, Container, Col, Label, 
  Input, Button, Alert, Card, CardBody
} from "reactstrap";

class PostModal extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      image: [],
      file: {},
      // preview: '',
      title: '',
      desc: '',
      alert: {
        error: '',
        success: ''
      },
      category: '',
      categories: [{}]
    }
  }

  handleInput(e: any) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.files);
    let {files} = e.currentTarget;
    if(e.currentTarget.name == 'preview'){
      this.setState({
        preview: files[0],
        image: URL.createObjectURL(e.currentTarget.files[0])
      })
    } else {
      if (e.currentTarget.files.length) {
        for(let i = 0; i < files.length; i++){
          let reader = new FileReader;
          reader.readAsDataURL(files[i]);
          reader.onloadend = (e: any) => {
            this.setState({
              image: [...this.state.image, reader.result]
            })
          };
        }
        this.setState({
          file: files
        })
      }
    }
  }
  submit(e: any) {
    e.preventDefault();
    let formData = new FormData();
    // formData.append('preview', this.state.preview);
    Object.keys(this.state.file).map((i: any, file: any) => {
      // console.log(i);
      formData.append('file[]', this.state.file[i]);
    });
    formData.append('category', this.state.category);
    formData.append('title', this.state.title);
    formData.append('desc', this.state.desc);
    Axios.post('/api/newPost', formData).then(res => {
      console.log(res.data);
      this.setState({
        alert: res.data
      })
      if(res.data.success){
        this.clearInput();
      }
    });
  }
  clearInput(){
    this.setState({
      image: [],
      preview: '',
      file: '',
      title: '',
      desc: ''
    });
  }
  toggleNotif(e: any){
    document.querySelector('#zip-file-notice').classList.toggle('d-none');
  }
  componentDidMount(){
    Axios.get('/api/getCategories').then((res: AxiosResponse) => {
      this.setState({
        categories: res.data
      })
    });
  }
  render(){
    // console.log(this.state.file);
    // console.log(this.state.image);
    let {image} = this.state;
    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} size="lg">
        <Form onSubmit={this.submit.bind(this)}>
          <ModalHeader toggle={this.props.toggleModal}>Add new Project</ModalHeader>
          <ModalBody>
            {(this.state.alert.error) && <Alert color="danger">{this.state.alert.error}</Alert>}
            {(this.state.alert.success) && <Alert color="success">{this.state.alert.success}</Alert>}
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" id="title" onChange={this.handleInput.bind(this)} name="title" value={this.state.title}/>
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input type="textarea" id="desc" onChange={this.handleInput.bind(this)} name="desc" value={this.state.desc}/>
            </FormGroup>
            <FormGroup>
              <Label for="file">
                <span>File</span>
              </Label>
              <Input type="file" id="file" onChange={this.onFileChange} name="file" multiple accept="image/*" placeholder="Submit a Portfolio file in ZIP or RAR format"/>
            </FormGroup>
            <FormGroup>
              {/* <Input type="select" name="category" onChange={this.handleInput.bind(this)} value={this.state.category}>
                <option value="" defaultValue="" hidden disabled>Category</option>
                {this.state.categories.map((category: any, i: number) =>
                  <option value={category} key={i}>{category}</option>
                )}
              </Input> */}
              <FormGroup>
                <Input type="select" className="bg-white" name="category" value={this.state.category} onChange={this.handleInput.bind(this)}>
                  <option value="" defaultValue="" hidden disabled>Choose</option>
                  {this.state.categories.map((category: any, i: number) => 
                    <option value={category.id} key={i}>{category.name}</option>
                  )}
                </Input>
              </FormGroup>
            </FormGroup>    
            <Row>
              {image.map((img: any, i: number) => 
                <div key={i} style={{height: 50}}>
                  <img src={img} alt="" className="img-fluid h-100"/>
                </div>  
              )}
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">Submit</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}
export default PostModal;