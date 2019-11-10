import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import './Alert.scss';

export default (props) => {
  //fade in & out warning message when user enters an existing chat room name
  const [isShow, setShow] = useState(false);
  useEffect(() => {
    setShow(true)
    setTimeout(() => {
      setShow(false);
    }, 6000)
  }, [props.roomExists]);
  return (
    <Alert className="existingRoom" variant="danger" style={{"display" : isShow ? "block" : "none"}}>
      Room exists!
    </Alert>
  );
};
