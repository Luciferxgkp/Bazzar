import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { Card } from "antd";
import { BiRupee } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";

import "./style.css";
import { generatePublicUrl } from "../../../urlconfig";

const ClothingAndAccessories = (props) => {
  const params = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsBySlug(params.slug));
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <Card
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
        }}
      >
        {product.products.map((product) => {
          console.log(product);
          return (
            <div className="caContainer">
              <Link
                className="caImgContainer"
                to={`/${product.slug}/${product._id}`}
              >
                <img
                  src={generatePublicUrl(product?.productPictures[0]?.img)}
                  alt={product.name}
                />
              </Link>
              <div>
                <div className="caProductName">{product.name}</div>
                <div className="caProductPrice">
                  <BiRupee />
                  {product.price}
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default ClothingAndAccessories;
