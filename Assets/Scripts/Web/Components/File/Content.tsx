import * as React from 'react';
import Axios from 'axios';

class Content extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      isRoot: true
    }
  }
  icon(type: string){
    if(type.match(/directory/)){
      return 'folder'
    } else if(type.match(/(image)/)) {
      return 'photo';
    } else if(type.match(/(text)/)){
      return 'description';
    } 
  }
  onClick(file: any, e: any){
    if(file.type.match(/directory/)){
      this.props.loadFolder(`${this.props.rootDir}/${file.name}`);
      this.setState({isRoot: false})
    }
    else {
      let filename = `${this.props.rootDir}/${file.name}`;
      Axios.post('/api/getFileContent', {filename, file}).then((res: any) => {
        this.props.filePreview(res.data);
      });
    }
  }
  goBack(){
    let splitString = this.props.rootDir.split('/');
    if((splitString.length - 2) == 1){
      this.setState({isRoot: true})
    }
    splitString.length = splitString.length - 1;
    this.props.loadFolder(splitString.join('/'));
  }
  convertFileSize(size: any){
    let i = -1;
    let unit = ['kB', 'MB', 'GB', 'TB'];
    do{
      size = size / 1024;
      i++;
    } while (size > 1024);
    return Math.max(size, 0.1).toFixed(1) + unit[i];
  }
  render(){
    return (
      <tbody>
        {!this.state.isRoot && 
        <tr>
          <td colSpan={4} onClick={this.goBack.bind(this)}>
            ...
          </td>
        </tr>
        } 
        {this.props.files.map((file: any, i: any) => 
          <tr key={i} onClick={this.onClick.bind(this, file)} style={{cursor: 'pointer', userSelect: 'none'}}>
            <td>
              <i className="material-icons align-middle">{this.icon(file.type)}</i>
              <span>{file.name}</span>
            </td>
            <td>{file.date}</td>
            <td>{file.type}</td>
            <td>{!file.type.match(/directory/) ? this.convertFileSize(file.size): ''}</td>
          </tr>
        )}
      </tbody>
    )
  }
}
export default Content;