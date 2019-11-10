import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import './Welcome.scss';

export default (props) => {
  //fade in & out welcome message when user enter a chat room
  const [isShow, setShow] = useState(true);
  useEffect(() => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 6000)
  }, [props.roomName]);
  return (
    <Alert className="welcome" variant="success" style={{"display" : isShow ? "block" : "none"}}>
      Welcome to {props.roomName}!
    </Alert>
  );
};
