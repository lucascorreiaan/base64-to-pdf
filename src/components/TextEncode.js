import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import PrivacyNotice from './PrivacyNotice';

function TextEncode() {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const handleEncode = () => {
    setEncoded(btoa(input));
    setCopySuccess('');
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
      <h1>Text Encode</h1>
      <PrivacyNotice />
      <Form>
        <Form.Group controlId="textInput">
          <Form.Label>Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleEncode}>
          Encode
        </Button>
      </Form>
      {encoded && (
        <div className="mt-3">
          <Alert variant="success">
            <Alert.Heading>Encoded Text:</Alert.Heading>
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

export default TextEncode;