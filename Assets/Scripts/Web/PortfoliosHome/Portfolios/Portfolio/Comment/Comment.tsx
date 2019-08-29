import * as React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

import CommentList from "./List";
import Axios, { AxiosResponse } from "axios";

class Comment extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      comment: ""
    };
  }
  handleInput(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }
  submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    Axios.post("/api/newComments", {
      comment: this.state.comment,
      portfolioId: this.props.portfolioId
    }).then((res: AxiosResponse) => {
      if (res.data.success) {
        this.setState({
          comment: ""
        });
      }
    });
  }
  render() {
    return (
      <div>
        <h5>Comments</h5>
        <Form onSubmit={this.submit.bind(this)}>
          <FormGroup>
            <Input
              type="text"
              name="comment"
              autoComplete="off"
              value={this.state.comment}
              onChange={this.handleInput.bind(this)}
              placeholder="Add a comment"
            />
            <CommentList portfolioId={this.props.portfolioId}></CommentList>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
export default Comment;
