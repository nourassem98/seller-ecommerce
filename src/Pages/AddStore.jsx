import axios from 'axios'
import React, { Component } from 'react'
import { Button, Col, Dropdown, Row } from 'react-bootstrap'
import './Styles.css'
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineClose } from 'react-icons/ai'

export default class AddStore extends Component {
    state = {

        show_details: true,
        loading: false,
        value: '',

    }



    render() {
        const Add_Store = () => {

            var name = document.getElementById('nameX').value;
            var number = document.getElementById('number').value;
            var director = document.getElementById('director').value;
            var address = document.getElementById('address').value;
            const idSeller = localStorage.getItem("username");

            var formdata = new FormData();
            formdata.append('name', name);
            formdata.append('number', number);
            formdata.append('director', director);
            formdata.append('address', address);
            formdata.append('seller_id', idSeller);

            console.log(name, number, director)

            axios.post('https://e-commerce-neon.herokuapp.com/add_store', formdata)
                .then((res) => {
                    this.setState({ loading: false });
                    if (res.data.success == '1') {

                        document.getElementById('name').value = '';
                        document.getElementById('number').value = '';
                        document.getElementById('director').value = '';
                        document.getElementById('address').value = '';
                        document.getElementById('response').innerHTML = 'Product Added Successfully';
                        setInterval(() => {
                            document.getElementById('response').innerHTML = '';
                        }, 5000)
                    }
                    else {
                        document.getElementById('response').innerHTML = 'An error occured please try again later';
                        setInterval(() => {
                            document.getElementById('response').innerHTML = '';
                        }, 5000)
                    }
                })
                .catch(err => {
                    console.error(err);
                })
        }

        return (
            <div>





                <div className={this.state.show_details ? 'panel actived' : 'panel'}>
                    <h2 style={{ paddingLeft: '30px', borderBottom: '1px solid black', paddingBottom: '10px' }}>Add new Store</h2>
                    <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px' }}>
                        <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px', marginBottom: '30px' }}>Store Information</h4>

                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Store Name :
                            </Col>
                            <Col md={7}>
                                <input required type='text' id='nameX' placeholder='Store Name' className='form-control' />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Store number:
                            </Col>
                            <Col md={7}>
                                <input className='form-control' type="number" id='number' placeholder='Enter the store store number' />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Address :
                            </Col>
                            <Col md={7}>
                                <input className='form-control' id='address' placeholder='Enter the store address here' />

                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Store Director
                            </Col>
                            <Col md={7}>
                                <input className='form-control' id='director' placeholder='Enter the store director name here' />

                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '1px', marginTop: '5%', marginRight: "10%", justifyContent: 'center' }}>
                            <Col md={3} style={{ alignSelf: 'center' }}>
                                <span id='response'></span>
                            </Col>
                            <Col md={2}>
                                <button disabled={this.state.loading} className='btn' onClick={() => Add_Store()} style={{ backgroundColor: 'lightgray', color: 'black' }}> {this.state.loading ? 'Loading' : 'Add Shop'}</button>
                            </Col>
                        </Row>
                    </div>


                    {/* </form> */}
                </div>






            </div >
        )
    }
}
