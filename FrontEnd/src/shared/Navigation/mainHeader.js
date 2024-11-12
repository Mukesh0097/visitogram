import React from "react";

import './mainHeader.css'

const Mainheader = props =>{
    return (
        <header className="main-header">{props.children}</header>
    )

}
export  default Mainheader;