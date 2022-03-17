import React from 'react'
import './assets.css'

function Login() {
  return (
    <form>
      <div className='form__container'>
        <div className='form__title'>
            <h3>USER LOGIN</h3>
            Welcome Back,
        </div>
        <div className='form__body'>
          
          <input type='email' placeholder='Email ID'></input>
          <input type='password' placeholder='Password'></input>
        </div>
        <button>LOGIN</button>
      </div>
    </form>
  )
}

export default Login