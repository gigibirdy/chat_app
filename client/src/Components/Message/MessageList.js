import React, {useEffect} from 'react';
import Message from './Message';
import Card from 'react-bootstrap/Card';
import Welcome from './Welcome';
import './MessageList.scss';
import Badge from 'react-bootstrap/Badge';

export default (props) => {
  const node = React.useRef('message list');
  useEffect(() => {
    if(node.current.scrollTop + node.current.clientHeight + 150 >= node.current.scrollHeight){
      node.current.scrollTop = node.current.scrollHeight;
    }
  }, [node.current.scrollHeight]);

  //before user choses a chat room, display "click a room" message
  if(!props.roomId){
    return (
      <Card className="message-card overflow-auto" ref={node}>
        <Card.Body className="m-auto d-flex align-items-center clickRoom">
          <i className="far fa-hand-point-left mr-2" ></i>
          <p className="mb-0">Click a Room</p>
        </Card.Body>
      </Card>
    );
  }
  //display all chat messages that associated with the room
  return(
    <Card className="message-card overflow-auto" ref={node}>
      <Card.Body>
      <Welcome roomName={props.roomName}/>
        {
          props.messages.length
          ? props.messages.map((message, index) =>
              <Message key={index} username={message.sender.name} msg={message.text} className="message"/>
            )
          : <React.Fragment>
              <h4><Badge pill variant="dark">Admin</Badge></h4>
              <span className="ml-1">You have created a new room. Let's chat!</span>
            </React.Fragment>
        }
        </Card.Body>
    </Card>
  );
};
