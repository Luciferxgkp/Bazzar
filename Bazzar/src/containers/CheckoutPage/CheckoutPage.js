import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress } from "../../actions";
import { getCartItems } from "../../actions/cart.action";
import Layout from "../../components/Layout";
import Bazzar from '../../images/logo/Bazzar.png'
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/UI/Card";
import axiosInstance from "../../helpers/axios";
import CartPage from "../CartPage/CartPage";
import AddressForm from "./AddressForm";
import "./style.css";
import Footer from "../../components/Footer";

/**
 * @author
 * @function CheckoutPage
 **/

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep" style={{ ...props.style }}>
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber" style={{ fontFamily: 'Salsa' }}>{props.stepNumber}</span>
          <span className="stepTitle" style={{ fontFamily: 'Salsa' }}>{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div style={{ fontFamily: 'Salsa' }}>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => { }}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [paymentType,setPaymentType] = useState('');
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    //console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      }
      script.onerror = () => {
        resolve(false);
      }
    })
  
  }
  async function displayRazorPay(amount) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('RazorPay SDK Failed!')
      return
    }
    const __DEV__ = document.domain === 'localhost'

    const data=await axiosInstance.post(`/razorpay`);
    console.log(data)

    var options = {
      "key": __DEV__ ? "rzp_test_1uSZtulaxqyohC" : "PRODUCTION_KEY",
      "amount": amount,
      "currency": data.currency,
      "name": "Bazzar",
      "description": "ThankYou For Shopping.",
      "image": { Bazzar },
      "order_id": data.id,
      "handler": function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
      },
      "prefill": {
        "name": auth.user.firstName+auth.user.lastName,
        "email": auth.user.email,
        "contact": auth.user.phone?auth.user.phone:''
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    const paymentObject=new window.Razorpay(options);
    paymentObject.open();
  }
  console.log(auth.user.firstName);  
  const onConfirmOrder = async () => {

    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    if(paymentType === 'card')
      await displayRazorPay(totalAmount);
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType,
    };
    dispatch(addOrder(payload));
    setConfirmOrder(true);
    props.history.push('/account/orders');
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    //user.address.length === 0 && setNewAddress(true);
  }, [user.address]);

  useEffect(() => {
    if (confirmOrder && user.placedOrderId) {
      props.history.push(`/order_details/${user.placedOrderId}`);
    }
  }, [user.placedOrderId]);

  return (
    <>
      <Layout />
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500, fontSize: '16px', fontFamily: 'Salsa' }}>{auth.user.fullName}</span>
                  <span style={{ margin: "0 5px", fontWeight: 100, fontSize: '14px', fontFamily: 'Salsa' }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted" style={{ fontFamily: 'Salsa' }}>{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />

          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "12px", fontFamily: 'Salsa' }}>
                  Order confirmation email will be sent to{" "}
                  <strong style={{ fontFamily: 'Salsa' }}>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div
                    className="flexRow"
                    style={{
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    <input type="radio" name="paymentOption" value="cod" onClick={()=>{setPaymentType('cod')}} />
                    <div style={{ fontFamily: 'Salsa' }}>Cash on delivery</div>
                    <input type="radio" name="paymentOption" value="online" onClick={()=>{setPaymentType('card')}} />
                    <div style={{ fontFamily: 'Salsa' }}>Credit Card/Debit Card/UPI</div>
                  </div>
                  <MaterialButton
                    title="CONFIRM ORDER"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px",
                    }}
                  />
                </div>
              )
            }
          />
        </div>

        {/* Price Component */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
      <div><Footer/></div>
    </>
  );
};

export default CheckoutPage;
