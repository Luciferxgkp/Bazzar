const User=require('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const _ =require('lodash');
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox57928e42a79b4443a025a5d1bc4d1e31.mailgun.org';
const mg = mailgun({apiKey: 'ab10db06409003f7544d667524cf8999-1b237f8b-0b785992', domain: DOMAIN});
exports.signup=(req,res)=>{
    User.findOne({
        email:req.body.email
    }).exec(async(error,user)=>{
        if(user)return res.status(400).json({
            message:'User not found'
        });
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const hash_password=await bcrypt.hash(password,10);
        const _user=new User({
            firstName,
            lastName,
            email,
            hash_password,
            username:Math.random().toString()
        });
        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message:'Something went wrong'
                });
            }
            if(data){
                return res.status(201).json({
                    message:'User Created Successfully...'
                })
            }
        })
    })
}

exports.signin=(req,res)=>{
    User.findOne({email: req.body.email})
    .exec(async(error,user)=>{
        if(error) return res.status(400).json({error});
        if(user){
            const isPassword= await(user.authenticate(req.body.password));
            if(isPassword && user.role ==='user'){
                const token=jwt.sign({_id:user._id,role:user.role},'MERNSECRET',{expiresIn:'1d'});
                const {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName
                }=user;
                res.status(200).json({
                    token,
                    user:{
                        _id,firstName,lastName,email,role,fullName
                    }
                });

            }else{
                return res.status(400).json({
                    message:'Invalid Password'
                })
            }
        }else{
            return res.status(400).json({message:'Something went wrong'});
        }
    });
}
const CLIENT_URL='https://bazar-reset-password.web.app';
exports.forgotPassword = (req,res)=>{
    const {email}=req.body;
    User.findOne({email},(error,user)=>{
        if(error || !user){
            return res.status(400).json({error:"User with this id doesn't exist"});
        }
        const token=jwt.sign({_id:user._id},'RESET_PASSWORD',{expiresIn:'20m'});
        const data={
            from:'noreply@bazzar.com',
            to:email,
            subject:'Password Reset Link',
            html:`
                
                <h2>Please click on this link to reset your password.</h2>
                <a href='${CLIENT_URL}/resetpassword/${token}'>
                    <p>${CLIENT_URL}/resetpassword/${token}</p>
                </a>
            `
        };
        return user.updateOne({resetLink:token},(error,success)=>{
            if(error){
                return res.status(400).json({error:'reset password link error'});
            }
            else{
                mg.messages().send(data,function(error,body){
                    if(error){
                        return res.status(400).json({error:error.message});
                    }
                    return res.status(200).json({message:`Email has been sent ,kindly follow the instruction`});
                })
            }
        })
    })
}
exports.resetPassword=(req,res)=>{
    const {resetLink,newPass}=req.body;
    if(resetLink){
        jwt.verify(resetLink,'RESET_PASSWORD',function(error,decodeData){
            if(error){
                return res.status(400).json({
                    error:"Incorrect token or it is expired."
                })
            }
            User.findOne({resetLink},async(error,user)=>{
                if(error || !user){
                    return res.status(400).json({error:'User with this token does not exist'});
                }
                const password=await bcrypt.hash(newPass,10);
                return user.updateOne({resetLink:'',hash_password:password},(error,success)=>{
                    if(error){
                        return res.status(400).json({error:'reset password error'});
                    }
                    else{
                        return res.status(200).json({message:`Password Updated Successfully`});
                    }
                })
            }).clone().catch(function(err){ console.log(err)})
            
        })
    }
    else return res.status(400).json({message:'Authentication Required'});
}

