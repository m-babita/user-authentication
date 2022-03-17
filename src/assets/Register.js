import React from 'react'
import './assets.css'

function Register() {
  return (
    <form>
      <div className='form__container'>
        <div className='form__title'><h3>USER SINGUP</h3></div>
        <div className='form__body'>

          <label><i class="ri-user-3-line"></i>
          <input type='text' placeholder='Name'></input>
          </label> <br/>

          <label><i class="ri-mail-line"></i>
          <input type='email' placeholder='Email ID'></input>
          </label> <br/>

          <label> <i class="ri-lock-line"></i>
          <input type='password' placeholder='Password'></input>
          </label>
        </div>
        <a href='./Login.js'><button>SIGNUP</button></a>
      </div>
    </form>
  )
}

export default Register