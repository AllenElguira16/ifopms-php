import * as React from "react"
import { Alert, Container } from "reactstrap";

class PageNotFound extends React.Component<any, any>{
  render (){
    return (
      <Container>
        <Alert color="danger">
          <h4 className="alert-heading">Error!</h4>
          <p>The uri doesn't match any route</p>
        </Alert>
      </Container>
    );
  }
}
export default PageNotFound