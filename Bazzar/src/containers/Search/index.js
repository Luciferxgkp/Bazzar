import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Footer, Header } from "../../components";
import Body from "./Body";

import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";
import Layout from "../../components/Layout";

const Search = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigator = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    setSearchValue(query || "");
  }, [location.search]);
  useEffect(() => {
    if (searchValue.length < 1) return;
    // dispatch(loadingStart());
    // API.database
    //   .fetchData({
    //     table: "products",
    //   })
    //   .then((res) => {
    //     let products = res.docs.map((item) => ({
    //       ...item.data(),
    //       id: item.id,
    //     }));
    //     products.map((item) => {
    //       API.database
    //         .fetchData({
    //           table: "categories",
    //         })
    //         .then((res) => {
    //           let category = res.docs.map((item) => ({
    //             ...item.data(),
    //             id: item.id,
    //           }));
    //           category = category.filter(
    //             (item) => item.id === item.category_id
    //           );
    //           if (category.length > 0) item.category_name = category[0].name;
    //         });
    //     });
    //     products = products.filter((item) => {
    //       return (
    //         item.name
    //           .toString()
    //           .toLowerCase()
    //           .includes(searchValue.toLowerCase()) ||
    //         (item.brand_name &&
    //           item.brand_name
    //             .toLowerCase()
    //             .includes(searchValue.toLowerCase())) ||
    //         (item.category_name &&
    //           item.category_name
    //             .toLowerCase()
    //             .includes(searchValue.toLowerCase()))
    //       );
    //     });
    //     console.log(products);
    //     setData(products);
    //     dispatch(loadingStop());
    //   });
  }, [searchValue]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <>
      <SEO
        title={
          data.length > 0
            ? `Search Result for ${searchValue}`
            : "No Result Found"
        }
        description={
          data.length > 0
            ? `Search Result for ${searchValue}`
            : "No Result Found"
        }
        keywords={`${searchValue}`}
      />
      <Layout />
      <Body
        _this={{
          data,
          searchValue,
          handleSearch,
          navigator,
        }}
      />
      <Footer />
    </>
  );
};

export default Search;
