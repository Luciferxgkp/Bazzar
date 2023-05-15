import React, { useEffect } from "react";
import "./App.css";
import HomePage from "./containers/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import ProductDetailPage from "./containers/ProductDetailPage/ProductDetailPage";
import CartPage from "./containers/CartPage/CartPage";
import { UpdateCart } from "./actions/cart.action";
import CheckoutPage from "./containers/CheckoutPage/CheckoutPage";
import Order from "./containers/Order/Order";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(UpdateCart());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account/orders" element={<Order />}></Route>
          <Route
            path="/:productSlug/:productId"
            element={<ProductDetailPage />}
          ></Route>
          <Route exact path="/:slug" element={<ProductListPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
