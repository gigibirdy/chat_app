import React from 'react';
import {withContext} from '../Context/Context';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const SignUpForm = (props) => {
    const {actions, username, password, confirmPassword} = props.context;
    return(
          <Card.Body>
            <Form onSubmit={async (e) => {e.preventDefault(); const response = await actions.handleSignUp(); if(response.status === 201) {const result = await actions.handleSignIn(); if(result.status === 200){props.history.push('/chat');} }}}>
              <Form.Row>
                <Col xs={8}>
                  <Form.Control
                    size="lg"
                    onChange={actions.handleChange}
                    name="username"
                    value={username}
                    type="text"
                    placeholder="Name" />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col xs={8}>
                  <Form.Control
                    size="lg"
                    onChange={actions.handleChange}
                    name="password"
                    value={password}
                    type="text"
                    placeholder="Password" />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col xs={8}>
                  <Form.Control
                    size="lg"
                    onChange={actions.handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    type="text"
                    placeholder="Confirm Password" />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col xs={8}>
                  <Button variant="dark" type="submit">
                  SUBMIT
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Card.Body>
    );
};

export default withContext(SignUpForm);
