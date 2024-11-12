import {useState,useCallback,useEffect} from "react";

let logOutTimer;
export const useAuth = () =>{
     
  const [token,setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userID,setuserID] = useState(false);

 


  const login = useCallback( (uid,token,expirationDate) =>{
    setToken(token)
    setuserID(uid);
    const tokenExpirationDate =
    expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData',JSON.stringify({userID:uid,token:token,expiration:tokenExpirationDate.toISOString()}))
    
  },[]);
  
  const logOut =  useCallback( () =>{
    setToken(null)
    setTokenExpirationDate(null);
    setuserID(null);
    localStorage.removeItem('userData');
  
  },[]);

  useEffect(()=>{
    if(token && tokenExpirationDate){
    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
    logOutTimer = setTimeout(logOut, remainingTime);
    }else{
      clearTimeout(logOutTimer);
    }
  },[token,logOut,tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userID, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return {login ,logOut,token, userID};
}