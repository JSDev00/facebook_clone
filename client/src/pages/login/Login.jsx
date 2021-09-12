import { useContext, useRef } from "react";
import "./login.css";
import{loginCall} from '../../apiCalls'
import {AuthContext} from '../../context/AuthContext';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Login() {
const history = useHistory()
  const email = useRef();
  const password = useRef();
  const{user,isFetching,error,dispatch} = useContext(AuthContext);
  const handleSubmit = e =>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch);
    history.push('/');
  }
  console.log(user);
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
            ref={email} 
            placeholder="Email" 
            type="email" 
            required  
            className="loginInput" 
            />
            <input 
            minLength="6"
            ref={password} 
            placeholder="Password" 
            type="password" 
            required 
            className="loginInput" 
            />
            <button  type="submit"  className="loginButton">
              {isFetching?'Loading...':'Log In'}
              
              </button>
            <span className="loginForgot">Forgot Password?</span>
           <Link to="/register">
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
