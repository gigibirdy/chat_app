import React from 'react';
import {withUserContext} from '../Context/UserContext';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...props}) =>{
  const {authenticatedUser} = props.context;
  return (
    <Route {...props} render={
      (props) => (authenticatedUser)
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/signin'
        }}/>
    }/>
  );
};

export default withUserContext(PrivateRoute);
