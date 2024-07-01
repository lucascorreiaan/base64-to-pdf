import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import PrivacyNotice from './PrivacyNotice';

function PdfEncode() {
  const [file, setFile] = useState(null);
  const [encoded, setEncoded] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setError('Please select a file.');
      setFile(null);
      return;
    }

    if (selectedFile.type !== 'application/pdf') {
      setError('The selected file is not a valid PDF.');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleEncode = () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const binaryString = reader.result;
      const base64String = btoa(binaryString);
      setEncoded(base64String);
      setError('');
      setCopySuccess('');
    };
    reader.readAsBinaryString(file);
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
      <h1>PDF Encode</h1>
      <PrivacyNotice />
      <Form>
        <Form.Group controlId="fileInput">
          <Form.Label>PDF File</Form.Label>
          <Form.Control
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleEncode} disabled={!file}>
          Encode
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {encoded && (
        <div className="mt-3">
          <Alert variant="success">
            <Alert.Heading>Encoded PDF:</Alert.Heading>
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

export default PdfEncode;