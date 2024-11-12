import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../shared/context/auth-context"




import './Navlinks.css'

const Navigation = props =>{

    const auth = useContext(AuthContext);
    
    return(
        <ul className="nav-links">
            <li>
                <NavLink to='/'>ALL USERS</NavLink>
            </li>

           {auth.isloggedIn &&
            <li><NavLink to={`/${auth.userID}/places`}>MY PLACES</NavLink></li>
            } 
            {auth.isloggedIn &&
                <li><NavLink to='/new/Places'>ADD PLACE</NavLink></li>
            }
            {!auth.isloggedIn &&
                <li><NavLink to='/auth'>AUTHENTICATE</NavLink></li>
            }
            {auth.isloggedIn &&
                <li><button onClick={auth.logOut}>LOGOUT</button></li>

            }
            
        </ul>
    )
}

export default Navigation;