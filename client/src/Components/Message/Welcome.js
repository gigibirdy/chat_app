import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import './Welcome.scss';
export default (props) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(() => !isShow);
    setTimeout(() => {
      setIsShow(() => isShow);
    }, 2000);

  }, [props.roomName]);

  return (
    <Alert variant="success" className="welcome">
      Welcome to {props.roomName}!
    </Alert>
  );
};
