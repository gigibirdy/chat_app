import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import {withContext} from '../Context/Context';
const Message = (props) => {
  const {name} = props.context.authenticatedUser;

  return (
    <div>
      <Card.Body className="pt-0"><h4><Badge pill variant="dark">{props.username}</Badge></h4>
      <span className="ml-1">{props.msg}</span></Card.Body>
    </div>
  );
};

export default withContext(Message)
