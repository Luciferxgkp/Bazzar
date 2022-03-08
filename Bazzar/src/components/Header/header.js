import React, { useEffect, useState } from 'react';
import './style.css';
import { IoIosCart, IoIosSearch } from 'react-icons/io';
import { useAlert } from 'react-alert'
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUI';
import { useDispatch, useSelector } from 'react-redux';
import { login, signout ,forgotPassword,signup} from '../../actions';
import { Link } from 'react-router-dom';

/**
* @author
* @function Header
**/

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [search,setSearch] = useState(false);
  const auth = useSelector(state => state.auth);
  const userLogin = () => {
    dispatch(login({ email, password }));
  }
  const forgotPass=()=>{
    if(email === ''){
      alert('Email must be filled');
    }
    else{
      dispatch(forgotPassword(email));
      {signupModal ? setSignupModal(false) : setLoginModal(!loginModal)}
      setEmail('');
      setPassword('');
      alert('Link is sent to your Email');
    }
  }
  const userSignup = () => {
    dispatch(signup({firstName,lastName,email,password}));
    alert('User Created Successfully');
    setSignupModal(false);
  }
  const userLoggedOut = () => {
    alert('Are you sure');
    dispatch(signout());
  }
  useEffect(() => {
    if (auth.authenticate)
      setLoginModal(false);
  }, [auth.authenticate]);

  const renderLoggedInMenu = () => {
    return (
      <div className='loggedin'>
          <div onClick={userLoggedOut} className='login'>{auth.user.fullName}</div>
          <Link style={{textDecoration:'none'}}to={`/account/orders`}><div className='order'>orders</div></Link>
      </div>
    );
  }
  const renderNonLoggedInMenu = () => {
    return (
      <a onClick={() => {
        { signupModal ? setSignupModal(false) : setLoginModal(!loginModal) }
        setEmail('');
        setPassword('');
      }} style={{ cursor: 'pointer' }}>
        <div style={{ marginLeft:'71%'}}className='login'>Login</div>
      </a>
    );
  }

  return (
    <div className="header">
      <Modal
        visible={signupModal}
        onClose={() => setSignupModal(false)}
      >
        <div className='row'>
          <div className='leftSpace'>
            <div><p>Sign Up,</p></div>
            <div><p className='head'>Looking new to</p> </div>
            <div><p>Bazzar,</p></div>
            <div><p>Signup and get </p></div>
            <div><p>exiting offers.</p></div>
          </div>
          <div className='rightSpace'>
            <MaterialInput
              type="text"
              label="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <MaterialInput
              type="text"
              label="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <MaterialInput
              type="text"
              label="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MaterialInput
              type="password"
              label="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='agreement'>
              <input type='checkbox'></input>
              <p className='user-agreement'>Agree to Terms of Use and Privacy Policy</p>
            </div>

            <MaterialButton
              title="Sign up"
              bgColor="black"
              textColor="white"
              style={{
                margin: '15px 0 10px 0',
                width:'530px'
              }}
              onClick={userSignup}
            />
            <p className='lower' style={{ marginTop: '130px' }}>Already have an Account ?<a onClick={() => {
              setLoginModal(true);
              setEmail('');
              setPassword('');
              setSignupModal(false);
            }}>  Login</a> </p>
          </div>
        </div>
      </Modal>
      <Modal
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className='row'>
          <div className='leftSpace'>
            <div><p className='head'>Login,</p></div>
            <div><p>Get access to your</p> </div>
            <div><p>Orders,</p></div>
            <div><p>and</p></div>
            <div><p>WishList</p></div>
          </div>
          <div className='rightSpace'>
            <div className='input'>
              <MaterialInput
                type="text"
                label="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MaterialInput
                type="password"
                label="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='agreement'>
                <input type='checkbox'></input>
                <p className='user-agreement'>Agree to Terms of Use and Privacy Policy</p>
                <p onClick={forgotPass} style={{marginLeft:'140px',fontSize:'12px',fontFamily:'Salsa',cursor:'pointer'}}>Forgot Password</p>
              </div>
              <MaterialButton
                title="Login"
                bgColor="black"
                textColor="#ffffff"
                style={{
                  margin: '15px 0 10px 0',
                  width:'530px'
                }}
                onClick={userLogin}
              />
            </div>
            <p className='lower'>New to Bazzar ?<a onClick={() => {
              setLoginModal(false);
              setEmail('');
              setPassword('');
              setSignupModal(true);
            }}> Create an Account</a> </p>
          </div>
        </div>
      </Modal>
      <Link to='/' style={{ margin: '0 10px' }}>
        <div className="logo">
          Bazzar
        </div>
      </Link>

      {!auth.authenticate ? renderNonLoggedInMenu() : renderLoggedInMenu()}
      {search?<input className='search-input'></input>:<div></div>}
      <a onClick={() => { setSearch(!search)}} style={{cursor:'pointer'}}><IoIosSearch className='search' /></a>
      <a ><Link to='/cart' style={{ margin: '0 10px', color: 'black' }}><IoIosCart className='cart-icon' /></Link></a>
    </div>
  )

}

export default Header