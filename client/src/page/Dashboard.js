import React, {Component} from 'react';
import MessageList from '../Components/Message/MessageList';
import Room from '../Components/Room/Room';
import NewRoom from '../Components/NewRoom/NewRoom';
import Send from '../Components/Send/Send';
import Logout from '../Components/Logout/Logout';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import {instanceLocator} from '../config';
import './Dashboard.scss';
import {withUserContext} from '../Context/UserContext';


class Dashboard extends Component {
  state = {
    roomId: '',
    roomName: '',
    messages: [],
    joinedRooms: [],
    joinableRooms: []
  }

  componentDidMount = () => {
    const {_id} = this.props.context.authenticatedUser;
    //instantiating instance of both chatmanager and tokenprovider
    const chatManager = new ChatManager({
      instanceLocator,
      userId: _id,
      tokenProvider: new TokenProvider({
        url: "http://localhost:5000/api/users/auth",
        queryParams: {
          user_id: _id
        }
      })
    });
    //connect method returns a promise that resolves with a currentUser object
    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser;
      //call getrooms method to display a list of chat rooms
      this.getRooms();
    })
    .catch(error => {console.log('currentUser fetching error:', error)})
  };

  subscribeToRoom = (roomId) => {
    this.setState({
      messages: []
    })
    //subscribe currentUser to a room and provide an onMessage hook to be noticed
    //when new messages are added to the room. Up to 100 recent messages can be
    //retrived on subscription
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onMessage: (message) => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    })
    .then(room => {
      this.setState({
        roomId: room.id,
        roomName: room.name
      });
      //call the getrooms method to indicate current room and joinable rooms
      this.getRooms();
    })
    .catch(error => console.log('subscribeToRoom error: ', error))
  };
  //get joinable rooms and current room
  getRooms = () => {
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms: joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
    .catch(error => {console.log('joinableRooms fetching error', error)})
  };
  //send a message
  sendMessage = (msg) => {
    this.currentUser.sendMessage({
      roomId: this.state.roomId,
      text: msg
    })
  };
  //create a new chat room
  createRoom = (name) => {
      this.currentUser.createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(error => console.log('creating new room error: ', error))
  };

  render(){
    return (
      <div className="Dashboard">
        <Container fluid>
          <Row className="d-flex flex-row-reverse  mb-2">
            <Col xs={1} className="d-flex justify-content-end"><Logout /></Col>
          </Row>
          <Row>
            <Col xs={4} className="pr-0"><Room roomId={this.state.roomId} subscribeToRoom={this.subscribeToRoom} rooms={[...this.state.joinedRooms, ...this.state.joinableRooms]}/></Col>
            <Col xs={8} className="pl-0"><MessageList roomName={this.state.roomName} roomId={this.state.roomId} messages={this.state.messages}/></Col>
          </Row>
          <Row>
            <Col xs={4} className="pr-0"><NewRoom rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} createRoom={this.createRoom}/></Col>
            <Col xs={8} className="pl-0"><Send disable={!this.state.roomId} sendMessage={this.sendMessage}/></Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default withUserContext(Dashboard);
