import React from "react";
import { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout/index";
import { Breed } from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
import { generatePublicUrl } from "../../urlconfig";
import './style.css'

function Order() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <>
      <Layout />
      <div style={{fontFamily:'Salsa',fontSize:'24px',textAlign:'Center'}}>Orders</div>
      {user.orders.map((order) => {
        return order.items.map((item) => (
          <Card style={{ margin: "5px auto",width:'80%'}}>
            <div className="orderItemContainer">
              <div
                style={{
                  width: 80,
                  fontFamily:'Salsa',
                  height: 80,
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                <img
                  style={{ maxWidth: 80, maxHeight: 80 }}
                  src={generatePublicUrl(item.productId.productPictures[0].img)}
                ></img>
              </div>
              <div style={{fontFamily:'Salsa'}}>{item.productId.name}</div>
              <div style={{fontFamily:'Salsa'}}>{item.payablePrice}</div>
              <div style={{fontFamily:'Salsa'}}>{order.paymentStatus}</div>
            </div>
          </Card>
        ));
      })}
      <Footer/>
    </>
  );
}

export default Order;
