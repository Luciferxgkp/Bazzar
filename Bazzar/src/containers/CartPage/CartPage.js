import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/Layout/index";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItems/CartItem";
import { AddToCart, getCartItems } from "../../actions/cart.action";
import { Button } from "antd";
// import PriceDetails from "../../components/PriceDetails";
import Footer from "../../components/Footer";

function CartPage(props) {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    // console.log(qty);
    dispatch(AddToCart({ _id, name, price, img }, 1));
  };
  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    // console.log(qty);
    dispatch(AddToCart({ _id, name, price, img }, -1));
  };
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);
  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }

  return (
    <div>
      <Layout />
      <div className="cartContainer">
        <Card
          style={{
            width: "calc(100% - 400px)",
            overflow: "hidden",
            border: "5px solid #cecece",
            fontFamily: "Salsa",
          }}
          headerLeft={<div style={{ fontFamily: "Salsa" }}>My Cart</div>}
          headerRight={<div style={{ fontFamily: "Salsa" }}>Deliver In</div>}
        >
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
            />
          ))}
          <div
            style={{
              width: "100%",
              fontFamily: "Salsa",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "250px" }}>
              <Button
                title="PLACE ORDER"
                bgColor="black"
                onClick={() => props.history.push("/checkout")}
              ></Button>
            </div>
          </div>
        </Card>
        {/* <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        /> */}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;
