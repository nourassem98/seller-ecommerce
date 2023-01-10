import React, { Component } from 'react'
import { Divider } from '@mui/material'
import { Col, Row, InputGroup, FormControl, Button, Accordion, Container } from 'react-bootstrap'
import axios from 'axios'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { FaUserCircle } from 'react-icons/fa'
import './chat.css'
export default class Conversations extends Component {
    state = {
        conv: [],
        chat: [],
        message: [],
        currID: "",
        currIDInput: "",
        flagEmpty: true,
    }

    asynchandleSubmit = async event => {
        await this.state.currIDInput
        var chatItem = document.getElementById(this.state.currIDInput).value;
        var idSeller = window.sessionStorage.getItem("username");

        // var id = "2"
        var real_id_ticket = "9006921479034383"

        var Fdata = new FormData();
        Fdata.append("user_id", idSeller)
        Fdata.append("user_real_id", real_id_ticket)
        Fdata.append("reply", chatItem)

        axios.post('https://e-commerce-neon.herokuapp.com/add_ticket_reply/' + this.state.currID, Fdata)
            .then(res => {
                // console.log(res.data)
            })
            .catch(err => {
                console.error(err);
            }).then(

        )
        document.getElementById(this.state.currIDInput).value = ''
        alert("Message sent you will be redirected")
        window.location.reload()
    }
    componentDidMount() {
        var idSeller = window.sessionStorage.getItem("username");

        axios.get('https://e-commerce-neon.herokuapp.com/show_tickets_seller/' + idSeller)
            .then(res => {
                this.setState({ conv: Object.values(res.data.ticket) }
                )
                console.log(this.state.conv.length)
                if (res.data.ticket.length != 1) {
                    this.setState({ flagEmpty: false })
                }

            })

    }
    onChangeSetID = (e) => {
        this.setState({ currID: e })
        this.setState({ currIDInput: e })
    }


    render() {

        if (this.state.flagEmpty === false) {
            const returnChat = this.state.conv.map((each) => {

                return (
                    <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header >
                                <Col md={8}>{each.subject} #{each.real_id}</Col>
                                <Col md={3} style={{ textAlign: "right" }}>
                                    <span style={{ backgroundColor: "#028D17", borderRadius: "70px ", border: "4px solid #028D17" }}>
                                        <a style={{ fontSize: "14px" }}> Currently : {each.status}</a>

                                    </span> </Col>
                            </Accordion.Header>
                            <Accordion.Body >
                                {each.items_list.map((bubble) => {
                                    if (bubble.from === 0) {
                                        return (
                                            <Row style={{ marginTop: "2%" }}>
                                                <Col md={8}></Col>
                                                <Col md={4}>
                                                    <div class="message__avatar"><span style={{ marginRight: "4px" }}><FaUserCircle /></span></div>
                                                    <div style={{ opacity: "70%", backgroundColor: "#607d8b", borderRadius: "50px 2px", border: "1px solid #607d8b", padding: "20px" }}>
                                                        <p className="a" > {bubble.reply}  </p>
                                                    </div>
                                                    <div style={{ opacity: "50%" }}>
                                                        {format(new Date(bubble.date), " PPpp ")}


                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    }

                                    else {
                                        return (

                                            <Row style={{ marginTop: "2%" }}>
                                                <Col md={4}>
                                                    <div class="message__avatar" style={{ marginRight: "4px", marginBottom: "1%" }}><span><FaUserCircle /> {bubble.action_by}</span></div>
                                                    <div style={{ width: "auto", backgroundColor: "#fcd0b6", opacity: "70%", borderRadius: "2px 50px", border: "1px solid #fcd0b6", padding: "20px" }}>
                                                        <p className="a" > {bubble.reply} </p>
                                                    </div>
                                                    <div style={{ opacity: "50%" }}>
                                                        {format(new Date(bubble.date), " PPpp ")}

                                                    </div>
                                                </Col>
                                                <Col md={8}></Col>

                                            </Row>
                                        )
                                    }
                                })}
                                <Row style={{ marginTop: "2%" }}>
                                    <Col md={11}>

                                        <input className='form-control' style={{ width: "100%" }} id={each.real_id} placeholder="Type your chat here" />
                                    </Col>
                                    <Col md={1}>
                                        <Button onClick={() => {
                                            this.onChangeSetID(each.real_id);
                                            this.asynchandleSubmit();
                                            console.log(each.real_id)
                                        }} style={{ marginRight: "2%", backgroundColor: "lightgray", borderColor: "lightgray" }}> Send</Button></Col>

                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion >)
            })

            return (
                <div>
                    <h2 style={{ paddingLeft: '30px' }}>Conversations</h2>
                    <Row className='container' style={{ justifyContent: 'center', margin: '20px' }}>
                    </Row>
                    <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px', marginTop: '20px' }}>
                        <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px' }}>Previous Conversations</h4>
                    </div>
                    {returnChat}

                </div >
            )
        }
        else {

            return (
                <div>
                    <h2 style={{ paddingLeft: '30px' }}>Conversations</h2>
                    <Row className='container' style={{ justifyContent: 'center', margin: '20px' }}>
                    </Row>
                    <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px', marginTop: '20px' }}>
                        <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px' }}>Previous Conversations</h4>
                        <h3>You dont have any conversations yet</h3>
                    </div>


                </div >

            )
        }
    }
}
