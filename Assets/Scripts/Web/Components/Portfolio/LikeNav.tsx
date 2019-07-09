import * as React from 'react';
import {
  Col
} from "reactstrap";
import Axios from 'axios';
import * as io from "socket.io-client";
class LikeNav extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      likeCount: null,
      iLiked: false,
      user: {}
    }
  }

  likePortfolio(e: any) {
    e.preventDefault();
    Axios.post(`/api/like/${this.props.id}`);
  }
  
  fetchLikes(){
    Axios.get(`/api/portfolio/${this.props.id}/likes`).then((res: any) => {
      if(res.data.length === 0){
        this.setState({
          iLiked: false,
          likeCount: null
        });
      } else {
        res.data.map((like: any) => {
          this.setState({iLiked: like.userId === this.state.user.id ? true : false});
        });
        this.setState({likeCount: res.data.length})
      }
    });
  }

  fetchUser(){
    Axios.get('/api/userDetails').then((res: any) => {
      this.setState({user: res.data});
    });
  }

  componentWillUpdate(){
    let socket = io(':8000');
    socket.on('updateLike', () => {
      this.fetchLikes();
    });
  }
  
  componentDidMount(){
    this.fetchUser();
    this.fetchLikes();
  }

  // componentWillReceiveProps(){
  //   this.fetchUser();
  //   this.fetchLikes();
  // }

  render(){
    return (
      <div>
        <div className="border-bottom py-2">
          {this.state.likeCount !== null && <span>{this.state.likeCount} likes</span>}
        </div>
        <div className="border-bottom py-2 d-flex react">
          <Col tag="a" href="#" sm={6} onClick={this.likePortfolio.bind(this)} 
            className={(this.state.iLiked ? 'liked ' : '') + `justify-content-center d-flex align-items-center`}
            // className="justify-content-center d-flex align-items-center"
          >
            <i className="material-icons">thumb_up</i>
            <span className="p-2">Like</span>
            {/* <small className="mx-2">9</small> */}
          </Col>
          <Col tag="a" href="#" sm={6}
            onClick={this.props.toggleComment.bind(this)}
            className={(this.props.commentOpen ? 'comment-open ' : '') + `justify-content-center d-flex align-items-center`}
          >
            <i className="material-icons">comment</i>
            <span className="p-2">Comment</span>
            {/* <small className="mx-2">9</small> */}
          </Col>
        </div>
      </div>
    );
  }
}
export default LikeNav;