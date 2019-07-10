import React from "react";
import ReactDOM from "react-dom";
import Web from "./Web";
import "../Styles/app.scss";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route } from "react-router";

class App extends React.Component<any, any>{
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path="/dashboard" component={ Dashboard }/> */}
          <Route path="/" component={ Web }/>
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />, document.querySelector("#app")
);