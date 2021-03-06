import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import './style.css';

const Modal = (props) => {
    if (!props.visible) {
        return null;
    }
    return (
        <>
            <div className="modalFixedBg">
                <div style={{ position: 'relative' }}>
                    <div className="modalClose" onClick={props.onClose} style={{cursor:'pointer'}}>X</div>
                    <div className="modalContainer">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

const MaterialInput = (props) => {
    const [focus, setFocus] = useState(false);

    return (
        <div className="materialInput" style={{ width: '100%', ...props.style }}>
            <label className={`label ${focus ? 'focus' : ''}`} style={{
                paddingLeft:'12px',
                paddingTop:'12px',
                lineHeight: 'none',
                fontFamily: 'Salsa',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '18px',
                // top:'-12px'
            }}>{props.label}</label>
            <div style={{
                display: 'flex'
            }}>
                <input className="input"
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    onFocus={(e) => {
                        setFocus(true);
                    }}
                    onBlur={(e) => {
                        if (e.target.value === "") {
                            setFocus(false);
                        }
                    }} />
                {
                    props.rightElement ? props.rightElement : null
                }
            </div>
        </div>
    )
}

const MaterialButton = (props) => {
    const onClick = () => {
        props.onClick && props.onClick();
    }
    return (
        <div style={{ width: '100%', ...props.style }}>
            <button
                className="materialButton"
                style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    background: props.bgColor,
                    color: props.textColor,
                    height:'56px',
                    fontWeight:'600'
                }}
                onClick={onClick}
            >
                <p style={{fontSize:'20px'}}>{props.icon && props.icon}</p>
                <p>&ensp;</p>
                <p className='title'>{props.title && props.title}</p>
                
            </button>
        </div>

    )
}

const DropdownMenu = (props) => {
    return (
        <div className="headerDropdownContainer">
            {props.menu}
            <div className="dropdown">
                <div className="upArrow"></div>
                {props.firstMenu}
                <ul className="headerDropdownMenu">
                    {
                        props.menus && props.menus.map((item, index) =>
                            <li key={index}><a
                                onClick={(e) => {if(item.onClick){

                                    e.preventDefault();
                                    item.onClick && item.onClick()
                                }
                                }}
                                href={item.href}>
                                {item.label}</a></li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}
const Anchor = (props) => {
    return (
      <button {...props} className="anchorButton">
        {props.name}
      </button>
    );
  };
  
  const Breed = (props) => {
    console.log(props.breed);
    return (
      <div className="breed">
        <ul>
          {props.breed &&
            props.breed.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.name}</a>
                <IoIosArrowForward/>
              </li>
            ))}
        </ul>
      </div>
    );
  };
export {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu,
    Anchor, Breed
}