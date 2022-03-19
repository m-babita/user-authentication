import React,{useRef, useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./assets.css"

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const navigate = useNavigate();

  const userRef = useRef(); 
  const errRef = useRef();
  
  const [userName, setName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState('')
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState('')
  const [matchFocus, setMatchFocus] = useState(false);
  
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(()=>{
    userRef.current.focus()
  },[])
  
  useEffect(()=>{
    setErr('')
    const result = PWD_REGEX.test(password)
    setValidPwd(result)
    const match = password === matchPwd;
    setValidMatch(match)
  },[password, matchPwd])

  
  const onSubmit = async (e) =>{
    e.preventDefault()
    const v1 = PWD_REGEX.test(password)
    if(!v1){
      setErr('Ivalid Entry')
      return;
    }
    
    try {
      let data = { name: userName, email, password };
      const response = await axios.post('https://user-auth-apii.herokuapp.com/api/v1/register',
          data
      );
      console.log(response?.data);

      setSuccess(true);
      setName('')
      setEmail('')
      setPwd('')
      setMatchPwd('');
  }
  catch (err) {
    if (!err?.response) {
        setErr('No Server Response!');
    } 
    else if (userName.length < 6) {
			setErr("Name should be longer than 5 characters!");
		}
    else {
        setErr('Something Went Wrong!')
    }
    errRef.current.focus();
  }
}

  return (
    <>
    {success ? (
                <div className="header">
                    <h2>Successfully Registered! {userName}</h2>
                    <p>
                        <button className="redirect" onClick={() => navigate("/login")} >Sign In</button>
                    </p>
                </div>
            ) : (
              <section>
    <form onSubmit = {onSubmit}>
      <h2 className="form__header">User Authentication</h2><br/>
      <p ref={errRef} className={err ? "err" : "offscreen"} aria-live="assertive">{err}</p>
      <div className='form__container'>
        
        <div className='form__title'><h3>USER SINGUP</h3></div>
        <div className='form__body'>

              {/* Name */}
              <div className='inputField'>
          <label htmlFor ="name"> Name :
          </label>
          </div>
          <i className="ri-user-3-line"></i>
          <input 
            type='text' placeholder='Your Name'
            name='name' value={userName}
            ref={ userRef} id="name"
            required autoComplete='off'
            onChange = {(e)=>setName(e.target.value)}/>
           <br/>

              {/* Email */}
              <div className='inputField'>
              <label htmlFor ="email"> Email ID :
              </label>
              </div>
              <i className="ri-mail-line"></i>
          <input 
            type='email' placeholder='example@gmail.com'
            id ="email"
            name='email' value={email}
            required autoComplete='off'
            onChange = {(e)=>setEmail(e.target.value)}/>
           <br/>

              {/* Password */}
              <div className='inputField'>
          <label htmlFor ="password">Password : 
          <span className={validPwd ? "valid" : "hide"}>
            <i className="ri-check-line"></i>
            </span>
            <span className={validPwd || !password ? "hide" : "invalid"}>
            <i className= "ri-close-line"></i>
            </span> 
            
            </label>
            </div>
            <i className="ri-lock-line"></i>
          <input 
            type='password' placeholder='Password'
            name='password' value={password}
            required id ="password"
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus = {()=> setPwdFocus(true)}
            onBlur = {()=> setPwdFocus(false)}
            onChange = {(e)=>setPwd(e.target.value)}/>
          
          <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
          <i className="ri-information-line"></i>8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />                     
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
          </p>

            {/* Confirm Password */}
          <div className='inputField'>
          <label htmlFor ="conf_password">Confirm Password : 
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <i className="ri-check-line"></i>
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <i className= "ri-close-line"></i>
            </span> 
            
            </label>
            </div>
            <i className="ri-lock-line"></i>
          <input 
            type='password' placeholder='Password'
            name='matchPwd' value={matchPwd}
            required  id="conf_password"
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus = {()=> setMatchFocus(true)}
            onBlur = {()=> setMatchFocus(false)}
            onChange = {(e)=>setMatchPwd(e.target.value)}/>
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
          <i className="ri-information-line"></i> Must match the password.
            </p>
        </div>
        <button disabled={!validPwd || !validMatch ? true : false}>SIGNUP</button>
      </div>
      <p className='form_foot'>
      Already registered?
          <button  className='redirect'onClick={() => navigate("/login")}  >Sign In</button>
      </p>
    </form>
    
    </section>
    )}
    </>
  )
}

export default Register
