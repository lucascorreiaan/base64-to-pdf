import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import PrivacyNotice from './PrivacyNotice';

function XmlDecode() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      
      // Basic XML validation
      if (!decoded.trim().startsWith('<') || !decoded.trim().endsWith('>')) {
        throw new Error('Decoded content is not valid XML');
      }

      // Create a Blob with the decoded XML
      const blob = new Blob([decoded], { type: 'application/xml' });
      
      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);
      
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'decoded_xml.xml';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setError('');
    } catch (e) {
      setError('Invalid base64 string or decoded content is not XML. Please check your input and try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h1>XML Decode</h1>
      <PrivacyNotice />
      <Form>
        <Form.Group controlId="base64Input">
          <Form.Label>Base64 String</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter base64 string to decode"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleDecode}>
          Decode and Download
        </Button>
      </Form>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </Container>
  );
}

export default XmlDecode;