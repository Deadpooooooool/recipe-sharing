import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const LoginForm = ({ onLogin }) => {
    return (
        <Form onSubmit={onLogin}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Enter email" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Enter password" />
            </FormGroup>
            <Button type="submit" color="primary">Login</Button>
        </Form>
    );
};

export default LoginForm;
