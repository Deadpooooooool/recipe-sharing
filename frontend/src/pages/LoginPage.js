import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Alert,
  FormText,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore"; // Assuming you have a user store
import ForgotPassword from "./ForgotPassword";

const LoginPage = () => {
  const [email, setEmail] = useState("userone@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const navigate = useNavigate();
  const { login, isAdmin } = useUserStore(); // Use isAdmin from useUserStore

  // useEffect(() => {
  //   if (isAdmin()) {
  //     navigate("/admin/dashboard"); // Navigate to admin dashboard if user is admin
  //   } else {
  //     navigate("/"); // Navigate to home page if user is not admin
  //   }
  // }, [navigate, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      await login({ email, password });
      if (isAdmin()) {
        navigate("/admin/dashboard"); // Navigate to admin dashboard if user is admin
      } else {
        navigate("/"); // Navigate to home page if user is not admin
      }
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
      setShowAlert(true);
    }
  };
  const handleShowForgotPasswordModal = () => {
    setShowForgotPasswordModal(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="justify-content-center">
        <Col
          md="6"
          style={{ borderStyle: "ridge", padding: "30px", width: "400px" }}
        >
          <h2>Login</h2>
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Log In
            </Button>
            <br />

            {/* Forgot Password Link (open modal) */}
            <FormText
              className="text-muted mt-2"
              style={{ textAlign: "center", display: "block" }}
            >
              <button
                type="button"
                onClick={handleShowForgotPasswordModal}
                style={{
                  border: "none",
                  background: "none",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </button>
            </FormText>
            <FormText
              className="text-muted mt-2"
              style={{ textAlign: "center", display: "block" }}
            >
              Don't have an account? <a href="/register">Register</a>
            </FormText>
            {showAlert && (
              <Alert
                variant="success"
                className="mt-3"
                style={{ textAlign: "center" }}
              >
                Login successful!
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
      <ForgotPassword
        show={showForgotPasswordModal}
        handleClose={handleCloseForgotPasswordModal}
      />
    </Container>
  );
};

export default LoginPage;
