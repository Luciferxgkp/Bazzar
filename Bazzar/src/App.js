import React, { useEffect } from 'react';
import './App.css';
import HomePage from './containers/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductListPage from './containers/ProductListPage';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
import ProductDetailPage from './containers/ProductDetailPage/ProductDetailPage';
import CartPage from './containers/CartPage/CartPage';
import { UpdateCart } from './actions/cart.action';
import CheckoutPage from './containers/CheckoutPage/CheckoutPage';
import Order from './containers/Order/Order';
import "@fontsource/salsa";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(UpdateCart());
  }, [auth.authenticate])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage}></Route>
          <Route path='/cart' component={CartPage}></Route>
          <Route path='/checkout' component={CheckoutPage}/>
          <Route path='/account/orders' component={Order}></Route>
          <Route path='/:productSlug/:productId/p' component={ProductDetailPage}></Route>
          <Route path='/:slug' component={ProductListPage}></Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;