import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components";
import Body from "./Body";
import { Form } from "antd";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { addAddress } from "../../actions";
import Layout from "../../components/Layout";

const Address = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  const [addressForm] = Form.useForm();
  const dispatch = useDispatch();
  const [addressArray, setAddessArray] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [addressFormData, setAddressFormData] = useState({});

  const user = useSelector((state) => state.auth);
  // Address
  useEffect(() => {
    getAddress();
  }, []);
  const handleAddAddress = () => {
    // dispatch(addAddress(addressFormData));
  };
  const getAddress = () => {
    // dispatch(loadingStart());
    // API.database
    //   .fetchDataForUser({
    //     table: "address",
    //   })
    //   .then((res) => {
    //     let addressItems = res.docs.map((item) => ({
    //       ...item.data(),
    //       id: item.id,
    //     }));
    //     setAddessArray(addressItems);
    //     // setData(res.docs);
    //   })
    //   .finally(() => {
    //     dispatch(loadingStop());
    //   });
  };
  const handleDeleteAddress = (item) => {
    // API.database
    //   .deleteDataWithId({
    //     table: "address",
    //     id: item.id,
    //   })
    //   .then((res) => {
    //     getAddress();
    //   });
  };
  const handleUpdateAddress = () => {
    // API.database
    //   .updateDataWithId({
    //     table: "address",
    //     id: addressFormData.id,
    //     data: {
    //       ...addressFormData,
    //       modified_at: currentDate,
    //     },
    //   })
    //   .then((res) => {
    //     getAddress();
    //     handleCancelAddress();
    //   });
  };
  const handleCancelAddress = () => {
    setAddressModal(false);
    setEditModal(false);
    addressForm.resetFields();
  };

  const handleAddressOpenModal = (item) => {
    setAddressModal(true);
  };

  const handleAddressInputChanges = (value, key) => {
    setAddressFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Edit Address
  const handleOpenEditModal = (item) => {
    setEditModal(true);
    setAddressFormData(item);
    addressForm.setFieldsValue(item);
  };

  return (
    <>
      <SEO
        title="Address"
        description="Address"
        keywords="Address"
        type="website"
      />
      <Layout />
      <Body
        _this={{
          addressArray,
          handleAddAddress,
          handleDeleteAddress,
          handleUpdateAddress,
          handleAddressOpenModal,
          addressModal,
          handleCancelAddress,
          handleAddressInputChanges,
          addressFormData,
          addressForm,
          handleOpenEditModal,
          editModal,
        }}
      />
      <Footer />
    </>
  );
};

export default Address;
