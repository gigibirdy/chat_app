import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import Card from 'react-bootstrap/Card';
import Welcome from './Welcome';
import './MessageList.scss';

class MessageList extends Component {
  componentWillUpdate = () => {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 50 >= node.scrollHeight;
  };
  componentDidUpdate = () => {
    if(this.shouldScrollToBottom){
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  };
  render(){

    if(!this.props.roomId){
      return (
        <Card className="message-card overflow-auto">
          <Card.Body className="m-auto d-flex align-items-center clickRoom">

              <i className="far fa-hand-point-left mr-2"></i>
              <p className="mb-0">Click a Room</p>

          </Card.Body>
        </Card>
      );
    }
    return(
      <Card className="message-card overflow-auto">
        <Welcome roomName={this.props.roomName}/>
      {this.props.messages.map((message, index) =>
        <Message key={index} username={message.sender.name} msg={message.text} />
      )}
      </Card>
    );
  }
};

export default MessageList;
