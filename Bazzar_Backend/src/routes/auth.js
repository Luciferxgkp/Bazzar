const express=require('express');
const router=express.Router();
const {signup,signin,forgotPassword,resetPassword}=require('../controller/auth');
const { validatesignupRequest ,isRequestValidated, validatesigninRequest} = require('../validation/auth');
router.post('/signin',validatesigninRequest,isRequestValidated,signin);
router.post('/signup',validatesignupRequest,isRequestValidated,signup);
router.put('/forgot-password',forgotPassword);
router.put('/reset-password/',resetPassword);
//router.post('/profile',requireSignin,(req,res)=>{
//    res.status(200).json({user:'profile'})
//})

module.exports=router;