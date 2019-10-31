import React from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {withUserContext} from '../../Context/UserContext';

const SignInForm = (props) => {
  const {username, password, actions} = props.context;
  return(
        <Card.Body>
          <Form onSubmit={async (e) => {e.preventDefault(); const response = await actions.handleSignIn(); if(response.status === 200) {props.history.push('/chat')};}}>
            <Form.Row className="d-flex justify-content-center mb-1">
              <Col xs={12} md={8} xl={4}>
                <Form.Control
                  size="lg"
                  onChange={actions.handleChange}
                  name="username"
                  value={username}
                  type="text"
                  placeholder="Name" />
              </Col>
            </Form.Row>
            <Form.Row className="d-flex justify-content-center">
              <Col xs={12} md={8} xl={4}>
                <Form.Control
                  size="lg"
                  onChange={actions.handleChange}
                  name="password"
                  value={password}
                  type="text"
                  placeholder="Password" />
              </Col>
            </Form.Row>
            <Form.Row className="d-flex justify-content-center">
              <Col xs={12} md={8} xl={4} className="d-flex justify-content-center">
                <Button variant="dark" type="submit" className="mt-4">
                SUBMIT
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Card.Body>
  );
};

export default withUserContext(SignInForm)
