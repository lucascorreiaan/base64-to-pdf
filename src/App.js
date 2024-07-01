import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './components/Home';
import TextEncode from './components/TextEncode';
import TextDecode from './components/TextDecode';
import PdfEncode from './components/PdfEncode';
import PdfDecode from './components/PdfDecode';
import XmlEncode from './components/XmlEncode';
import XmlDecode from './components/XmlDecode';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router basename="/base64-to-pdf">
      <div>
        <Navbar bg="light" expand="lg" className="mb-3">
          <Container>
            <Navbar.Brand as={Link} to="/">Base64 Utility</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/text-encode">Text Encode</Nav.Link>
                <Nav.Link as={Link} to="/text-decode">Text Decode</Nav.Link>
                <Nav.Link as={Link} to="/pdf-encode">PDF Encode</Nav.Link>
                <Nav.Link as={Link} to="/pdf-decode">PDF Decode</Nav.Link>
                <Nav.Link as={Link} to="/xml-encode">XML Encode</Nav.Link>
                <Nav.Link as={Link} to="/xml-decode">XML Decode</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/text-encode" element={<TextEncode />} />
            <Route path="/text-decode" element={<TextDecode />} />
            <Route path="/pdf-encode" element={<PdfEncode />} />
            <Route path="/pdf-decode" element={<PdfDecode />} />
            <Route path="/xml-encode" element={<XmlEncode />} />
            <Route path="/xml-decode" element={<XmlDecode />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;