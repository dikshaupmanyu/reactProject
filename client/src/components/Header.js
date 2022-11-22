import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <>
        
            <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-2">Navbar</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/product" className="text-decoration-none text-light mx-2">product</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header