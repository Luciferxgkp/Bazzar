import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Layout from '../../components/Layout/index'
import getParams from '../../utils/getParams'
import ClothingAndAccessories from './ClothingAndAccessories/ClothingAndAccessories'
import ProductPage from './ProductPage/ProductPage'
import ProductStore from './ProductStore/productStore'
import './style.css'
const ProductListPage = (props) => {

    const renderProduct = () =>{
        console.log(props);
        const params=getParams(props.location.search);
        console.log(params.type);
        let content = null;
        switch(params.type){
            case 'Store':
                content = <ProductStore {...props}/>
                break;
            case 'Page':
                content = <ProductPage {...props}/>
                break;
            default:
                content = <ClothingAndAccessories {...props}/>;
        }
        return content;
    }

    return (
        <div>
            <Layout />
            {renderProduct()}
            <Footer/>
        </div>
    )
}

export default ProductListPage
