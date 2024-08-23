import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({setIsLogin}) => {
  const navigate = useNavigate("")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e){
    e.preventDefault()
    console.log(email, password)
  

  try{
    const response = await fetch("https://insta-backend-hr3a.onrender.com/signin", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(
        {
          email: email,
          password: password,
        }
      ),
    }
    );
    const data = await response.json();
    localStorage.setItem("token", data.token)
    localStorage.setItem("_id", data.user._id)
    console.log("logged in successfully!");
    console.log(data);
    navigate("/home")

    if (data.token) {
      console.log("Successful Login")
      localStorage.setItem("token",data.token);
      localStorage.setItem("userId",data.user._id)
      setIsLogin(true)
      navigate("/")
  }
  }
catch(e)
{

}}

  return (
    <div id="outside">
    <div className='container'>
        <div className='login-signup'>
            <div className='form-container2'>
            <img src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png" className='instagram' alt=""></img>
            <form className='login-form'>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="login-username" placeholder="Mobile number, email or Username" required></input>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="login-password" placeholder="Password" required></input>
            <button type="submit" onClick={handleSubmit}>Log in</button>
            <div className='or'>
            <div className='or-line'></div>
            <div>OR</div>
            <div className='or-line'></div>
            </div>
            <b><div style={{marginBottom: "20px", color:"blue"}}>Log in with Facebook</div></b>
            <div style={{fontSize:"90%"}}>Forgot password?</div>
        </form>
    </div>-
    </div>
    </div>
    <div className='container'>
      <div>Don't have an account? <Link to={"/signup"} className='link'>Sign Up</Link></div>
    </div>
    </div>
  )
}

export default Login