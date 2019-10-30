import React from 'react';
import {NavLink} from 'react-router-dom';
import SignUpForm from '../Components/Signup/SignUpForm';
import Card from 'react-bootstrap/Card';
export default (props) => {
  return(
    <div>
      <Card>
        <SignUpForm {...props}/>
        <p>Already have an account? <NavLink to="/signin">Log in</NavLink></p>
      </Card>
    </div>
  );
}
