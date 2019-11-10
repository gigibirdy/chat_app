import React from 'react';
import Badge from 'react-bootstrap/Badge';
import {withUserContext} from '../../Context/UserContext';

//display each chat message
const Message = (props) => {
  return (
      <React.Fragment>
        <h4><Badge pill variant="dark">{props.username.slice(0, 1).toUpperCase() + props.username.slice(1)}</Badge></h4>
        <span className="ml-1">{props.msg}</span>
      </React.Fragment>
  );
};

export default withUserContext(Message)
