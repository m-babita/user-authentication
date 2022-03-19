import React,{useRef, useEffect, useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import AuthContext from './AuthProvider';
import axios from 'axios'
import './assets.css'

const Login = () => {
  
  const {setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('')
  const [password, setPwd] = useState('')

  const [err, setErr] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(()=>{
    userRef.current.focus()
  },[])

  useEffect(()=>{
    setErr('')
  }, [email, password,success])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    
    try {
      const data = { email, password };
				const response = await axios.post(
					"https://user-auth-apii.herokuapp.com/api/v1/login",
					data
				);
      console.log(response?.data);
      setAuth({ email, password })
      setEmail('')
      setPwd('')
      setSuccess(true)
      
    } catch(err){
        if (!err?.response) {
          setErr('No Server Response!');
      } 
      else {
          setErr('Unauthorized')
      }
      errRef.current.focus();
    }
    
  }
  const logout = () => {
    setSuccess(false)
    navigate("/")
  }
  return (
    <>
    {success ? (
                <div className="header">
                    <h2 >Successfully Logged In</h2>
                    <p>
                    <button className="redirect" onClick={logout} >Log Out</button>
                    </p>
                </div>
            ) : (
      <form onSubmit={handleSubmit}>

      <h2 className="form__header">User Authentication</h2><br/>
              
      <p ref={errRef} className={err ? "err" : "offscreen"} aria-live="assertive">{err}</p>
      <div className='form__container'>
        <div className='form__title'>
            <h3>USER LOGIN</h3>
        </div>
        <div className='form__body'>
          
          {/* Email */}
          <div className='inputField'>
              <label htmlFor ="email"> Email ID :
              </label>
              </div>
              <i className="ri-mail-line"></i>
          <input 
            type='email' placeholder='example@gmail.com'
            id="email"
            ref={userRef}
            required autoComplete='off'
            onChange = {(e)=>setEmail(e.target.value)}/>
           <br/>

          {/* Password */}
          <div className='inputField'>
          <label htmlFor ="password">Password : 
            </label>
            </div>
            <i className="ri-lock-line"></i>
          <input 
            type='password' placeholder='Password' 
            required id="current-password"
            onChange = {(e)=>setPwd(e.target.value)}
            />
        </div>
        <button>LOGIN</button>
      </div>
      <p className='form_foot'>
      Haven't registered yet?
          <button  className='redirect'onClick={() => navigate("/register")} >Sign Up</button>
      
      </p>
      </form>
    )}
    </>
  )
}

export default Login
