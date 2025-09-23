import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    setExpanded(false); // cierra el menú al hacer click
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      sticky="top"
      className="navbar-main"
      data-bs-theme="dark"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleLinkClick}>
          Teresa Galeano
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={handleLinkClick}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/acerca" onClick={handleLinkClick}>
              Acerca de mí
            </Nav.Link>
            <Nav.Link as={Link} to="/servicios" onClick={handleLinkClick}>
              Servicios
            </Nav.Link>
            <Nav.Link href="/#testimonios" onClick={handleLinkClick}>
              Testimonios
            </Nav.Link>
            <Nav.Link as={Link} to="/blog" onClick={handleLinkClick}>
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto" onClick={handleLinkClick}>
              Contacto
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/minijuego" onClick={handleLinkClick}>
              Juego para parejas
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
