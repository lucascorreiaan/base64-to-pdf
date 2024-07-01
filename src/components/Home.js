import React from 'react';
import { Container, Alert } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-5">
      <Alert variant="info">
        <h1>Welcome to Base64 Utility</h1>
        <p>
          Choose an option from the navigation to encode or decode text or PDFs.
        </p>
      </Alert>
    </Container>
  );
}

export default Home;
