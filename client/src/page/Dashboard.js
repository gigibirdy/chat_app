import React, {Component} from 'react';
import MessageList from '../Components/Message/MessageList';
import Room from '../Components/Room/Room';
import NewRoom from '../Components/NewRoom';
import Send from '../Components/Send/Send';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'
import {instanceLocator} from '../config';
import './Dashboard.scss';
import {withContext} from '../Components/Context/Context';


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
    const chatManager = new ChatManager({
      instanceLocator,
      userId: _id,
      tokenProvider: new TokenProvider({
        url: "http://localhost:5000/api/users/auth",
        queryParams: {
          user_id: _id
        }
      })
    })

    chatManager.connect()
    .then(currentUser => {
      console.log(currentUser)
      this.currentUser = currentUser;
      this.getRooms();
      this.subscribeToRoom();
    })
    .catch(error => {console.log('currentUser fetching error:', error)})
  };

  subscribeToRoom = (roomId) => {
    this.setState({
      messages: []
    })
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
      this.getRooms();
    })
    .catch(error => console.log('subscribeToRoom error: ', error))
  };

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

  sendMessage = (msg) => {
    this.currentUser.sendMessage({
      roomId: this.state.roomId,
      text: msg
    })
  };

  createRoom = (name) => {
    this.currentUser.createRoom({
      name
    })
    .then(room => this.subscribeToRoom(room.id))
    .catch(error => console.log('creating new room error: ', error))
  };

  render(){
    console.log(this.state)
    return (
      <div className="App">
        <Container fluid>
          <Row>
            <Col className="pr-0 d-none d-md-block"><Room roomId={this.state.roomId} subscribeToRoom={this.subscribeToRoom} rooms={[...this.state.joinedRooms, ...this.state.joinableRooms]}/></Col>
            <Col xs={12} md={8} className="pl-0"><MessageList roomName={this.state.roomName} roomId={this.state.roomId} messages={this.state.messages}/></Col>
          </Row>
          <Row>
            <Col className="pr-0 d-none d-md-block"><NewRoom createRoom={this.createRoom}/></Col>
            <Col xs={12} md={8} className="pl-0"><Send disable={!this.state.roomId} sendMessage={this.sendMessage}/></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default withContext(Dashboard);
