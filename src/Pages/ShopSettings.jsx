import React, { Component } from 'react'
import { Divider } from '@mui/material'
import { Col, Row, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap'
import axios from 'axios'
import './Styles.css'
import { AiOutlineClose } from "react-icons/ai"
export default class ShopSettings extends Component {

    state = {
        stores: [],
        showMyComponent: false,
        tab_index: 1,
        currId: [],
        currStore: 0,

    }

    componentDidMount() {
        var idSeller = window.sessionStorage.getItem("username");

        axios.get('https://e-commerce-neon.herokuapp.com/show_shops/' + idSeller)
            .then(res => {
                this.setState({ stores: res.data.stores })
                // console.log(this.state.stores[0].address)
            })
    }

    asynchandleSubmit = async event => {
        var idSeller = window.sessionStorage.getItem("username");
        var submitName = document.getElementById("nameChange").value;
        var submitAdd = document.getElementById("addChange").value;
        var phono = document.getElementById("phoneChange").value;
        var director = document.getElementById("directorX").value;



        if (document.getElementById("directorX").value.length === 0) {
            this.state.stores.map((each) => {
                if (each.id === this.state.currStore) {
                    director = each.director

                }
            })
        }
        if (document.getElementById("nameChange").value.length === 0) {
            this.state.stores.map((each) => {
                if (each.id === this.state.currStore) {
                    submitName = each.name
                }
            })
        }
        if (document.getElementById("addChange").value.length === 0) {
            this.state.stores.map((each) => {
                if (each.id === this.state.currStore) {
                    submitAdd = each.address
                }
            })
        }
        if (document.getElementById("phoneChange").value.length === 0) {
            this.state.stores.map((each) => {
                if (each.id === this.state.currStore) {
                    phono = each.number
                }
            })
        }


        axios.patch('https://e-commerce-neon.herokuapp.com/update_store/' + this.state.currStore, { "seller_id": idSeller, "name": submitName, "address": submitAdd, "number": phono, "director": director })
            .then(res => {
                console.log(res.data)
                console.log(submitName)
                console.log(submitAdd)
                console.log(director)

            })
            .catch(err => {
                console.error(err);
            }).then(

        )
    }

    toggleTab = () => {
        this.setState({ showMyComponent: true });
    }
    toggleTabOff = () => {
        this.setState({ showMyComponent: false });
    }
    onClickSetId = (storeIndex) => {
        this.setState({ currStore: storeIndex })
        console.log(this.state.currStore)
    }

    render() {
        const viewStore = this.state.stores.map((each) => {
            return (
                <Col md={4} >
                    Store Name : {each.name}
                    <Button onClick={() => { this.toggleTab(); this.setState({ currStore: each.id }, console.log(each.id)) }} className='submitBtn' style={{ margin: "3%", justifyContent: "center", borderColor: "lightgray", backgroundColor: "lightgray", color: "black" }}> Edit store</Button>


                </Col>
            )
        })

        const viewStoreData =
            this.state.stores.map((each) => {
                if (each.id === this.state.currStore) {
                    return (
                        <Row>
                            <InputGroup className="mb-1" style={{ marginTop: "1%" }}>
                                <InputGroup.Text >Change Name:</InputGroup.Text>
                                <FormControl
                                    id="nameChange"
                                    placeholder={each.name}
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                            <InputGroup className="mb-1">
                                <InputGroup.Text >Change Address:</InputGroup.Text>
                                <FormControl
                                    id="addChange"
                                    placeholder={each.address}
                                    aria-label="add"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-1">
                                <InputGroup.Text >Change Phone number :</InputGroup.Text>
                                <input className='form-control'
                                    id="phoneChange"
                                    type='number'
                                    placeholder={each.number}
                                    aria-label="phone"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-1">
                                <InputGroup.Text >Change Store Director :</InputGroup.Text>
                                <input className='form-control'
                                    id="directorX"
                                    type='text'
                                    placeholder={each.director}
                                    aria-label="direct"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <span style={{ marginTop: "3%", marginBottom: "2%" }}>  < Button onClick={this.asynchandleSubmit} id="submitNow" className='submitBtn' style={{ justifyContent: "center", borderColor: "lightgray", backgroundColor: "lightgray" }}>Submit Changes </Button></span>

                        </Row>
                    )
                }
            })






        return (
            <div>

                <h2 style={{ paddingLeft: '30px' }}>Shop Settings</h2>
                <Divider />
                <Col md={12} style={{ backgroundColor: "white", marginTop: "2%" }}>
                    <Row>
                        <Col md={11}>
                            <h5>Your Shops </h5>
                        </Col>
                        <Col md={1} >
                            <span style={{ position: 'absolute', right: '10px', paddingBottom: '5%', fontSize: '18pt', cursor: 'pointer' }} onClick={this.toggleTabOff}><AiOutlineClose /></span>
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        {viewStore}
                    </Row>

                </Col>
                <Col md={12} style={{ backgroundColor: "white", marginTop: "2%" }}>
                    <div style={this.state.showMyComponent ? { tab_index: this.state.tabID } : { display: 'none' }}>
                        {viewStoreData}
                    </div>

                </Col>


            </div>
        )
    }
}
