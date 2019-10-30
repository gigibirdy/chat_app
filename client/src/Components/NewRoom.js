import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class NewRoom extends Component {
  state = {
    roomName: ''
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createRoom(this.state.roomName);
    this.setState({
      roomName: ''
    })
  }
  render(){
    return(
      <Card>
        <Card.Body className="p-0">
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
            <Col xs={11}>
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
