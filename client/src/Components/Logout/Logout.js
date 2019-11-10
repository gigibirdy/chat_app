import React from 'react';
import Button from 'react-bootstrap/Button';
import {withUserContext} from '../../Context/UserContext';

//log out user
const Logout = (props) => {
  const {actions} = props.context
  return(
    <Button variant="dark" onClick={() => actions.handleSignOut()}>
    Log Out
    </Button>
  );
};

export default withUserContext(Logout);
