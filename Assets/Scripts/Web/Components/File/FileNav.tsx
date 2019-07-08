import * as React from 'react';
import {
  Navbar, Nav, NavItem, NavLink
} from 'reactstrap';

class FileNav extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      currentDir: props.rootDir,
    }
  }
  handleClick(type: any, e: any){
    if(type == 'back'){
      this.props.onClick(`${this.state.currentDir}`);
    }
  }
  render(){
    return (
      <Navbar light>
        <Nav>
          <NavItem>
            <NavLink href="#" onClick={this.handleClick.bind(this, 'back')}>
              <i className="material-icons">arrow_back</i>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={this.handleClick.bind(this, 'forward')}>
              <i className="material-icons">arrow_forward</i></NavLink>
            </NavItem>
          <NavItem>
            <span>File/Folder</span>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
export default FileNav;