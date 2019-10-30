import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
class Send extends Component {
  state = {
    message: ''
  }
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.message);
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ''
    })
  }
  render(){
    return (
      <Card>
        <Card.Body className="p-0">
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col xs={11} className="pr-0">
                <Form.Control
                  disabled={this.props.disable}
                  size="lg"
                  onChange={this.handleChange}
                  name="message"
                  value={this.state.message}
                  type="text"
                  placeholder="Please enter your message and hit ENTER" />
              </Col>
              <Col xs={1} className="d-flex justify-content-end">
                <Button variant="dark" type="submit">
                ENTER
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
};

export default Send;
