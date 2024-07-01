import React from 'react';
import { Alert } from 'react-bootstrap';

function PrivacyNotice() {
  return (
    <Alert variant="info" className="mt-3 py-2">
      <small>
        <strong>Privacy Notice:</strong> We do not store any information you enter or upload. 
        All processes are performed locally in your browser.
      </small>
    </Alert>
  );
}

export default PrivacyNotice;