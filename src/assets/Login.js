import React, {useState} from 'react'
import './assets.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPwd] = useState('')

  return (
    <form>
      <h2 className="header">User Authentication</h2><br/>
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
            name='email' value={email}
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
            name='password' value={password}
            required 
            onChange = {(e)=>setPwd(e.target.value)}
            />
        </div>
        <button>LOGIN</button>
      </div>
      <p className='form_foot'>
      Create Account<br />
      <span className="line">
          <a href="/login.js">Sign Up</a>
      </span>
      </p>
    </form>
  )
}

export default Login