import React from 'react';
import {
  Button,
  Container,
  Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';

const Header = () => {
  const auth = useAuth();

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        {auth.user && (
          <Button
            variant="primary"
            onClick={() => {
              auth.logOut();
            }}
          >
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
