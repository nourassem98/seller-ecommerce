import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import './Styles.css'
export default class ShippingCost extends Component {

    state = {
        areaList: ["Abbassia", "Ain Shams", "Azbakeya", "Bab al-Louq", "Boulaq", "Cairo", "Coptic", "Daher", "Downtown", "El Manial", "El Marg", "El Matareya", "El Qobbah", "El Rehab", "El Sahel", "El Sakkakini", "Ezbet El Haggana", "Ezbet El Nakhl", "Faggala", "Fifth Settlement", "Fustat", "Garden City", "Gezira", "Heliopolis", "Maadi", "Old Cairo", "Roda Island", "Shubra", "Shubra El Kheima", "Wagh El Birket", "Zamalek", "Zeitoun"],
        locations: []
    }

    componentDidMount() {
        var idSeller = sessionStorage.getItem("username");

        axios.get('https://e-commerce-neon.herokuapp.com/show_seller_locations/' + idSeller)
            .then(res => {
                this.setState({ locations: Object.values(res.data.all_locations) })
                // console.log(this.state.locations)

            })
            .catch(err => {
                console.error(err);
            })


    }
    asynchandleSubmit = async event => {
        await shipPrice
        var shipPrice = document.getElementById('shipPrice').value;
        var district = document.getElementById('district').value;

        var idSeller = sessionStorage.getItem("username");

        var Fdata = new FormData();
        Fdata.append('name', district);
        Fdata.append('country', "Egypt")
        Fdata.append('price', shipPrice);
        Fdata.append('seller_id', idSeller);

        axios.post('https://e-commerce-neon.herokuapp.com/add_location', Fdata)
            .then(res => {
                // console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            }).then(

        )
    }

    render() {

        const areaMapper = this.state.areaList.map((eachDistrict) => {
            return (
                <option value={eachDistrict} key={eachDistrict}> {eachDistrict} </option>
            )
        })


        return (
            <div>
                <h2 style={{ paddingLeft: '30px' }}>Shipping Cost</h2>
                <Row className='container' style={{ justifyContent: 'center', margin: '30px' }}>
                </Row>

                <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px', marginTop: '20px' }}>
                    <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px', marginBottom: '30px' }}>Enter shipping cost value</h4>
                    <Row style={{ marginTop: "2%" }} >
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Select area :
                        </Col>
                        <Col md={7}>
                            <select id='district' className='form-select'>

                                {areaMapper}
                            </select>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "2%" }} >
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Specify price of shipping :
                        </Col>
                        <Col md={7}>
                            <input type="number" id='shipPrice' className='form-control' />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} />
                        <Col md={7} style={{ textAlign: 'right' }}>   <small style={{ marginBottom: '20px', fontSize: '0.8em' }}>Please enter the specified amount</small></Col>
                    </Row>

                    <Row>
                        <Col md={4}></Col>
                        <Col md={4} style={{ textAlign: 'center' }} >
                            <Button onClick={this.asynchandleSubmit} className="submitBtn" style={{ borderColor: "lightgray", backgroundColor: "lightgray" }}>Submit</Button>
                        </Col>
                        <Col md={4}></Col>

                    </Row>

                </div>
                <table className='table borderless-table'>

                    <thead>
                        <tr>
                            <th>Area</th>
                            <th>Total (EGP)</th>

                        </tr>
                    </thead>

                    <tbody>
                        {this.state.locations.map((single) => {
                            return (
                                <tr>
                                    <td>{single.name}</td>
                                    <td> {single.price} EGP</td>

                                </tr>
                            )

                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}
