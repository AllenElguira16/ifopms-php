import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

// import "../../Styles/app.sass";
import Home from "./Home";
import Login from "./Login";

class App extends React.Component<any, State>{
  state: State = {
    isLoggedIn: false
  }
  render() {
    let { isLoggedIn } = this.state
    return (
      <Router>
        <>
          { isLoggedIn ? 
            <Switch>
              <Route path="/dashboard" component={Home}/>
            </Switch>
          : 
            <Switch>
              <Route path="/dashboard" component={(props: any) => 
                <Login {...props} setAsLoggedIn={this.setAsLoggedIn}/>
              }/>
            </Switch>
          }
        </>
      </Router>
    )
  }
  private setAsLoggedIn = () => {
    this.setState({
      isLoggedIn: true
    });
  }
}

interface State {
  isLoggedIn: boolean
}

ReactDOM.render(
  <App />, document.querySelector("#app")
);