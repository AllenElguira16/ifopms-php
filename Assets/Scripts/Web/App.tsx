import * as React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Home from "./Components/Home"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import PageNotFound from "./Components/PageNotFound";
import Register from "./Components/Forms/Register";
import Axios from "axios";
import Login from "./Components/Forms/Login";
import Profile from "./Components/Profile";
import Portfolio from "./Components/Portfolio";
import Freelancer from "./Components/Freelancer";
import Messages from "./Components/Messages";
import EditProfile from "./Components/Profile/EditProfile";
import SearchPage from "./Components/SearchPage";
import Jobs from "./Components/Jobs";
import PortfoliosHome from "./Components/Home/PortfoliosHome";
// import PortfolioUpload from "./Components/Freelancer/Content/PortfolioUpload";

class App extends React.Component<any, any>{
  constructor(props: any){
    super(props);
    this.state = {
      user: {},
      isLoading: true
    }
  }
  
  fetchUser(){
    Axios.get("/api/getUser").then((res: any) => {
      this.setState({
        user: res.data,
        isLoading: false
      });
      // console.log(location.pathname);
      // if(res.data.length === 0 && location.pathname !== '/home'){
      //   location.href = '/home';
      // }
    });
  }

  componentDidMount(){
    this.fetchUser();
  }

  render (){
    let { user } = this.state;
    // console.log(user.id === undefined);
    return (
      <Router>
        <>
          <Header user={user} history={history}/>
          <Switch>
            {/* {user.id === undefined ?  */}
              <Route exact path="/" component={Home} />
            {/* : */}
              {/* <Route exact path="/" component={PortfoliosHome} /> */}
            {/* } */}
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/portfolios" render={(props) => 
              <PortfoliosHome {...props} user={user}/>
            }/>
            <Route exact path="/portfolios/:categoryId" component={PortfoliosHome}/>
            <Route exact path="/user/:username" render={(props) => 
              <Profile {...props} user={user}/>
            } />
            <Route path="/freelancer/dashboard" render={(props: any) => <Freelancer {...props} user={this.state.user}/>}/>
            {/* <Route exact path="/portfolio/:id" render={(props) => 
              <Portfolio {...props} user={this.state.user}/>
            }/> */}
            <Route exact path="/edit-profile" render={(props) => 
              <EditProfile {...props} user={this.state.user}/>
            }/>
            <Route path="/search/:search" component={SearchPage}/>
            <Route path="/jobs" render={(props) => <Jobs {...props} user={this.state.user}/>}/>
            <Route exact path="*" component={PageNotFound}/>
          </Switch>
          <Footer />
          <Messages />
        </>
      </Router>
    );
  }
}

export default App;