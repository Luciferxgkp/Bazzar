//Importing Components
const express = require('express');
const Razorpay=require('razorpay');
const env=require('dotenv');
const app=express();
const mongoose = require('mongoose');
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin/auth');
const categoryRoutes=require('./routes/categories')
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart');
const addressRoutes = require('./routes/address');
const path=require('path')
const cors =require('cors');
const pageRoutes = require('./routes/admin/page')
const initialDataRoutes = require('./routes/admin/initData');
const orderRoutes = require('./routes/order');
const adminOrderRoute = require('./routes/admin/order.routes');
const shortid=require('shortid');

mongoose.connect(
    `mongodb+srv://lucifer:lucifer@cluster0.z30px.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify: false
    }
).then(()=>{
    console.log('Database Created');
}).catch((error)=>{
    console.log(error);
});


app.use(cors())
app.use(express.json())
env.config();
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes);
app.use('/api',pageRoutes);
app.use('/api',addressRoutes);
app.use('/api',orderRoutes);
app.use('/api',adminOrderRoute);
var razorpay = new Razorpay({
    key_id: 'rzp_test_1uSZtulaxqyohC',
    key_secret: 'hpvLU2XevmQbEVExRr4fOZMw',
  });
    app.post('/api/razorpay',async (req,res)=>{
    const amount=499;
    const currency='INR'
    const receipt=shortid.generate()
    const options={
        amount:(amount*100).toString(),
        currency,
        receipt,
    }
    try{
        const response=await razorpay.orders.create(options);
        console.log(response);
        res.status(200).json({
            id:response.id,
            currency:response.currency,
            amount:response.amount
        });
    }
    catch(error){
        console.log(error);
    }
})

//Listning the port 
app.listen(process.env.PORT||2000,()=>{
    console.log(`Server is running at 2000`);
});

