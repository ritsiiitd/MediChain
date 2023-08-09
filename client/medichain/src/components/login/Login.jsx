import React, { useEffect, useState } from 'react'
import { Route, redirect, useNavigate} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const Login = () => {
  const {loginWithRedirect} = useAuth0();
  // const { } = useState();
    const navigate = useNavigate();
    const signupClick = () =>{
      navigate('/signup');
    }
  return (
    <div className="login-wrapper">
      <button onClick={()=>loginWithRedirect()}>Login</button>
      <button onClick={()=>signupClick()}>Signup</button>
  </div>
  )
}

export default Login