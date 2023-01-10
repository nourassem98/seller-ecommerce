import axios from 'axios'
import React, { Component } from 'react'
import { Button, Col, Dropdown, Row } from 'react-bootstrap'
import './Styles.css'
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineClose } from 'react-icons/ai'
export default class Products extends Component {
    state = {

        show_details: true,
        products: [],
        order: 'ASC',
        brands: [],
        loading: false,
        categories: [],
        stores: [],
        images: [],
        loading2: false,
        value: '',
        availableNames: []
    }
    componentDidMount() {
        var idSeller = window.localStorage.getItem("username");

        axios.get('https://e-commerce-neon.herokuapp.com/show_all_products/' + idSeller)
            .then(res => {
                this.setState({ products: res.data.all_items })

            })
            .catch(err => {
                console.error(err);
            })
        axios.get('https://e-commerce-neon.herokuapp.com/show_brands')
            .then(res => {
                this.setState({ brands: res.data.brands })

            })
            .catch(err => {
                console.error(err);
            })
        axios.get('https://e-commerce-neon.herokuapp.com/show_categorys')
            .then(res => {
                this.setState({ categories: res.data.categorys })

            })
            .catch(err => {
                console.error(err);
            })
        axios.get('https://e-commerce-neon.herokuapp.com/show_shops/' + idSeller)
            .then(res => {
                this.setState({ stores: res.data.stores })

            })
            .catch(err => {
                console.error(err);
            })
    }



