import React from 'react';
import {NavLink} from 'react-router-dom';
import SignUpForm from '../Components/Signup/SignUpForm';
import './signup.scss';
import Card from 'react-bootstrap/Card';

export default (props) => {
  return(
    <div className="signup-container">
      <Card className="signup">
          <SignUpForm {...props}/>
          <p className="d-flex justify-content-center">Already have an account?<NavLink to="/signin">Log in</NavLink></p>
        </Card>
    </div>
  );
};
