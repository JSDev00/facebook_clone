import React, { useContext } from 'react'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
} from "react-router-dom";
import { AuthContext } from './context/AuthContext';
const App = () =>{
  const{user} = useContext(AuthContext)
  return(
    <Router>
      <Switch>
        <Route path="/" exact>
          {user?<Home/>:<Register/>}
        </Route>
        <Route path="/login" exact>
          {user ? <Redirect  to ="/Home" /> : <Login/>}
        </Route>
        <Route path="/register" exact>
          {user ? <Redirect  to ="/Home" /> : <Register/>}
        </Route>
        <Route path="/profile/:username" exact>
          <Profile/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App
