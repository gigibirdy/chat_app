import React from 'react';
import {withUserContext} from '../../Context/UserContext';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const SignUpForm = (props) => {
    const {actions, username, password, confirmPassword} = props.context;
    return(
          <Card.Body>
            <Form onSubmit={async (e) => {e.preventDefault(); const response = await actions.handleSignUp(); if(response.status === 201) {const result = await actions.handleSignIn(); if(result.status === 200){props.history.push('/chat');} }}}>
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
              <Form.Row className="d-flex justify-content-center mb-1">
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
                <Col xs={12} md={8} xl={4}>
                  <Form.Control
                    size="lg"
                    onChange={actions.handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    type="text"
                    placeholder="Confirm Password" />
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

export default withUserContext(SignUpForm);
