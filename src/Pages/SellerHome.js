import React, { Component } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { AiOutlineHome, AiOutlineHistory, AiOutlineDownload, AiOutlineUpload, AiOutlineShoppingCart, AiOutlineSetting, AiOutlineUser, AiOutlineWechat } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { GrDiamond } from 'react-icons/gr'
import { BsStarHalf, BsCashStack } from 'react-icons/bs'
import { MdOutlineLocalShipping } from 'react-icons/md'
import { FaStore } from 'react-icons/fa'
import { FcSupport } from 'react-icons/fc'
import axios from 'axios'
import PurchaseHistory from './PurchaseHistory'
import Products from './Products'
import Orders from './Orders'
import ProductReviews from './ProductReviews'
import ManageProfile from './ManageProfile'
import ProductBulkUpload from './ProductBulkUpload'
import PaymentHistory from './PaymentHistory'
import MoneyWithdraw from './MoneyWithdraw'
import Conversations from './Conversations'
import SuppTicket from './SuppTicket'
import ShopSettings from './ShopSettings'
import Downloads from './Downloads'
import ShippingCost from './ShippingCost'
import AddStore from './AddStore'
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Styles.css'

export default class SellerHome extends Component {

    state = {

        tab_index: 1,
        dashboard: [],
        seller: {},
        notverified: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk-KT0s9xMZAQxhy3d80nZkeJh5O3G0VaMw3sQqVsdGZdTdGqtSwCGHvAiRgE6bRQKo_o&usqp=CAU',
        verified: 'https://thumbs.dreamstime.com/b/verified-stamp-sign-logo-isolated-white-background-vector-design-86012075.jpg',
        locationKeys: [],

    }
    componentDidMount() {
        var idSeller = window.localStorage.getItem("username");
        console.log(idSeller)
        axios.get('https://e-commerce-neon.herokuapp.com/seller_dash/' + idSeller)
            .then(res => {
                this.setState({ dashboard: res.data, seller: res.data.seller })
            })
            .catch(err => {
                console.error(err);
            })
    }

    logOut() {
        localStorage.removeItem(window.localStorage.getItem("username"));
        localStorage.clear();
        window.localStorage.setItem("success", false)
        window.location.replace("/")
        window.localStorage.clear()
    }

