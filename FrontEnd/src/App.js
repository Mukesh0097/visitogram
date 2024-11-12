import React,{Suspense} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
// import Users from './user/pages/users';
// import Places from './place/pages/places';
// import Userplaces from './place/pages/userPlace';
//import Updateplace from './place/pages/updatePlace';
//import Auth from './user/pages/authenticate';
import MainNavigation from './shared/Navigation/mainNavigation';
import AuthContext  from './shared/context/auth-context';
import { useAuth } from './shared/hook/auth-hook';
import LoadingSpinner from './shared/component/LoadingSpinner';

const Users = React.lazy(()=>import('./user/pages/users'))
const Places = React.lazy(()=>import('./place/pages/places'))
const Userplaces = React.lazy(()=>import('./place/pages/userPlace'))
const Updateplace = React.lazy(()=>import('./place/pages/updatePlace'))
const Auth = React.lazy(()=>import('./user/pages/authenticate'))


function App() {
  const {login,logOut,token,userID} = useAuth();
  
    let routes ;
    if(token){
      routes = (
        <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <Userplaces />
        </Route>
        <Route path="/new/Places" exact>
          <Places />
        </Route>
        <Route path="/places/:placeid">
          <Updateplace />
        </Route>
        <Redirect to="/" />
      </Switch>
        );
    }else{
      routes=(
        <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <Userplaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
      );
    }
  
  return (
      <AuthContext.Provider value={{isloggedIn:!!token,token:token,login:login,userID:userID,logOut:logOut }}>
    <Router>
        <MainNavigation />
        <main><Suspense fallback={<div className='center'><LoadingSpinner/></div>}>{routes}</Suspense></main>
    </Router>
    </AuthContext.Provider>
  )
}

export default App;
