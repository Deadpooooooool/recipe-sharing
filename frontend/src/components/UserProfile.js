import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';

const UserProfile = ({ user }) => {
    return (
        <Container>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">{user.name}</CardTitle>
                            <CardText>Bio: {user.bio}</CardText>
                            <CardText>Email: {user.email}</CardText>
                            {/* Add other user information and actions */}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;
