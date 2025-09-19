// src/components/NavBar.jsx
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      sticky="top"
      className="navbar-main"
      data-bs-theme="dark"     // ayuda con contraste en dark
    >
      <Container>
        <Navbar.Brand as={Link} to="/">Teresa Galeano</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/acerca">Acerca de mí</Nav.Link>
            <Nav.Link as={Link} to="/servicios">Servicios</Nav.Link>
            <Nav.Link href="/#testimonios">Testimonios</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            {/* <Nav.Link as={Link} to="/minijuego">Juego para parejas</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
