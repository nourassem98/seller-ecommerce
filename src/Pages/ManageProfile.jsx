import React, { Component } from 'react'
import { Divider } from '@mui/material'
import { Col, Row, InputGroup, FormControl, Button, Spinner, Alert } from 'react-bootstrap'
import axios from 'axios'

export default class ManageProfile extends Component {

    state = {
        hide: true,
        selectedFile: Object,
        oldaddress: "",
        oldbrand: "",
        oldemail: "",
        oldimage: "",
        oldname: "",
        oldnum: "",

    }
    onClickHanlder1 = () => {
        this.setState({ hide: false })
    }

    componentDidMount() {
        const idSeller = window.sessionStorage.getItem("username");
        console.log(idSeller)
        axios.get('https://e-commerce-neon.herokuapp.com/show_seller/' + idSeller)
            .then(res => {
                this.setState({ oldaddress: res.data.address, oldbrand: res.data.brand, oldname: res.data.sname, oldimage: res.data.image, oldemail: res.data.email, oldnum: res.data.number })

            })
            .catch(err => {
                console.error(err);
            })

    }

    asynchandleSubmit = async event => {

        const idSeller = window.sessionStorage.getItem("username");
        var sname = document.getElementById("nameNew").value;
        console.log(document.getElementById("nameNew").value + "a8a")
        var number = document.getElementById("numberX").value;
        var address = document.getElementById("addressX").value;
        var email = document.getElementById("email").value;
        var brand = document.getElementById("brandName").value;
        var seller_id = idSeller

        // console.log(ReactSession.get("username"))

        if (sname.length === 0 && document.getElementById("numberX").value.length === 0 && address.length === 0 && document.getElementById('email').value.length === 0 && document.getElementById('brandName').value.length === 0 && document.getElementById('images').value.length === 0) {
            alert("Please type anything")
        }

        var Fdata = new FormData();
        if (document.getElementById('nameNew').value.length === 0) {
            Fdata.append('name', this.state.oldname)
        }
        if (document.getElementById('numberX').value.length === 0) {
            Fdata.append('number', this.state.oldnum)
        }
        if (document.getElementById('addressX').value.length === 0) {
            Fdata.append('address', this.state.oldaddress)
        }
        if (document.getElementById('email').value.length === 0) {
            Fdata.append('email', this.state.oldemail)
        }
        if (document.getElementById('brandName').value.length === 0) {
            Fdata.append('brand_name', this.state.oldbrand)
        }
        if (document.getElementById('images').value.length === 0) {
            Fdata.append('image', this.state.oldimage)
        }

        Fdata.append("name", sname)
        Fdata.append("number", number)
        Fdata.append("address", address)
        Fdata.append("email", email)
        Fdata.append("brand_name", brand)
        Fdata.append('image', this.state.selectedFile)

        axios.patch('https://e-commerce-neon.herokuapp.com/update_seller/' + seller_id, Fdata)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            }).then(

        )
        // setTimeout(window.location.reload(), 6000);
    }

    render() {
        const handleFileSelect = (event) => {
            this.setState({ selectedFile: event.target.files[0] })
            this.setState({ flag: true })
        }

        return (
            <div>

                <h2 style={{ paddingLeft: '30px' }}>Manage Profile</h2>
                <Divider />
                <Col md={12} style={{ backgroundColor: "white", marginTop: "2%" }}>
                    <h5>Basic Information </h5>
                    <Divider />
                    <Row>
                        <Col md={12}>

                            <Row style={{ margin: "2%" }}>
                                <Col md={3}>
                                    <InputGroup.Text id="inp1">Change name:</InputGroup.Text>
                                </Col>
                                <Col>
                                    <input type="text" placeholder={this.state.oldname} id="nameNew" className='form-control' />
                                </Col>
                            </Row>

                            <Row style={{ margin: "2%" }}>
                                <Col md={3}>
                                    <InputGroup.Text id="inp1">Change number:</InputGroup.Text>
                                </Col>
                                <Col>
                                    <input type="number" placeholder={this.state.oldnum} id="numberX" className='form-control' />
                                </Col>

                            </Row>
                            <Row style={{ margin: "2%" }}>
                                <Row >
                                    <Col md={3} style={{ alignSelf: 'center' }}>
                                        <InputGroup.Text >Change photo:</InputGroup.Text>
                                    </Col>
                                    <Col md={9}>
                                        <input required type='file' id='images' onChange={handleFileSelect} className='form-control' multiple accept='imgs/*' />
                                    </Col>
                                </Row>
                            </Row>
                            <Row style={{ margin: "2%" }}>
                                <Col md={3}>
                                    <InputGroup.Text id="inp1">Change address:</InputGroup.Text>
                                </Col>
                                <Col>
                                    <input type="text" placeholder={this.state.oldaddress} id="addressX" className='form-control' />
                                </Col>
                            </Row>
                            <Row style={{ margin: "2%" }}>
                                <Col md={3}>
                                    <InputGroup.Text id="inp1">Change Brand Name:</InputGroup.Text>
                                </Col>
                                <Col>
                                    <input type="text" placeholder={this.state.oldbrand} id="brandName" className='form-control' />
                                </Col>
                            </Row>
                            <Row style={{ margin: "2%" }}>
                                <Col md={3}>
                                    <InputGroup.Text id="inp1">Change email:</InputGroup.Text>
                                </Col>
                                <Col>
                                    <input type="text" placeholder={this.state.oldemail} id="email" className='form-control' />
                                </Col>
                            </Row>
                            <Row stlye={{ justifyContent: "center" }}>
                                <Col md={5}>
                                </Col>
                                <Col style={{ justifyContent: "center" }}>

                                    <Button onClick={this.asynchandleSubmit} className="submitBtn" style={{ margin: "3%", justifyContent: "center", borderColor: "lightgray", backgroundColor: "lightgray" }} >Submit  </Button>

                                </Col>
                                <Col md={5}>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </Col>


            </div>
        )
    }
}
