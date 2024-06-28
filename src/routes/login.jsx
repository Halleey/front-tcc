import React from 'react'
import { Link } from 'react-router-dom';
import { LoginForm } from '../hooks/loginHook';
function Login() {
  

  return (
      <div>
    <h1>
      Login page is being built
    </h1>
    <Link to="/"><button>
      back to home</button></Link>
      <LoginForm></LoginForm>
      </div>
      
  )
}

export default Login
