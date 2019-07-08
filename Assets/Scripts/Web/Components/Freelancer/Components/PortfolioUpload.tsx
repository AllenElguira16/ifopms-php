import * as React from "react";
import Axios from "axios";

import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, Row, FormGroup, Container, Col, Label,
  Input, Button, Alert, Card, CardBody
} from "reactstrap";

class PortfolioUpload extends React.Component<any, any>{
  constructor(props: any) {
    super(props);
    this.state = {
      image: '',
      file: '',
      preview: '',
      title: '',
      desc: '',
      alert: {
        error: '',
        success: ''
      },
      category: '',
      categories: [
        'Computer Programmer',
        'Developer',
        'Software Engineer',
        'System Architect',
        'Web Developer',
        'Graphic Designer'
      ]
    }
  }

  handleInput(e: any) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files.length) {
      this.setState({
        // image: URL.createObjectURL(e.target.files[0]),
        [e.currentTarget.name]: e.currentTarget.files[0]
      })
    }
    if (e.currentTarget.name == 'preview') {
      this.setState({
        image: URL.createObjectURL(e.currentTarget.files[0])
      })
    }
  }
  submit(e: any) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('preview', this.state.preview);
    formData.append('file', this.state.file);
    formData.append('title', this.state.title);
    formData.append('category', this.state.category);
    formData.append('desc', this.state.desc);
    Axios.post('/api/newPost', formData).then(res => {
      console.log(res.data);
      this.setState({
        alert: res.data
      })
      if (res.data.success) {
        this.clearInput();
      }
    });
  }
  clearInput() {
    this.setState({
      image: '',
      preview: '',
      file: '',
      title: '',
      desc: ''
    });
  }
  toggleNotif(e: any) {
    document.querySelector('#zip-file-notice').classList.toggle('d-none');
  }
  render() {
    return (
      <Form onSubmit={this.submit.bind(this)}>
        <header>Add new Project</header>
        <div>
          {(this.state.alert.error) && <Alert color="danger">{this.state.alert.error}</Alert>}
          {(this.state.alert.success) && <Alert color="success">{this.state.alert.success}</Alert>}
          <Row>
            <Col sm={6}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" id="title" onChange={this.handleInput.bind(this)} name="title" value={this.state.title} />
          </FormGroup>
          <FormGroup>
            <Label for="desc">Description</Label>
            <Input type="textarea" id="desc" onChange={this.handleInput.bind(this)} name="desc" value={this.state.desc} />
          </FormGroup>
          <FormGroup>
            <Input type="select" name="category" onChange={this.handleInput.bind(this)}>
              <option value="" selected hidden disabled>Category</option>
              {this.state.categories.map((category: any, i: number) => 
                <option value={category} key={i}>{category}</option>
              )}       
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="file">
              <span>File</span>
            </Label>
            <span className="text-warning" onMouseOver={this.toggleNotif.bind(this)} onMouseOut={this.toggleNotif.bind(this)}>(?)</span>
            <Card className="text-warning position-absolute d-none" id="zip-file-notice" style={{ zIndex: 1 }}>
              <CardBody>note: to upload your portfolio it must be archived in zip file only</CardBody>
            </Card>
            <Input type="file" id="file" onChange={this.onFileChange} name="file" accept=".zip" placeholder="Submit a Portfolio file in ZIP or RAR format" />
          </FormGroup>
          </Col>
            <Col sm={6}>
          <Container className="position-relative border d-flex justify-content-center" style={{ height: 200 }}>
            {this.state.image !== '' && <img src={this.state.image} alt="Image File" className="img-fluid position-absolute h-100" />}
            <FormGroup className="my-auto" style={{ zIndex: 1 }}>
              <Button tag={Label} for="preview">Select Preview Photo</Button>
              <Input onChange={this.onFileChange} name="preview" type="file" id="preview" accept="image/*" style={{ display: "none" }} />
            </FormGroup>
          </Container>
          </Col>
          </Row>
        </div>
        <footer>
          <Button color="primary" type="submit">Submit</Button>
        </footer>
      </Form>
    );
  }
}
export default PortfolioUpload;