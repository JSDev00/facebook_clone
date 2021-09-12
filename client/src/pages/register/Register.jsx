import {useRef} from 'react';
import './register.css';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
export default function Register () {
  const username = useRef ();
  const email = useRef ();
  const password = useRef ();
  const passwordAgin = useRef ();
  const history  = useHistory();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(password.current.value!==passwordAgin.current.value){
      password.current.setCustomValidity("Password Does Not Match")
    }else{
      const user = {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
      }
      try {
        await axios.post('/api/auth/register',user);
        history.push('/login');

      } catch (error) {
        
      }
    }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              ref={username}
              className="loginInput"
              required
              type="text"
            />
            <input 
            placeholder="Email"
             ref={email} 
             className="loginInput"
             required
             type="email"

              />
            <input
              placeholder="Password"
              ref={password}
              className="loginInput"
              required
              type="password"
            />
            <input
              placeholder="Password Again"
              ref={passwordAgin}
              className="loginInput"
              required
              type="password"
            />
            <button className="loginButton" type="submit">Sign Up</button>
       
            <Link to="/login">
            <span  className="loginRegisterButton">
              Create a New Account
            </span>
           </Link>
          
          
          </form>
        </div>
      </div>
    </div>
  );
}
