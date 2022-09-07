import React from "react";
import "./Die.css";
export default function Die(props) {
    return(
        <div className={props.isHeld? 'dice held':'dice'} onClick={props.holding} >{props.value}</div>
    )
}