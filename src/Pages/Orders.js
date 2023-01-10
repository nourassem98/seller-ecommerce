
import axios from 'axios'
import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import './Styles.css'

import { AiOutlineClose } from 'react-icons/ai'
export default class Orders extends Component {


    state = {
        data: [],
        show_details: false,
        items_list: [''],
    }

    componentDidMount() {
        var idSeller = window.sessionStorage.getItem("username");
        console.log(idSeller)
        axios.get('https://e-commerce-neon.herokuapp.com/show_all_orders/' + idSeller)
            .then(res => {
                this.setState({ data: Object.values(res.data.purchase) })

            })
            .catch(err => {
                console.error(err);
            })


    }
    render() {
        const backup = console.warn;

        console.warn = function filterWarnings(msg) {
            const supressedWarnings = ['Warning: Each child in a list should have a unique "key" prop.', 'other warning text'];

            if (!supressedWarnings.some(entry => msg.includes(entry))) {
                backup.apply(console, arguments);
            }
        };



        const { items_list } = this.state;
        const show_details = (list) => {
            this.setState({ show_details: true, items_list: list });
        }
        const hide_details = () => {
            this.setState({ show_details: false });
        }


        return (
            <div>
                <div className={this.state.show_details ? 'panel' : 'panel actived'}>


                    <h2 style={{ paddingLeft: '30px' }}>Orders</h2>
                    <Col md={12} style={{ backgroundColor: 'white' }}>




                        <table className='table borderless-table'>

                            <thead>
                                <tr>
                                    <th>Order No.</th>
                                    <th>Name</th>
                                    <th>Phone </th>
                                    <th>Products details</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                    <th>Total (EGP)</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* <Row style={{ marginTop: '50px', paddingLeft: '20px', paddingRight: '0', marginRight: '0', paddingTop: '20px', paddingBottom: '20px' }}>
                            <Col md={2}>Order no</Col>
                            <Col md={2}>Name</Col>
                            <Col md={2}>Phone</Col>
                            <Col md={2}>Products details</Col>
                            <Col>Status</Col>
                            <Col>Payment</Col>
                            <Col>Total</Col>


                        </Row> */}
                                {this.state.data.map((p) => {
                                    // console.log(p.comment);


                                    return (
                                        <tr style={{ paddingLeft: '20px', paddingRight: '0', marginRight: '0', paddingTop: '20px', paddingBottom: '10px' }}>
                                            <td ><small>{p.order_id}</small></td>
                                            <td >{p.user}</td>
                                            <td>{p.phone}</td>
                                            <td onClick={() => show_details(p.items_list)} md={2} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Products details</td>
                                            <td>{p.status}</td>
                                            <td>{p.payment_method}</td>
                                            <td>{p.price}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </Col>
                </div>
                <div className={this.state.show_details ? 'panel actived' : 'panel'} style={{ position: 'relative' }}>
                    <h2 style={{ paddingLeft: '30px', borderBottom: '1px solid black', paddingBottom: '10px' }}>Purchase Details</h2>
                    <span style={{ position: 'absolute', right: '0', top: '0', fontSize: '2em', cursor: 'pointer' }} onClick={() => hide_details()}><AiOutlineClose /></span>



                    <table className='table borderless-table'>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Count</th>
                                <th>Price (EGP)</th>
                                <th>Date</th>

                            </tr>
                        </thead>
                        <tbody>


                            {items_list.map((single) => {
                                var y = new Date('2023-05-27 17:31:43.315353');

                                if (single.date == null) {

                                    var x = y;

                                }
                                else {
                                    var x = new Date(single.date);
                                }
                                return (
                                    <tr>
                                        <td>{single.name}</td>
                                        <td> x {single.count}</td>
                                        <td>{single.price}</td>
                                        <td>
                                            {new Intl.DateTimeFormat("en-GB", {
                                                year: "numeric",
                                                month: "long",
                                                day: "2-digit",
                                                weekday: 'short'
                                            }).format(x)}
                                        </td>
                                    </tr>
                                )

                            })}
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
}
