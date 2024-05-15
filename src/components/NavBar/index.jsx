import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
    return (
        <Navbar collapseOnSelect expand="lg" className={styles.CtnNavbar}>
            <Container >
                <Navbar.Brand>
                    <Link to="/" className={styles.logoAtividade}>
                        Atividade SESI
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Amazon" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/card/amazon">Card</NavDropdown.Item>
                            <NavDropdown.Item href="/tabela/amazon">Tabela</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="FIFA" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/card/fifa">Card</NavDropdown.Item>
                            <NavDropdown.Item href="/tabela/fifa">Tabela</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Netflix" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/card/netflix">Card</NavDropdown.Item>
                            <NavDropdown.Item href="/tabela/netflix">Tabela</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
