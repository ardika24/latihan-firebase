import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/auth";

function Header() {
  const { user } = useAuth();

  async function logout() {
    await signOut(auth);
  }

  function jsx_rightSection() {
    if (user === null) {
      return <Navbar.Text>Loading user...</Navbar.Text>;
    }

    if (user === false) {
      return (
        <Nav>
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>

          <Nav.Link as={NavLink} to="/register">
            Register
          </Nav.Link>
        </Nav>
      );
    }

    return (
      <Nav>
        <Navbar.Text>{user.email}</Navbar.Text>
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      </Nav>
    );
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/tentang-kami">
              Tentang Kami
            </Nav.Link>

            <Nav.Link as={NavLink} to="/hubungi-kami">
              Hubungi Kami
            </Nav.Link>
          </Nav>

          {jsx_rightSection()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
