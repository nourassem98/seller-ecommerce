import React, { Component } from 'react'
import { Divider } from '@mui/material'
import { Col, Row, InputGroup, FormControl, Button, Accordion } from 'react-bootstrap'
import axios from 'axios'
import { saveAs } from 'file-saver'

export default class Downloads extends Component {

    state = {
        allImages: [],
        selectedFile: Object,
        show: false,
        currStateShow: "Show"
    }

    asynchandleSubmit = async event => {
        event.preventDefault();
        var name = document.getElementById('imageName').value;
        var imgFile = document.getElementById('imageFile');
        var Fdata = new FormData();

        if (document.getElementById('imageName').value.length != 0) {
            Fdata.append('name', name)
        }
        else {

        }

        Fdata.append('image', this.state.selectedFile)



        axios.post('https://e-commerce-neon.herokuapp.com/add_item_image', Fdata)
            .then(res => {
                console.log(res.data)
                document.getElementById('fr').reset();
            })
            .catch(err => {
                console.error(err);
            })
    }




    componentDidMount() {
        axios.get('https://e-commerce-neon.herokuapp.com/show_items_image')
            .then(res => {

                this.setState({ allImages: Object.values(res.data.items_image) })

            })
            .catch(err => {
                console.error(err);
            })
    }





    render() {
        const handleFileSelect = (event) => {
            this.setState({ selectedFile: event.target.files[0] })
        }


        const onClickShow = () => {
            this.setState({ show: !this.state.show })
            if (this.state.show === true) {
                this.setState({ currStateShow: "Show" })
            }
            else {
                this.setState({ currStateShow: "Hide" })
            }

        }
        let downloadImage = this.state.allImages.map((eachimg) => {
            // console.log(eachimg.url)
            return (
                <div>
                    <img style={{ width: "30%", margin: "2%" }} src={eachimg.url}></img>
                    <a style={{ marginLeft: "10%" }} >{eachimg.name} </a>
                </div>
            )
        })



        return (
            <div>
                <h2 style={{ paddingLeft: '30px' }}>Show & Uploads</h2>
                <Row className='container' style={{ justifyContent: 'center', margin: '30px' }}>
                </Row>

                <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px', marginTop: '20px' }}>
                    <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px', marginBottom: '30px' }}>Upload images</h4>


                    <Row >
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Item name
                        </Col>
                        <Col md={7}>
                            <input required type='text' id='imageName' className='form-control' multiple accept='csv/*' />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "2%" }}>
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Upload file
                        </Col>
                        <Col md={7}>
                            <input required type='file' id='imageFile' onChange={handleFileSelect} className='form-control' multiple accept='csv/*' />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} />
                        <Col md={7} style={{ textAlign: 'right' }}>   <small style={{ marginBottom: '20px', fontSize: '0.8em' }}>Please upload a single photo </small></Col>
                    </Row>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={4} style={{ textAlign: 'center' }} >
                            <Button id="uploadFile" onClick={this.asynchandleSubmit} style={{ borderColor: "lightgray", backgroundColor: "lightgray", color: 'black' }}>Upload</Button>
                        </Col>
                        <Col md={4}></Col>

                    </Row>
                </div>
                <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px', marginTop: '20px' }}>
                    <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px', marginBottom: '30px' }}>Show all products images</h4>

                    <Row >
                        <Col md={4} style={{ alignSelf: 'center' }}>
                            Show all images
                        </Col>
                        <Col md={7}>
                            <Button onClick={onClickShow} style={{ borderColor: "lightgray", backgroundColor: "lightgray", color: "black" }}>{this.state.currStateShow}</Button>
                        </Col>
                    </Row>
                    <Col>
                        {this.state.show === true ? downloadImage : ''}
                    </Col>
                </div>

            </div >
        )
    }
}
