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
          
          <label><i class="ri-mail-line"></i>
          <input type='email' placeholder='Email ID'></input>
          </label> <br/>

          <label> <i class="ri-lock-line"></i>
          <input type='password' placeholder='Password'></input>
          </label>
        </div>
        <button>LOGIN</button>
      </div>
    </form>
  )
}

export default Login