import React from 'react';
import { MaterialButton } from '../MaterialUI';
import './style.css'
export default function Rectangle(props) {
    return (
        <div className='rectangle' >
            <div className='container'>
                <div className='image'>
                    <img src={props.url} />
                </div>
                <p className='about'>{props.about}</p>
                <p className='price'>From ₹{props.price}</p>
                <div className='buttons'>
                    <MaterialButton
                        title="ADD TO CART"
                        bgColor="white"
                        textColor="black"
                        style={{
                            margin: '15px 5px 10px 5px',
                            width: '230px'
                        }}
                        onClick={() => { }}
                    />
                    <MaterialButton
                        title="BUY NOW"
                        bgColor="black"
                        textColor="#ffffff"
                        style={{
                            margin: '15px 5px 10px 5px',
                            width: '250px',
                        }}
                        onClick={() => { }}
                    />
                </div>
            </div>
        </div>
    );
}