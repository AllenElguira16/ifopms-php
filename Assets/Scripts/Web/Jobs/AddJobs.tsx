import * as React from "react";
import {
  Container,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Axios, { AxiosResponse } from "axios";

export default class AddJobs extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modal: false,
      // companyName: '',
      categories: [],
      jobTitle: "",
      jobDescription: "",
      location: ""
      // type: ''
    };
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    let { jobTitle, jobDescription, location } = this.state;
    Axios.post("/api/addJobs", {
      jobTitle,
      jobDescription,
      location
    }).then((res: AxiosResponse) => {
      alert("Success");
    });
  };

  componentDidMount() {
    Axios.get("/api/getCategories").then(res => {
      this.setState({
        categories: res.data
      });
    });
  }

  render() {
    let { modal, categories } = this.state;
    // console.log(this.props);
    return (
      <>
        <Button
          className="btn-raised"
          color="dark"
          onClick={this.toggleModal.bind(this)}
        >
          Post Jobs
        </Button>
        <Modal isOpen={modal} toggle={this.toggleModal.bind(this)}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <ModalHeader toggle={this.toggleModal.bind(this)}>
              Post jobs
            </ModalHeader>
            <ModalBody>
              {/* <FormGroup>
                <Label>Company Name</Label>
                <Input type="text" name="companyName" value={this.state.companyName} onChange={this.handleInput}/>
              </FormGroup> */}

              <FormGroup>
                <Label>Job Title</Label>
                <Input
                  type="select"
                  name="jobTitle"
                  value={this.state.jobTitle}
                  onChange={this.handleInput}
                >
                  <option value="" defaultValue="" hidden disabled>
                    Choose
                  </option>
                  {categories.map((title: any, i: number) => (
                    <option value={title.name} key={i}>
                      {title.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Job description</Label>
                <Input
                  type="textarea"
                  name="jobDescription"
                  value={this.state.jobDescription}
                  onChange={this.handleInput}
                />
              </FormGroup>
              <FormGroup>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleInput}
                />
              </FormGroup>
              {/* <FormGroup>
                <Label>Type</Label>
                <Input type="select" name="type" value={this.state.type} onChange={this.handleInput}>
                  <option value="" defaultValue="" hidden disabled>Choose</option>
                  <option value="1">Fulltime</option>
                  <option value="2">Parttime</option>
                </Input>
              </FormGroup> */}
            </ModalBody>
            <ModalFooter>
              <Button type="submit">Add</Button>
              <Button onClick={this.toggleModal.bind(this)} type="button">
                Close
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </>
    );
  }
}
