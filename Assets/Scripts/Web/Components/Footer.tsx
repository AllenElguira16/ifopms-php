import * as React from "react";

class Footer extends React.Component<any, any>{
  render () {
    return (
      <footer className="d-flex justify-content-center w-100 fixed-bottom" style={{background: "#656565"}}>
        <img src="/images/fpooooot.jpg" alt="" className="img-fluid" style={{height: 100}}/>
      </footer>
    );
  }
}
export default Footer;