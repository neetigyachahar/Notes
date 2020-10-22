import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

import cx from 'classnames';

import axios from 'axios';

class Login extends Component {
    state = {
        username: 'testuser',
        password: '#testuser4',
        loading: false
    }


    usernameInputHandler = e => {
        const username = e.target.value.substr(0, 20);
        this.setState(state => {
            console.log(username);
            // testuser
            state.username = username;

            return state;
        });
    }

    passwordInputHandler = e => {
        const password = e.target.value.substr(0, 20);

        this.setState(state => {
            state.password = password;
            return state;
        });
    }


    handleSubmit = async e => {
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password
        }

        const url = 'https://hot-snail-4.loca.lt/auth/login';

        this.setState({
            loading: true
        })

        try {
            const reply = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            this.setState({
                loading: false
            });

            console.log(reply.data);
            localStorage.setItem('user', JSON.stringify(reply.data));
            this.props.loginSuccess();

        } catch (err) {
            this.setState({
                loading: false
            });
            console.log(err);
            alert("Login failed!");
        }

        // headers: {
        //     'Content-Type': 'application/json'
        // },

    }



    render() {
        return (
            <div className="preCont">
                <div className="cont">
                    <div style={{ display: this.state.loading ? 'block' : 'none' }} className={"refreshContentContainer"}>
                        <div className={cx("refreshContentWrap", "refreshContentHrAnimation")}>
                            <hr className={cx("refreshContentColored")} />
                            <hr className={cx("refreshContentColored")} />
                        </div>
                    </div>
                    <Form className="loginForm" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={this.state.username}
                                onChange={this.usernameInputHandler}
                                placeholder="Enter username"
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={this.state.password}
                                onChange={this.passwordInputHandler}
                                placeholder="Password"
                            />
                        </Form.Group>
                            <Button variant="primary"  disabled={!(this.state.username.length && this.state.password.length)} type="submit">
                                Submit
                            </Button>
                    </Form>
                </div>
            </div>
        );
    }

}

export default Login;


{/* <div className="Login">
<form onSubmit={this.handleSubmit}>
    <FormGroup controlId="email" bsSize="large">
        <FormLabel>username</FormLabel>
        <FormControl
            autoFocus
            type="text"
            value={this.state.username}
            onChange={() => this.usernameInputHandler}
        />
    </FormGroup>
    <FormGroup controlId="password" bsSize="large">
        <FormLabel>Password</FormLabel>
        <FormControl
            value={this.state.password}
            onChange={() => this.passwordInputHandler}
            type="password"
        />
    </FormGroup>
    <Button block bsSize="large" disabled={this.state.submitOK} type="submit">
        Login
</Button>
</form>
</div> */}