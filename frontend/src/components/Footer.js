import React from 'react';
import { Container } from 'reactstrap';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Your Company Name</p>
          <p>Contact: your.email@example.com</p>
          {/* Add more footer content as needed */}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
