import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import './Message.scss';

import {withUserContext} from '../../Context/UserContext';
const Message = (props) => {

  return (
    <div>
      <Card.Body className="pt-0"><h4><Badge pill variant="dark">{props.username.slice(0, 1).toUpperCase() + props.username.slice(1)}</Badge></h4>
      <span className="ml-1 message">{props.msg}</span></Card.Body>
    </div>
  );
};

export default withUserContext(Message)
