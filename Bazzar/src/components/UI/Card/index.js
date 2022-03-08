import React from 'react'
import './style.css';
function Card(props) {
    return (
        <div className=".card" {...props}
            style={props.style}
        >
            <div className="cardHeader">
                {
                    props.headerLeft && <div
                    style={{
                        alignSelf: "center",
                        fontSize: "20px",
                        fontWeight: "500",
                        fontFamily:'Salsa'
                      }}
                    >{props.headerLeft}</div>
                }
                {
                    props.headerRight && <div
                    style={{
                        alignSelf: "center",
                        fontSize: "20px",
                        fontWeight: "500",
                        fontFamily:'Salsa'
                      }}
                    >{props.headerRight}</div>
                }

            </div >
            <div className="children">
            {
                props.children
            }
            </div>
            
        </div>
    )
}

export default Card
