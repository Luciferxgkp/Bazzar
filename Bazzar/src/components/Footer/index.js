import React from 'react'
import './style.css'
export default function Footer() {
    return (
        <>
            <div className='footer'>
                <div className='links'>
                    <div className='about'>
                        <h3>ABOUT</h3>
                        <ul>
                            <a href='#'><li>Contact Us</li></a>
                            <a href='#'><li>About Us</li></a>
                            <a href='https://bazzar-admin.firebaseapp.com/'><li>Become a Seller</li></a>

                        </ul>

                    </div>
                    <div className='help'>
                        <h3>HELP</h3>
                        <ul>
                            <a href='#'><li>Payment</li></a>
                            <a href='#'><li>Shipping</li></a>
                            <a href='#'><li>Cancellation and Refunds</li></a>

                        </ul>
                    </div>
                    <div className='policy'>
                        <h3>POLICY</h3>
                        <ul>
                            <a href='#'><li>Return Policy</li></a>
                            <a href='#'><li>Terms of Use</li></a>
                            <a href='#'><li>Privacy</li></a>

                        </ul>
                    </div>
                    <div className='policy'>
                        <h3>SOCIAL</h3>
                        <ul>
                            <a href='https://twitter.com/GouravK37913421'><li>Twitter</li></a>
                            <a href='https://www.instagram.com/gourav_prajapati__/'><li>Instagram</li></a>
                            <a href='https://www.linkedin.com/in/gourav-kumar-prajapati/'><li>LinkedIn</li></a>

                        </ul>
                    </div>
                </div>
                <div className='copyright'>Copyright @Bazzar.com</div>
            </div>
        </>
    );
}
