import React from "react";
import Card from "../../components/UI/Card";

/**
 * @author
 * @function PriceDetails
 **/

const PriceDetails = (props) => {
  return (
    <Card headerLeft={"Price Details"} style={{ maxWidth: "380px" ,fontFamily:'Salsa'}}>
      <div
        style={{
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div className="flexRow sb" style={{ margin: "10px 0" ,fontFamily:'Salsa'}}>
          <div style={{fontFamily:'Salsa',marginRight:'50px'}}>Price ({props.totalItem} items) : </div>
          <div style={{fontFamily:'Salsa',color:'#A78A8A'}}>{props.totalPrice}</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" ,fontFamily:'Salsa'}}>
          <div style={{fontFamily:'Salsa'}}>Delivery Charges : </div>
          <div style={{fontFamily:'Salsa', color:'#A78A8A'}}>FREE</div>
        </div>
        <div className="flexRow sb" style={{ margin: "10px 0" }}>
          <div style={{fontFamily:'Salsa'}}>Total Amount:</div>
          <div style={{fontFamily:'Salsa', color:'#A78A8A'}}>{props.totalPrice}</div>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;