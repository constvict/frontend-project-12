import { Container, Row, Col } from 'react-bootstrap';
const PageNotFound = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8} className="text-center">
          <h1 className="display-4">404</h1>
          <p className="lead">Sorry, the page you requested could not be found.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;