    search = async val => {
        var name = document.getElementById('itmSearch').value;
        this.setState({ loading: true });
        const res = await axios.get(
            "https://e-commerce-neon.herokuapp.com/item_image_search/" + name
        );
        const images = await res.data.item;
        if (images === undefined) {
            this.setState({ images: [], loading: false });
        }
        else {
            this.setState({ images, loading: false });

        }
    };

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };


    insertObject(arr, obj) {
        // append object
        arr.push(obj);
        // console.log(arr);
    }
    render() {

        var imageHelper = this.state.images.map((eachImage) => {
            const isObjectPresent = this.state.availableNames.find((o) => o.name === eachImage.name);
            if (!isObjectPresent) {
                let obj = { name: eachImage.name, url: eachImage.image }
                this.insertObject(this.state.availableNames, obj)
                // console.log(this.state.availableNames)
            }


            if (this.state.images != undefined) {
                return (

                    <Col style={{ textAlign: "center", marginTop: "5%" }}>
                        <img style={{ width: "70%", margin: "1%" }} src={eachImage.image} />
                        <Row style={{ textAlign: "center" }}> <a>{eachImage.name} </a></Row>
                    </Col>

                )
            }
        })



        const show_details = () => {
            this.setState({ show_details: true });
        }
        const hide_details = () => {
            this.setState({ show_details: false });
        }



        const sorting = (col) => {
            if (this.state.order == 'ASC') {
                const sorted = this.state.products.sort((a, b) =>
                    a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
                );
                this.setState({ products: sorted, order: 'DSC' })
                // console.log(this.state.products)
            }
            if (this.state.order == 'DSC') {
                const sorted = this.state.products.sort((a, b) =>
                    a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
                );
                this.setState({ products: sorted, order: 'ASC' })
                // console.log(this.state.products)
            }
        }
        const sorting_numbers = (col) => {
            if (this.state.order == 'ASC') {
                const sorted = this.state.products.sort((a, b) =>
                    a[col] > b[col] ? 1 : -1
                );
                this.setState({ products: sorted, order: 'DSC' })
                // console.log(this.state.products)
            }
            if (this.state.order == 'DSC') {
                const sorted = this.state.products.sort((a, b) =>
                    a[col] < b[col] ? 1 : -1
                );
                this.setState({ products: sorted, order: 'ASC' })
                // console.log(this.state.products)
            }
        }
        const show_cats = this.state.categories.map((cat) => {

            return (
                <option value={cat.id} key={cat.id} >{cat.name} </option>
            )
        })
        const show_brands = this.state.brands.map((brand) => {

            return (
                <option value={brand.id} key={brand.id}>{brand.name} </option>
            )
        })
        const show_stores = this.state.stores.map((store) => {

            return (
                <option value={store.id} key={store.id}>{store.name} </option>
            )
        })
        const check_percentage = () => {

            var rate = document.getElementById('price_rate').value;
            if (rate > 100) {
                document.getElementById('price_rate').value = 100;
            }
            if (rate < 0) {
                document.getElementById('price_rate').value = 0;
            }

        }
        const max_images = () => {
            var count = document.getElementById('images').files.length;

            if (count > 5) {
                document.getElementById('images').value = null;
            }



        }
        const Add_Product = () => {
            // var form = document.getElementById('form_product');
            console.log("ok")
            var name = document.getElementById('name').value;
            var category = document.getElementById('category').value;
            var brand = document.getElementById('brand').value;
            var qnty = document.getElementById('qnty').value;
            var sub_category_id = "";
            var color = document.getElementById('color').value;
            var store = document.getElementById('store').value;
            var image1 = document.getElementById('im1').value;
            // var valueImg1 = image1.options[image1.selectedIndex].value;
            var image2 = document.getElementById('im2').value;
            // var valueImg2 = image2.options[image2.selectedIndex].value;
            var image3 = document.getElementById('im3').value;
            // var valueImg3 = image3.options[image3.selectedIndex].value;
            var image4 = document.getElementById('im4').value;
            // var valueImg4 = image4.options[image4.selectedIndex].value;
            var image5 = document.getElementById('im5').value;
            // var valueImg5 = image5.options[image5.selectedIndex].value;
            var price = document.getElementById('price').value;
            var price_rate = document.getElementById('price_rate').value;
            var description = document.getElementById('description').value;

            // console.log(valueImg1)
            // console.log(valueImg2)
            // console.log(valueImg3)
            // console.log(valueImg4)
            // console.log(valueImg5)


            if (image1 === undefined) {
                image1 = ""
            }
            if (image2 === undefined) {
                image2 = ""
            }
            if (image3 === undefined) {
                image3 = ""
            }
            if (image4 === undefined) {
                image4 = ""
            }
            if (image5 === undefined) {
                image5 = ""
            }
            if (name == '' || qnty == '' || price == "" || price_rate == "" || description == "") {

            }
            else {
                this.setState({ loading: true });
                if (color == '') {
                    color = 'N/A';
                }

                var formdata = new FormData();
                formdata.append('name', name);
                formdata.append('color', color);
                formdata.append('description', description);
                formdata.append('show_price_rate', price_rate);
                formdata.append('category_id', category);
                formdata.append('brand_id', brand);
                formdata.append('store_id', store);
                formdata.append('s_price', '0');
                formdata.append('m_price', price);
                formdata.append('l_price', '0');
                formdata.append('quantity', qnty);
                formdata.append('image1', image1);
                formdata.append('image2', image2);
                formdata.append('image3', image3);
                formdata.append('image4', image4);
                formdata.append('image5', image5);
                formdata.append('links', ' ');
                formdata.append('sub_category_id', sub_category_id);

                axios.post('https://e-commerce-neon.herokuapp.com/add_item', formdata)
                    .then((res) => {
                        console.log(res)
                        this.setState({ loading: false });
                        if (res.data.success == '1') {
                            document.getElementById('name').value = '';
                            document.getElementById('category').value = '';
                            document.getElementById('brand').value = '';
                            document.getElementById('qnty').value = '';
                            document.getElementById('color').value = '';
                            document.getElementById('store').value = '';
                            document.getElementById('images').value = null;
                            document.getElementById('price').value = '';
                            document.getElementById('price_rate').value = '';
                            document.getElementById('description').value = '';
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
                console.log(name)
            }

        }
        return (
            <div>

                <div className={this.state.show_details ? 'panel' : 'panel actived'}>


                    <h2 style={{ paddingLeft: '30px' }}>All Products</h2>


                    <Row className='container' style={{ justifyContent: 'center', margin: '30px' }}>
                        <Col md={4} style={{ backgroundColor: 'white' }}>
                            <Row style={{ textAlign: 'center', justifyContent: 'center', margin: '20px' }}>
                                <img onClick={() => show_details()} style={{ width: '50%', aspectRatio: '1/0.8', cursor: 'pointer', borderRadius: '50%' }} src='https://iconape.com/wp-content/files/ea/367350/svg/ios-add-circle-outline-logo-icon-png-svg.png' alt='' />
                            </Row>
                            <Row style={{ justifyContent: 'center', marginBottom: '40px' }}>
                                <span style={{ textAlign: 'center', fontSize: '1.6em', color: '#f76102' }}> Add new Product</span>
                            </Row>
                        </Col>
                    </Row>
                    <div style={{ margin: '30px', backgroundColor: 'white' }}>
                        <table className='table borderless-table'>

                            <thead>
                                <tr>
                                    <th style={{ position: 'relative', cursor: 'pointer' }} onClick={() => sorting('name')}>Name <BiSortAlt2 style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translate(-50%,-50%)' }} /></th>
                                    <th style={{ position: 'relative', cursor: 'pointer' }} onClick={() => sorting_numbers('quantity')}>Stock <BiSortAlt2 style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translate(-50%,-50%)' }} /></th>
                                    <th style={{ position: 'relative', cursor: 'pointer' }} onClick={() => sorting('category')}>Category <BiSortAlt2 style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translate(-50%,-50%)' }} /> </th>
                                    <th style={{ position: 'relative', cursor: 'pointer' }} onClick={() => sorting_numbers('show_price_rate')}>Discount <BiSortAlt2 style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translate(-50%,-50%)' }} /></th>
                                    <th style={{ position: 'relative', cursor: 'pointer' }} onClick={() => sorting_numbers('before_m_price')}>Original Price <BiSortAlt2 style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translate(-50%,-50%)' }} /></th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.products.map((p) => {

                                        return (

                                            <tr>
                                                <td>
                                                    {p.name}
                                                </td>
                                                <td>
                                                    x {p.quantity}
                                                </td>
                                                <td>
                                                    {p.category}
                                                </td>
                                                <td>
                                                    {p.show_price_rate} %
                                                </td>
                                                <td>
                                                    {p.before_m_price}
                                                </td>
                                            </tr>
                                        )


                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>


                <div className={this.state.show_details ? 'panel actived' : 'panel'}>
                    <h2 style={{ paddingLeft: '30px', borderBottom: '1px solid black', paddingBottom: '10px' }}>Add new Product</h2>
                    <span style={{ position: 'absolute', right: '10px', top: '0', fontSize: '2em', cursor: 'pointer' }} onClick={() => hide_details()}><AiOutlineClose /></span>
                    {/* <form id='form_product'> */}
                    <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px' }}>
                        <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px', marginBottom: '30px' }}>Product Information</h4>

                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Product Name
                            </Col>
                            <Col md={7}>
                                <input required type='text' id='name' placeholder='Product Name' className='form-control' />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Category
                            </Col>
                            <Col md={7}>
                                <select id='category' className='form-select'>
                                    {show_cats}
                                </select>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Brand
                            </Col>
                            <Col md={7}>
                                <select id='brand' className='form-select'>
                                    {show_brands}
                                </select>

                            </Col>
                        </Row>
                        {/* <Row style={{ marginBottom: '20px' }}>
                                <Col md={4} style={{ alignSelf: 'center' }}>
                                    Unit
                                </Col>
                                <Col md={7}>
                                    <input required type='text' id='unit' placeholder='Unit (e.g. KG,Pc etc)' className='form-control' />
                                </Col>
                            </Row> */}
                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Quantity
                            </Col>
                            <Col md={7}>
                                <input required type='number' id='qnty' className='form-control' />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Color
                            </Col>
                            <Col md={7}>
                                <input type='text' id='color' placeholder='if applicable' className='form-control' />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Store
                            </Col>
                            <Col md={7}>
                                <select id='store' className='form-select'>
                                    {show_stores}
                                </select>

                            </Col>
                        </Row>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px', marginTop: '20px' }}>
                        <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px', marginBottom: '30px' }}>Product Images</h4>



                        <Row >

                            <Col md={3} style={{ alignSelf: 'center' }}>
                                Search For images
                            </Col>
                            <Col md={7}>
                                <input value={this.state.value} onChange={e => this.onChangeHandler(e)} type='text' id='itmSearch' className='form-control' />
                            </Col>
                            <Row>

                                {imageHelper}

                            </Row>
                        </Row>

                        <Row style={{ marginTop: "2%", marginBottom: "4%" }} >

                            <Col md={3} style={{ alignSelf: 'center' }}>
                                Select five images :
                            </Col>
                            <Col md={9} >
                                {/* <input required type='file' id='images' onChange={() => max_images()} className='form-control' multiple accept='imgs/*' /> */}

                                <select id="im1" style={{ margin: "3%" }}>
                                    <option></option>
                                    {this.state.availableNames.map(({ name, url }) => (
                                        <option key={name} value={url}>
                                            {/* {console.log(url)} */}
                                            {name}
                                        </option>
                                    ))}
                                </select>
                                <select id="im2" style={{ margin: "3%" }}>
                                    <option></option>

                                    {this.state.availableNames.map(({ name, url }) => (
                                        <option key={name} value={url}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                                <select id="im3" style={{ margin: "3%" }}>
                                    <option></option>

                                    {this.state.availableNames.map(({ name, url }) => (

                                        <option key={name} value={url}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                                <select id="im4" style={{ margin: "3%" }}>
                                    <option></option>
                                    {this.state.availableNames.map(({ name, url }) => (
                                        <option key={name} value={url}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                                <select id="im5" style={{ margin: "3%" }}>
                                    <option></option>

                                    {this.state.availableNames.map(({ name, url }) => (
                                        <option key={name} value={url}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}></Col>
                            {/* <Col>
                                <Button className="submitBtn" style={{ backgroundColor: 'lightgray', color: 'white', borderColor: "lightgray" }}> Upload</Button>
                            </Col> */}
                            <Col md={4}></Col>

                        </Row>
                        <Row>
                            <Col md={4} />
                            <Col md={7} style={{ textAlign: 'right' }}>   <small style={{ marginBottom: '20px', fontSize: '0.8em' }}>Maximum 5 images</small></Col>
                        </Row>

                    </div>
                    <div style={{ backgroundColor: 'white', padding: '30px', paddingTop: '15px', marginTop: '20px' }}>
                        <h4 style={{ borderBottom: '1px solid #ccd2db', paddingBottom: '5px', marginBottom: '30px' }}>Product Details</h4>

                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Price
                            </Col>
                            <Col md={7}>
                                <input required type='number' id='price' className='form-control' />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '20px' }}>
                            <Col md={4} style={{ alignSelf: 'center' }}>
                                Discount
                            </Col>
                            <Col md={7} >
                                <input required type='number' min='0' max='100' placeholder='%' onChange={() => check_percentage()} id='price_rate' className='form-control' />
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: '40px' }}>
                            <Col md={4} >
                                Description
                            </Col>
                            <Col md={7} >
                                <textarea required rows={7} id='description' class="form-control" ></textarea>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: '20px', marginTop: '20px', justifyContent: 'right' }}>
                            <Col md={3} style={{ alignSelf: 'center' }}>
                                <span id='response'></span>
                            </Col>
                            <Col md={2}>
                                <button disabled={this.state.loading} className='btn' onClick={() => Add_Product()} style={{ backgroundColor: 'lightgray', color: 'black' }}> {this.state.loading ? 'Loading' : 'Add Products'}</button>
                            </Col>
                        </Row>

                    </div>
                    {/* </form> */}
                </div>






            </div>
        )
    }
}
