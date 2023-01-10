import React, { Component } from 'react'
import { Divider } from '@mui/material'
import { Col, Row, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap'
import axios from 'axios'

export default class SuppTicket extends Component {
    state = {
        selectedFile: Object,
        flag: false
    }
    asynchandleSubmit = async event => {
        var msgItem = document.getElementById("desc").value;
        var subItem = document.getElementById("subject").value;
        var idSeller = localStorage.getItem("username");

        var Fdata = new FormData();
        Fdata.append('description', msgItem);
        Fdata.append('subject', subItem);
        Fdata.append('seller_id', idSeller);
        Fdata.append('customer_id', "");
        if (this.state.flag != false) {
            Fdata.append('file', this.state.selectedFile)
        }
        else {
            Fdata.append('file', "")
        }

        axios.post('https://e-commerce-neon.herokuapp.com/add_ticket', Fdata)
            .then(res => {
                // console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            }).then(

        )
    }
    render() {

        const handleFileSelect = (event) => {
            this.setState({ selectedFile: event.target.files[0] })
            this.setState({ flag: true })
        }

        return (
            <div>
                <h2 style={{ paddingLeft: '30px' }}>Support Tickets</h2>
                <Row className='container' style={{ justifyContent: 'center', margin: '20px' }}>

                </Row>
                <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '10px' }}>
                    <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px', marginBottom: '30px' }}>Issue ticket</h4>
                    <Row >
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Subject
                        </Col>
                        <Col md={7}>
                            <input id="subject" className='form-control' />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "2%" }}>
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Write your problem here:
                        </Col>
                        <Col md={7}>
                            <input style={{ width: "100%", height: "150px" }} id="desc" className='form-control' />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "2%" }}>
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Upload image:
                        </Col>
                        <Col md={7}>
                            <input onChange={handleFileSelect} type="file" id="file" className='form-control' />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "2%" }}>
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
