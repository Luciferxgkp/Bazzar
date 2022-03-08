import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById ,getCategoryDetailsById} from '../../actions';
import Layout from '../../components/Layout/index';
import './style.css'
import {AddToCart} from '../../actions/cart.action'

import {
    IoIosArrowForward,
    IoIosStar,
    IoMdCart
} from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { AiFillThunderbolt } from 'react-icons/ai';

import { Breed, MaterialButton } from '../../components/MaterialUI';
import { generatePublicUrl } from '../../urlconfig';
import Footer from '../../components/Footer';
function ProductDetailPage(props) {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    useEffect(() => {
        const { productId } = props.match.params;
        const payload = {
            params: {
                productId
            }
        }
        dispatch(getProductDetailsById(payload));
        console.log(Object.keys(product.productDetails))
    }, []);

    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }
    return (
        <>
            <Layout />
            <div className="productDescriptionContainer">
                <div className="flexRow">
                    <div className="verticalImageStack">
                        <div className="thumbnail active">
                            {
                                product.productDetails.productPictures.map((picture,index)=>
                                <img src={generatePublicUrl(picture.img)} alt={picture.img} />
                            )
                            }
                            <img src="" alt=""></img>
                        </div>
                    </div>
                    <div className="productDescContainer">
                        <div className="productDesImgContainer">
                            <img style={{
                                maxWidth:'100%',
                                maxHeight:'100%',
                                objectFit:'contain'
                            }} src={generatePublicUrl(product.productDetails.productPictures[0].img)} alt={`${product.productDetails.productPictures[0].img}`} />
                        </div>
                        <div className="flexRow2">
                            <MaterialButton
                                title="ADD TO CART"
                                bgColor="white"
                                textColor="black"
                                style={{
                                    marginRight: '5px'
                                }}
                                icon={<IoMdCart />}
                                onClick={()=>{
                                    const {_id,name,price} = product.productDetails;
                                    const img = product.productDetails.productPictures[0].img;
                                    dispatch(AddToCart
                                        ({_id,name,price,img}));
                                    props.history.push('/cart');
                                }}
                            />
                            <MaterialButton
                                title="BUY NOW"
                                bgColor="black"
                                textColor="white"
                                style={{
                                    marginLeft: '5px'
                                }}
                                icon={<AiFillThunderbolt />}
                                onClick={()=>{
                                    const {_id,name,price} = product.productDetails;
                                    const img = product.productDetails.productPictures[0].img;
                                    dispatch(AddToCart
                                        ({_id,name,price,img}));
                                    props.history.push('/cart');
                                }}
                            />
                        </div>
                    </div>
                </div>
            
            <div className="breed">
               

            {/* product description */}
            <div className="productDetails">
                <p className="productTitle">{product.productDetails.name}</p>
                <div>
                    <span className="ratingCount">4.3 <IoIosStar /></span>
                    <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
                </div>
                <div className="extraOffer">Extra <BiRupee />4500 off </div>
                <div className="flexRow priceContainer">
                    <span className="price"><BiRupee />{product.productDetails.price}</span>
                    <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
                    {/* <span>i</span> */}
                </div>
                <div>
                    <p style={{
                        color: '#212121',
                        fontSize: '16px',
                        fontWeight: '600'
                    }}>Available Offers</p>
                    <p style={{ display: 'flex' }}>
                        <span style={{
                            fontFamily:'Salsa',
                            width: '100px',
                            fontSize: '14px',
                            color: '#878787',
                            fontWeight: '600',
                            marginRight: '20px'
                        }}>Description</span>
                        <span style={{
                             fontFamily:'Salsa',
                            fontSize: '14px',
                            color: '#212121',
                        }}>{product.productDetails.description}</span>
                    </p>
                </div>
            </div>
            </div>
            </div>
            <Footer/>
        </>
    )
}


export default ProductDetailPage;
