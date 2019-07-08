import * as React from 'react';
import { 
  Modal, ModalHeader, ModalBody 
} from 'reactstrap';
class Preview extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      modal: false
    }
  }

  render(){
    // console.log(this.props.file !== {});
    if(this.props.file.data !== undefined){
      return(
        <div>
          <Modal size="lg" isOpen={this.props.modal} toggle={this.props.toggle.bind(this)} >
            <ModalHeader toggle={this.props.toggle.bind(this)}>{this.props.file.title}</ModalHeader>
            <ModalBody>
            {this.props.file.data !== '' && this.props.file.type.match(/image/) && <img className="img-fluid" src={this.props.file.data} alt=""/>}
            {this.props.file.data !== '' && this.props.file.type.match(/text/) && <pre className="pre-scrollable"><code>{this.props.file.data}</code></pre>}
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return <div></div>
    }
  }
}
export default Preview;