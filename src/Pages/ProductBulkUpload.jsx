import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import './Styles.css'
export default class ProductBulkUpload extends Component {
    render() {
        return (
            <div>
                <h2 style={{ paddingLeft: '30px' }}>Add Bulk Products</h2>
                <Row className='container' style={{ justifyContent: 'center', margin: '30px' }}>
                </Row>

                <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px', marginTop: '20px' }}>
                    <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px', marginBottom: '30px' }}>Products File</h4>

                    <Row >
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Upload file
                        </Col>
                        <Col md={7}>
                            <input required type='file' id='images' className='form-control' multiple accept='csv/*' />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} />
                        <Col md={7} style={{ textAlign: 'right' }}>   <small style={{ marginBottom: '20px', fontSize: '0.8em' }}>Please upload a .csv file</small></Col>
                    </Row>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={4} style={{ textAlign: 'center' }} >
                            <Button className="submitBtn" style={{ borderColor: "lightgray", backgroundColor: "lightgray", color: "black" }}>Submit</Button>
                        </Col>
                        <Col md={4}></Col>

                    </Row>

                </div>
            </div>
        )
    }
}
