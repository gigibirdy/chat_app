import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ExistingRoom from './ExistingRoom';
import './Alert.scss';

class NewRoom extends Component {
  state = {
    roomName: '',
    roomExists: false
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value,
      roomExists: false
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //check if room name exists and update the state
    for(let i = 0; i < this.props.rooms.length; i++){
      if(this.props.rooms[i].name === this.state.roomName){
        this.setState({
          roomExists: true
        })
        break;
      } else if (i === this.props.rooms.length - 1 && !this.state.roomExists){
        this.props.createRoom(this.state.roomName);
      }
    }
    this.setState({
      roomName: '',
    })
  };

  render(){
    return(
      <Card>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col xs={11}>
                {
                  this.state.roomExists
                  ? <ExistingRoom roomExists={this.state.roomExists}/>
                  : null
                }
                <Form.Control
                  size="lg"
                  type="text"
                  name="roomName"
                  value={this.state.roomName}
                  onChange={this.handleChange}
                  placeholder="Add new room"
                >
                </Form.Control>
              </Col>
              <Col xs={1} className="d-flex justify-content-end">
                <Button type="submit" variant="dark" size="md">
                +
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
     );
  }
};

export default NewRoom;
