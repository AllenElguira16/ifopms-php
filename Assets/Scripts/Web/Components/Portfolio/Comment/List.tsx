import * as React from "react";
import * as io from "socket.io-client";
import Axios from "axios";


class CommentList extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      comments: []
    }
  }

  componentDidMount(){
    this.fetchComments();
  }

  componentWillUpdate(){
    let socket = io('https://www.ifopms.dev:8000');
    socket.on('newComment', () => this.fetchComments());
  }
  // fetch comments
  fetchComments(){
    Axios.get(`/api/portfolio/${this.props.portfolioId}/comments`).then((res: any) => {
      this.setState({
        comments: res.data
      });
    })
  }

  render(){
    return (
      this.state.comments.map((comment: any)=> 
        <div key={comment.id} className="border-bottom pt-2">
          <h6>@{comment.username}</h6>
          <p>{comment.content}</p>
        </div>
      )
    );
  }
}
export default CommentList;