import React, { Component } from "react";
// import { Form, Button } from "react-bootstrap";

import { Button, Navbar, Container } from 'react-bootstrap';

import Aux from '../Auxiliary';

import Notepad from '../Notepad/Notepad';

class Home extends Component {
    render() {
        return (
            <Aux>
                <Container>
                    <Navbar>
                        <Navbar.Brand href="/">{this.props.name}</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="/">{this.props.username}</a>
                            </Navbar.Text>
                            <Button style={{ marginLeft: '50px' }} onClick={() => { localStorage.clear(); window.location.reload(); }} variant="outline-secondary">Log Out</Button>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
                <Notepad />
            </Aux>
        );
    }
}

export default Home;