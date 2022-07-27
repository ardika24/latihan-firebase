import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function ContactUs() {
  return (
    <Container>
      <h1>Hubungi Kami</h1>

      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Cabang</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="bali">
              Bali
            </Nav.Link>
            <Nav.Link as={NavLink} to="jakarta">
              Jakarta
            </Nav.Link>
            <Nav.Link as={NavLink} to="padang">
              Padang
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </Container>
  );
}

export default ContactUs;
