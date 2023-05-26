import React from 'react';
import {
  Button,
  Container,
  Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const Header = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar className="shadow-sm navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to={routes.rootPage()}>
          Hexlet Chat
        </Navbar.Brand>
        {auth.user && (
          <Button
            variant="primary"
            onClick={() => {
              auth.logOut();
            }}
          >
            {t('logout')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
