import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import PrivacyNotice from './PrivacyNotice';


function XmlEncode() {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const handleEncode = () => {
    try {
      // Basic XML validation
      if (!input.trim().startsWith('<') || !input.trim().endsWith('>')) {
        throw new Error('Invalid XML format');
      }
      
      const base64 = btoa(input);
      setEncoded(base64);
      setError('');
      setCopySuccess('');
    } catch (e) {
      setError('Invalid XML. Please check your input and try again.');
      setEncoded('');
      setCopySuccess('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encoded).then(() => {
      setCopySuccess('Copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 3000); // Clear message after 3 seconds
    }, () => {
      setCopySuccess('Failed to copy');
    });
  };

  return (
    <Container className="mt-5">
      <h1>XML Encode</h1>
      <PrivacyNotice />
      <Form>
        <Form.Group controlId="xmlInput">
          <Form.Label>XML</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter XML to encode"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleEncode}>
          Encode
        </Button>
      </Form>
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {encoded && (
        <div className="mt-3">
          <Alert variant="success">
            <Alert.Heading>Encoded XML:</Alert.Heading>
            <div style={{ maxHeight: '200px', overflowY: 'auto', wordBreak: 'break-all' }}>
              {encoded}
            </div>
          </Alert>
          <Button variant="secondary" onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
          {copySuccess && <span className="ml-2 text-success">{copySuccess}</span>}
        </div>
      )}
    </Container>
  );
}

export default XmlEncode;