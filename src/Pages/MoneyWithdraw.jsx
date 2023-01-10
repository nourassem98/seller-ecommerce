import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
export default class MoneyWithdraw extends Component {

    asynchandleSubmit = async event => {
        var msgItem = document.getElementById("msg").value;
        var valItem = document.getElementById("amount").value;

        const idSeller = window.sessionStorage.getItem("username");

        var Fdata = new FormData();
        Fdata.append('message', msgItem);
        Fdata.append('total_amount', valItem);
        Fdata.append('seller_id', idSeller);
        axios.post('https://e-commerce-neon.herokuapp.com/add_payout', Fdata)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            }).then(

        )
    }

    render() {
        return (
            <div>
                <h2 style={{ paddingLeft: '30px' }}>Money Withdraw</h2>
                <Row className='container' style={{ justifyContent: 'center', margin: '30px' }}>
                </Row>

                <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px', marginTop: '20px' }}>
                    <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px', marginBottom: '30px' }}>Submit Money withdrawal request</h4>
                    <Row style={{ marginTop: "2%" }} >
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Enter message
                        </Col>
                        <Col md={7}>
                            <input type='text' id='msg' className='form-control' />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "2%" }} >
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Specify amount
                        </Col>
                        <Col md={7}>
                            <input type='number' id='amount' className='form-control' />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} />
                        <Col md={7} style={{ textAlign: 'right' }}>   <small style={{ marginBottom: '20px', fontSize: '0.8em' }}>Please enter the specified amount</small></Col>
                    </Row>

                    <Row>
                        <Col md={4}></Col>
                        <Col md={4} style={{ textAlign: 'center' }} >
                            <Button onClick={this.asynchandleSubmit} style={{ borderColor: "lightgray", backgroundColor: "lightgray" }}>Submit</Button>
                        </Col>
                        <Col md={4}></Col>

                    </Row>

                </div>
            </div>
        )
    }
}
