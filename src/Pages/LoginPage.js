import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, } from 'react-bootstrap';
import { BrowserRouter as Routes, Link, } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import loadingGif from "../Assets/loading.svg";
export default class LoginPage extends Component {


    state = {
        tokenNew: null,
        decoded: null,
        redirect: false,
        popup: false,
        workerID: 0,
        loading: false,
    }

    asynchandleSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true })
        this.setState({ popup: false })
        var email = document.getElementById('emailInput').value;
        var pass = document.getElementById('passwordInput').value;
        var Fdata = new FormData();
        Fdata.append('email', email);
        Fdata.append('password', pass);
        axios.post('https://e-commerce-neon.herokuapp.com/login', Fdata)
            .then(res => {
                console.log(res.data)
                // document.getElementById('fr').reset();
                this.setState({ tokenNew: res.data.token });
                var decode = jwt_decode(res.data.token);
                this.setState({ decoded: decode })
                console.log(this.state.decoded)
                console.log(decode)
                this.setState({ workerID: decode.permission })
                console.log(this.state.workerID)
                sessionStorage.setItem("success", decode.success);
                if (decode.success === true) {
                    sessionStorage.setItem("username", decode.worker);
                    sessionStorage.setItem("profileName", decode.name);
                    sessionStorage.setItem("permission", decode.permission)
                    sessionStorage.setItem("exp", decode.exp)
                    sessionStorage.setItem("user_real_id", decode.real_id)
                    sessionStorage.setItem("called", false)
                    this.setState({ redirect: true });
                }
                else {
                    this.setState({ loading: false })
                    this.setState({ popup: true });
                }
            })
            .catch(err => {
                console.error(err);
            })
    }


    render() {
        const { tokenNew } = this.state;
        const { decoded } = this.state;


        if (this.state.redirect && this.state.workerID === 3) {
            this.setState({ from: decoded.success })
            window.location.replace("/S_Home")
        }
        if (this.state.redirect && this.state.workerID === 1) {
            this.setState({ from: decoded.success })
            window.location.replace("/")

        }

        return (
            <>
                <div style={{ backgroundColor: "rgb(246, 241, 241)" }} >
                    <Row>
                        <Col md={1}></Col>
                        <Col>
                            <Container >
                                <h3 style={{ marginTop: 20 }}>Login</h3>
                                <div style={{ backgroundColor: "white", marginTop: "20px" }}>
                                    <Container style={{ paddingTop: "5%", marginBottom: "3%" }}>
                                        <div style={{ marginLeft: "30%" }}>
                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <h6 style={{ fontSize: 15 }}>Enter your credenntials to access your account</h6>
                                                        {/* <Button disabled style={{ textDecoration: "line-through ", marginTop: "1%", width: "36%", backgroundColor: "transparent", boxShadow: "black", borderColor: "black", color: "black" }}><FcGoogle style={{ fontSize: 25 }} />  Log In with Google</Button> */}
                                                    </Row>
                                                </Col>
                                            </Row>

                                            <Form id="fr" style={{ marginTop: "2%" }} onSubmit={this.asynchandleSubmit}>

                                                <Form.Group className="mb-3" >
                                                    <Form.Label>Email address</Form.Label>
                                                    <Form.Control type="email" placeholder="Enter email" id="emailInput" style={{ width: "50%" }} />
                                                    <Form.Text className="text-muted">
                                                    </Form.Text>
                                                </Form.Group>

                                                <Form.Group className="mb-3" >
                                                    <Form.Label >Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" id="passwordInput" style={{ width: "50%" }} />
                                                </Form.Group>
                                                {this.state.popup ?
                                                    // <Alert variant="danger" style={{ width: "36%", height: "10%" }}>
                                                    //     <Alert.Heading>Please check your credentials </Alert.Heading>
                                                    //     <hr />
                                                    <p style={{ color: "red" }}>
                                                        You have entered an incorrect username or password !
                                                    </p>
                                                    // </Alert>
                                                    : ""}

                                                {this.returnPop}
                                                <Form.Group className="mb-3">
                                                    <Form.Check type="checkbox" label="Remember my information" />
                                                </Form.Group>
                                                {this.state.loading ?
                                                    <Button type="submit" disabled style={{ color: "black", marginBottom: 20, width: "36%", backgroundColor: "lightgray", borderColor: "lightgray" }}>
                                                        Loading
                                                    </Button>
                                                    : <Button type="submit" style={{ color: "black", marginBottom: 20, width: "36%", backgroundColor: "lightgray", borderColor: "lightgray" }}>
                                                        Login
                                                    </Button>
                                                }
                                            </Form>

                                            <Col md={12}>
                                                <Col>
                                                    <a> Not a member?</a> <Link style={{ color: "orange", textDecorationLine: "none" }} to="/RegisterationPage"> Register</Link>
                                                </Col>
                                                <Col>
                                                    <Link style={{ color: "orange", textDecorationLine: "none" }} to="/ForgetPassword"> Forgot Password ?</Link>
                                                </Col>
                                            </Col>
                                        </div>
                                    </Container>

                                </div>
                            </Container>
                        </Col>
                    </Row >
                </div >
            </>
        )

    }
}
