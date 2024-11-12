import React, {useState} from "react";

import Mainheader from "./mainHeader";
import Navigation from "./Navlinks";
import SideDrawer from "./sideDrawer";
import Backdrop from "../component/Backdrop";

import './mainNavigation.css'






const MainNavigation = props =>{

    const [drawerIsOpen,setDrawer] = useState(false);

    const openingDrawerHandler = ()=>{
    setDrawer(true);
    }
    const closingDrawerHandler = ()=>{
        setDrawer(false);
    }
    return (<React.Fragment>
    {
        drawerIsOpen && <Backdrop onClick = {closingDrawerHandler}/>
    }
        <SideDrawer show={drawerIsOpen} onClick={closingDrawerHandler}>
            <nav className="main-navigation__drawer-nav">
                <Navigation />
            </nav>
        </SideDrawer>
       <Mainheader>
            <button className="main-navigation__menu-btn" onClick={openingDrawerHandler}>
                <span></span>
                <span></span>
                <span></span>
                
            </button>
            <h1 className="main-navigation__title">Mukesh</h1>
            <nav className="main-navigation__header-nav">
               <Navigation/>
            </nav>
        </Mainheader>
        </React.Fragment>
    )
}
export default MainNavigation;