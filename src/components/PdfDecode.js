import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import PrivacyNotice from './PrivacyNotice';

function PdfDecode() {
  const [base64String, setBase64String] = useState('');
  const [error, setError] = useState('');

  const handleDecode = () => {
    if (base64String.trim() === '') {
      setError('Please enter a base64 string');
      return;
    }

    try {
      const binaryString = atob(base64String);
      const binaryArray = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }
      const pdfHeader = String.fromCharCode.apply(null, binaryArray.subarray(0, 5));
      if (pdfHeader !== '%PDF-') {
        setError('The provided string is not a valid PDF base64 string');
        return;
      }

      setError('');
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([binaryArray], { type: 'application/pdf' }));
      link.download = 'output.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (e) {
      setError('The provided string is not a valid base64 string');
    }
  };

  return (
    <Container className="mt-5">
      <h1>PDF Decode</h1>
      <PrivacyNotice />
      <Form>
        <Form.Group controlId="base64Input">
          <Form.Label>Base64 String</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={base64String}
            onChange={(e) => setBase64String(e.target.value)}
            placeholder="Enter base64 string to decode"
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" onClick={handleDecode}>
          Decode and Download PDF
        </Button>
      </Form>
    </Container>
  );
}

export default PdfDecode;
