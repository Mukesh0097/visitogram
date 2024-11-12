import { createContext } from "react";


const AuthContext= createContext(
    {
    isloggedIn:false,
    token:null,
    userID:null,
    login:()=>{},
    logOut:()=>{}
    }
);

export default AuthContext;