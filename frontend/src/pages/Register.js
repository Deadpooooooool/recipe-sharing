import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import useUserStore from '../store/userStore';

const Register = () => {
  const [name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const createUser = useUserStore((state) => state.register);

  const handleRegister = async (e) => {
    e.preventDefault();
const userData ={
  name,
  email,
  password,
  password_confirmation
}
await createUser(userData);

    // Add your registration logic here
    console.log('name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', password_confirmation);

    // For simplicity, let's just show an alert
    setShowAlert(true);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={6} style={{ borderStyle: 'ridge', padding: '30px', width: '400px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={password_confirmation}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ width: '100%' }}>
              Register
            </Button>
            <br />

            {/* Login Link */}
            <Form.Text className="text-muted mt-2" style={{ textAlign: 'center', display: 'block' }}>
              Already have an account? <a href="/login">Login</a>
            </Form.Text>

            {/* Display Alert for Demo Purpose */}
            {showAlert && (
              <Alert variant="success" className="mt-3" style={{ textAlign: 'center' }}>
                Registration successful!
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;