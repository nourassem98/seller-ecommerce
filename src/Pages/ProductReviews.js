import axios from 'axios'
import React, { Component } from 'react'

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default class ProductReviews extends Component {
    state = {
        reviews: [],
    }
    componentDidMount() {
        var idSeller = window.sessionStorage.getItem("username");
        axios.get('https://e-commerce-neon.herokuapp.com/product_reviews/' + idSeller)
            .then(res => {
                // console.log(res)
                this.setState({ reviews: res.data.all_items })
                // console.log(this.state.reviews)
            })
            .catch(err => {
                console.error(err);
            })
    }

    render() {

        return (
            <div>


                <h2 style={{ paddingLeft: '30px', paddingBottom: '10px' }}>Product Reviews</h2>

                <table className='table ' style={{ marginLeft: '20px', backgroundColor: 'white' }}>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                Product
                            </th>
                            <th style={{ textAlign: 'center' }}>
                                Rating
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reviews.map((r) => {


                            return (
                                <tr>
                                    <td>
                                        {r.id}
                                    </td>
                                    <td>
                                        {r.name}
                                    </td>
                                    <td style={{ textAlign: 'center', fontSize: '1.5em' }}>
                                        {r.review > 0 ? <AiFillStar style={{ color: 'orange' }} /> : <AiOutlineStar style={{ color: 'orange' }} />}
                                        {r.review > 1 ? <AiFillStar style={{ color: 'orange' }} /> : <AiOutlineStar style={{ color: 'orange' }} />}
                                        {r.review > 2 ? <AiFillStar style={{ color: 'orange' }} /> : <AiOutlineStar style={{ color: 'orange' }} />}
                                        {r.review > 3 ? <AiFillStar style={{ color: 'orange' }} /> : <AiOutlineStar style={{ color: 'orange' }} />}
                                        {r.review > 4 ? <AiFillStar style={{ color: 'orange' }} /> : <AiOutlineStar style={{ color: 'orange' }} />}
                                    </td>
                                </tr>
                            )


                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
