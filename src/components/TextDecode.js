import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import PrivacyNotice from './PrivacyNotice';

function TextDecode() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      
      // Create a Blob with the decoded text
      const blob = new Blob([decoded], { type: 'text/plain;charset=utf-8' });
      
      // Create a temporary URL for the Blob
      const url = URL.createObjectURL(blob);
      
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'decoded_text.txt';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setError('');
    } catch (e) {
      setError('Invalid base64 string. Please check your input and try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h1>Text Decode</h1>
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

export default TextDecode;