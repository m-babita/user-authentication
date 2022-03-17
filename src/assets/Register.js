import React from 'react'
import './assets.css'

function Register() {
  return (
    <form>
      <div className='form__container'>
        <div className='form__title'><h3>USER SINGUP</h3></div>
        <div className='form__body'>
          
          <input type='text' placeholder='Name'></input>
          <input type='email' placeholder='Email ID'></input>
          <input type='password' placeholder='Password'></input>
        </div>
        <a href='./Login.js'><button>SIGNUP</button></a>
      </div>
    </form>
  )
}

export default Register