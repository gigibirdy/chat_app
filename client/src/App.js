import React from 'react';
import Signup from './page/Signup';
import Signin from './page/Signin';
import Dashboard from './page/Dashboard';
import PrivateRoute from './Components/PrivateRoute'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

export default () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/signin"/>}/>
          <Route exact path="/signin" render={({...props}) => <Signin {...props}/>}/>
          <Route exact path="/signup" render={({...props}) => <Signup {...props}/>}/>
          <PrivateRoute exact path="/chat" component={Dashboard}/>
          <Route render={() => <Redirect to="/signin"/>}/>
        </Switch>
      </BrowserRouter>
    );
};
