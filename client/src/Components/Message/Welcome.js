import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';

export default (props) => {
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    setShow(true)
  }, [props.roomName]);

  if(isShow)
    return (
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        Welcome to {props.roomName}!
      </Alert>
    );
  return null;
};
