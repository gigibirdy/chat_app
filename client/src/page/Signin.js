import React from 'react';
import SignInForm from '../Components/Signin/SignInForm';
import './signin.scss';
import {NavLink} from 'react-router-dom';

export default (props) => {
  return(
    <div className="signin-container">
      <div className="signin">
        <SignInForm {...props}/>
        <p className="d-flex justify-content-center">Don't have an account? <NavLink to="/signup">Sign up</NavLink></p>
      </div>
    </div>
  );
}
