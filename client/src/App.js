import React, {Component} from 'react';
import Signup from './page/Signup';
import Signin from './page/Signin';
import Dashboard from './page/Dashboard';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';



class App extends Component {

  render(){

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signin"/>}/>
          <Route exact path="/signin" render={({...props}) => <Signin {...props}/>}/>
          <Route exact path="/signup" render={({...props}) => <Signup {...props}/>}/>
          <Route exact path="/chat" render={() => <Dashboard />}/>
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
