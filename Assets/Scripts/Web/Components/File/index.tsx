import * as React from 'react';
import {
  Table, Container, Col, Row
} from "reactstrap";
import Content from './Content';
import Axios from 'axios';
import Preview from './Preview';

class File extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      files: [],
      loading: true,
      modal: false,
      currentFile: {},
      rootDir: ''
    }
  }

  loadFolder(dir: string){
    Axios.post('/api/file', { dir: dir }).then(res => {
      this.setState({
        rootDir: dir,
        files: res.data,
        loading: false
      });
    });
  }

  componentWillReceiveProps(props: any){
    this.loadFolder(props.dir);
  }

  componentDidMount(){
    this.loadFolder(this.props.dir);
  }

  filePreview(file: any){
    this.setState({
      currentFile: file
    })
    this.toggle();
  }

  toggle(){
    this.setState({
      modal: !this.state.modal
    })
  }

  render(){
    if(!this.state.loading){
      return (
        <Container className={this.props.className}>
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Type</th>
                <th>Size</th>
              </tr>
            </thead>
            <Content rootDir={this.state.rootDir} filePreview={this.filePreview.bind(this)} loadFolder={this.loadFolder.bind(this)} files={this.state.files}/>
          </Table>
          <Preview modal={this.state.modal} toggle={this.toggle.bind(this)} file={this.state.currentFile}/>
        </Container>
      )
    } else {
      return <div>Loading</div>
    }
  }
}
export default File;