    render() {
        const { navigation } = this.props
        const toggleTab = (id) => {
            this.setState({ tab_index: id });
        }

        // const navigate = useNavigate();
        window.addEventListener('popstate', function (event) {
            // console.log(window.history.length)
            // localStorage.removeItem(window.localStorage.getItem("username"));
            // localStorage.clear();
            // // localStorage.clear();
            // window.localStorage.setItem("success", false)
            // this.window.history.go("/")
            // window.history.back()

            window.location.replace('/S_Home');

        }, false);



        const { seller } = this.state;
        const { tab_index } = this.state;
        const { dashboard } = this.state;
        const { notverified } = this.state;
        const { verified } = this.state;

        return (
            <div className='container' style={{ marginTop: '50px', marginBottom: '50px' }} >
                {/* <Navigate to='/S_Home'> X</Navigate> */}
                <Row >
                    <Col md={3} >
                        <Row >
                            <Col md={12} style={{ backgroundColor: 'white', boxShadow: 'rgba(149, 157, 165, 0.3) 0px 8px 24px' }}>
                                {/* <Button style={{ paddingLeft: "5%", backgroundColor: "lightgray", borderColor: "lightgray" }} className="submitBtn" onClick={this.logOut}> Sign out</Button> */}



                                <Row style={{ justifyContent: 'center' }}>
                                    <Col md={6} style={{ textAlign: 'center', padding: '10px' }}>
                                        <img src={seller.image} style={{ borderRadius: '50%', width: '50%', aspectRatio: '1/1' }} alt=' ' />
                                        {/* <button onClick={this.Comp}> x </button> */}
                                    </Col>
                                </Row>
                                <Row style={{ justifyContent: 'center' }}>
                                    <Col className='test' md={6} style={{ textAlign: 'center', paddingBottom: '10px' }}>
                                        <b> {seller.name}</b>

                                    </Col>
                                </Row>



                                {/* Start Menu */}
                                <Row className={tab_index === 1 ? 'tab active' : 'tab'} onClick={() => toggleTab(1)}>
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><AiOutlineHome className='left-menu-icon' /> <span className='color-black' >Dashboard</span> </span>
                                </Row>
                                <Row className={tab_index === 2 ? 'tab active' : 'tab'} onClick={() => toggleTab(2)} >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><AiOutlineHistory className='left-menu-icon' /> <span className='color-black' >Purchase History</span> </span>
                                </Row>
                                <Row className={tab_index === 3 ? 'tab active' : 'tab'} onClick={() => toggleTab(3)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><AiOutlineDownload className='left-menu-icon' /> <span className='color-black' >Downloads & Uploads</span> </span>
                                </Row>

                                <Row className={tab_index === 4 ? 'tab active' : 'tab'} onClick={() => toggleTab(4)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><GrDiamond className='left-menu-icon' /> <span className='color-black' >Products</span> </span>
                                </Row>
                                <Row className={tab_index === 5 ? 'tab active' : 'tab'} onClick={() => toggleTab(5)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><AiOutlineUpload className='left-menu-icon' /> <span className='color-black' >Product Bulk Upload</span> </span>
                                </Row>
                                <Row className={tab_index === 6 ? 'tab active' : 'tab'} onClick={() => toggleTab(6)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><FaStore className='left-menu-icon' /> <span className='color-black' >Add Shop</span> </span>
                                </Row>
                                <Row className={tab_index === 7 ? 'tab active' : 'tab'} onClick={() => toggleTab(7)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><MdFavoriteBorder className='left-menu-icon' /> <span className='color-black' >Shop Settings</span> </span>
                                </Row>
                                <Row className={tab_index === 8 ? 'tab active' : 'tab'} onClick={() => toggleTab(8)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><AiOutlineShoppingCart className='left-menu-icon' /> <span className='color-black' >Orders</span> </span>
                                </Row>
                                <Row className={tab_index === 9 ? 'tab active' : 'tab'} onClick={() => toggleTab(9)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><BsStarHalf className='left-menu-icon' /> <span className='color-black' >Product Reviews</span> </span>
                                </Row>

                                <Row className={tab_index === 10 ? 'tab active' : 'tab'} onClick={() => toggleTab(10)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><AiOutlineHistory className='left-menu-icon' /> <span className='color-black' >Payment History</span> </span>
                                </Row>
                                <Row className={tab_index === 11 ? 'tab active' : 'tab'} onClick={() => toggleTab(11)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><BsCashStack className='left-menu-icon' /> <span className='color-black' >Money Withdraw</span> </span>
                                </Row>
                                <Row className={tab_index === 12 ? 'tab active' : 'tab'} onClick={() => toggleTab(12)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><MdOutlineLocalShipping className='left-menu-icon' /> <span className='color-black' >Shipping Cost</span> </span>
                                </Row>
                                <Row className={tab_index === 13 ? 'tab active' : 'tab'} onClick={() => toggleTab(13)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><AiOutlineWechat className='left-menu-icon' /> <span className='color-black' >Conversations</span> </span>
                                </Row>
                                <Row className={tab_index === 14 ? 'tab active' : 'tab'} onClick={() => toggleTab(14)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><FcSupport className='left-menu-icon' /> <span className='color-black' >Support Ticket</span> </span>
                                </Row>
                                <Row className={tab_index === 15 ? 'tab active' : 'tab'} onClick={() => toggleTab(15)}  >
                                    <span className='left-menu' style={{ verticalAlign: 'text-bottom' }}><AiOutlineUser className='left-menu-icon' /> <span className='color-black' >Manage Profile</span> </span>
                                </Row>
                            </Col>

                        </Row>
                        <Row >

                            <div style={{ padding: '15px', backgroundColor: 'white', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', zIndex: '2', borderTop: '1px solid #ccd2db' }}>
                                <Row style={{ textAlign: 'center' }}>
                                    <h3>Sold Amount</h3>
                                </Row>
                                <Row style={{ textAlign: 'center' }}>
                                    <h6>Your sold amount(current month)</h6>
                                </Row>
                                <Row style={{ textAlign: 'center', justifyContent: 'center', margin: '25px' }}>
                                    <Col md={12}>
                                        <b> <span style={{ backgroundColor: 'lightgray', padding: '15px 12px 15px 12px', color: 'white' }}> {(1100).toLocaleString(undefined)} EGP</span></b>
                                    </Col>
                                </Row>
                                <Row style={{ margin: '5px', textAlign: 'left' }}>
                                    <Col md={5}>
                                        Total Sold:
                                    </Col>
                                    <Col md={7} style={{ textAlign: 'right' }}>
                                        {dashboard.total_earning}

                                        &nbsp; EGP
                                    </Col>
                                </Row>
                                <Row style={{ margin: '5px', textAlign: 'left' }}>
                                    <Col md={6}>
                                        Last Month Sold:
                                    </Col>
                                    <Col md={6} style={{ textAlign: 'right' }}>
                                        {(1100).toLocaleString(undefined)} EGP
                                    </Col>
                                </Row>
                            </div>


                        </Row>
                    </Col>

                    <Col md={9}>
                        <div className="tab-panes" style={{ marginRight: '0' }} >

                            <Row style={{ paddingLeft: '10px' }} className={tab_index === 1 ? 'panel actived' : 'panel'}>   {/* Dashboard */}
                                <h2 style={{ paddingLeft: '30px' }}>Dashboard</h2>
                                <Col md={11}>

                                    <Row style={{ marginTop: '50px', paddingLeft: '20px', paddingRight: '0', marginRight: '0' }}>
                                        <Col md={3} >
                                            <div style={{ width: '95%', backgroundColor: 'blue', padding: '10px', height: '130px', background: 'rgb(41,148,233)', background: 'linear-gradient(160deg, rgba(41,148,233,1) 18%, rgba(164,206,234,1) 89%)' }}>
                                                <span style={{ color: 'white' }}>
                                                    <h3 >{dashboard.product_count}</h3>
                                                </span>
                                                <span style={{ color: '#ffff' }}>
                                                    <h5 style={{ marginTop: '10px', opacity: '0.8' }}>Products</h5>
                                                </span>
                                            </div>
                                        </Col>
                                        <Col md={3} >
                                            <div className="submitBtn" style={{ paddingLeft: '20px', backgroundColor: 'blue', padding: '10px', height: '130px', background: 'rgb(207,78,151)', background: 'linear-gradient(160deg, rgba(207,78,151,1) 18%, rgba(235,131,177,1) 89%)' }}>
                                                <span style={{ color: 'white' }}>
                                                    <h3 >{dashboard.total_sales}</h3>
                                                </span>
                                                <small style={{ color: '#ffff' }}>
                                                    <h5 style={{ marginTop: '10px', opacity: '0.8' }}>Total sale</h5>
                                                </small>
                                            </div>

                                        </Col>
                                        <Col md={3}>
                                            <div style={{ paddingLeft: '20px', backgroundColor: 'blue', padding: '10px', height: '130px', background: 'rgb(116,85,189)', background: 'linear-gradient(160deg, rgba(116,85,189,1) 18%, rgba(163,139,210,1) 89%)' }}>
                                                <span style={{ color: 'white' }}>
                                                    <h3 >{dashboard.total_earning} EGP</h3>
                                                </span>
                                                <span style={{ color: '#ffff' }}>
                                                    <h5 style={{ marginTop: '10px', opacity: '0.8' }}>Total earnings</h5>
                                                </span>
                                            </div>

                                        </Col>
                                        <Col md={3} >
                                            <div style={{ backgroundColor: 'blue', height: '130px', background: 'rgb(232, 153, 80)', padding: '10px', background: 'linear-gradient(160deg, rgba(232, 153, 80,1) 18%, rgba(245, 212, 181,1) 89%)' }}>
                                                <span style={{ color: 'white' }}>
                                                    <h3 >{dashboard.successfule_orders}</h3>
                                                </span>
                                                <span style={{ color: '#ffff' }}>
                                                    <h5 style={{ marginTop: '10px', opacity: '0.8' }}>Successful orders</h5>
                                                </span>
                                            </div>

                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={7} style={{ backgroundColor: 'white', marginTop: '30px', marginLeft: '30px', paddingBottom: '30px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                                            {/* Orders div */}
                                            <Row style={{ padding: '10px', borderBottom: '1px solid #ccd2db' }}>
                                                <h4>Orders</h4>
                                            </Row>
                                            <div style={{ padding: '15px', borderBottom: '1px solid #ccd2db' }}>
                                                <Row>
                                                    <Col md={8}>
                                                        <span>Total orders:</span>
                                                    </Col>
                                                    <Col md={3}>
                                                        <span>{dashboard.total_orders}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div style={{ padding: '15px', borderBottom: '1px solid #ccd2db' }}>
                                                <Row>
                                                    <Col md={8}>
                                                        <span>Pending orders:</span>
                                                    </Col>
                                                    <Col md={3}>
                                                        <span>{dashboard.pending_orders}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div style={{ padding: '15px', borderBottom: '1px solid #ccd2db' }}>
                                                <Row>
                                                    <Col md={8}>
                                                        <span>Cancelled orders:</span>
                                                    </Col>
                                                    <Col md={3}>
                                                        <span>{dashboard.cancelled_orders}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div style={{ padding: '15px' }}>
                                                <Row>
                                                    <Col md={8}>
                                                        <span>Successful orders:</span>
                                                    </Col>
                                                    <Col md={3}>
                                                        <span>{dashboard.successfule_orders}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                        <Col md={4} style={{ backgroundColor: 'white', marginTop: '30px', marginLeft: '30px', paddingBottom: '30px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                                            {/* verification div */}


                                            <Row style={{ textAlign: 'center', marginTop: '20px' }}>
                                                <img style={{ width: '100%', height: '250px' }} src={seller.permission == true ? verified : notverified} alt='' />
                                            </Row>
                                            <Row style={{ textAlign: 'center', marginTop: '50px', display: seller.permission == true ? 'none' : 'block' }}>

                                                <b> <span style={{ backgroundColor: 'black', color: "white", padding: '15px 12px 15px 12px', cursor: 'pointer' }}> Verify Now!</span></b>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{ paddingLeft: '10px' }} className={tab_index === 2 ? 'panel actived' : 'panel'} >
                                <PurchaseHistory index={{ tab_index: tab_index, change_index: toggleTab.bind(this) }} data={dashboard} />
                            </Row>
                            <Row className={tab_index === 3 ? 'panel actived' : 'panel'}>
                                <Downloads />
                            </Row>

                            <Row className={tab_index === 4 ? 'panel actived' : 'panel'}>
                                <Products />
                            </Row>
                            <Row className={tab_index === 5 ? 'panel actived' : 'panel'}>
                                <ProductBulkUpload />
                            </Row>
                            <Row className={tab_index === 6 ? 'panel actived' : 'panel'}>
                                <AddStore />
                            </Row>
                            <Row className={tab_index === 7 ? 'panel actived' : 'panel'}>
                                <ShopSettings />
                            </Row>
                            <Row style={{ paddingLeft: '10px' }} className={tab_index === 8 ? 'panel actived' : 'panel'}>
                                <Orders />
                            </Row>
                            <Row className={tab_index === 9 ? 'panel actived' : 'panel'}>
                                <ProductReviews />
                            </Row>
                            <Row className={tab_index === 10 ? 'panel actived' : 'panel'}>
                                <PaymentHistory />
                            </Row>
                            <Row className={tab_index === 11 ? 'panel actived' : 'panel'}>
                                <MoneyWithdraw />
                            </Row>
                            <Row className={tab_index === 12 ? 'panel actived' : 'panel'}>
                                <ShippingCost />
                            </Row>
                            <Row className={tab_index === 13 ? 'panel actived' : 'panel'}>
                                <Conversations />
                            </Row>
                            <Row className={tab_index === 14 ? 'panel actived' : 'panel'}>
                                <SuppTicket />
                            </Row>
                            <Row className={tab_index === 15 ? 'panel actived' : 'panel'}>
                                <ManageProfile />
                            </Row>


                        </div>
                    </Col>













                </Row>









            </div>
        )
    }
}
