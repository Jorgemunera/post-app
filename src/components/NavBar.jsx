import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                <Link to='/' className='navbar-brand'>INICIO</Link>
                <Nav className="me-auto">
                    <Link to='/new-post' className='nav-link'>Crear Post</Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export { NavBar }