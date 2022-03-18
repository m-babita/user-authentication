import React,{useRef, useState, useEffect} from 'react'
import axios from './axios.js';
import "./assets.css"

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

  const userRef = useRef();
  const errRef = useRef();
  
  const [name, setName] = useState('')

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
    const result = PWD_REGEX.test(password)
    console.log(result, password)
    setValidPwd(result)
    const match = password === matchPwd;
    setValidMatch(match)
  },[password, matchPwd])

  useEffect(() =>{
    setErr('')
  }, [name,password, matchPwd])

  const onSubmit = async (e) =>{
    e.preventDefault()
    const v1 = PWD_REGEX.test(password)
    if(!v1){
      setErr('Ivalid Entry')
      return;
    }
    
    try {
      const response = await axios.post('/register',
          JSON.stringify({ name, email, password }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response))
      setSuccess(true);

      setName('')
      setEmail('')
      setPwd('')
      setMatchPwd('');
  }
  catch (err) {
    if (!err?.response) {
        setErr('No Server Response');
    } else if (err.response?.status === 409) {
        setErr('Username Taken');
    } else {
        setErr('Registration Failed')
    }
    errRef.current.focus();
  }
}

  return (
    <>
    {success ? (
                <div className="header">
                    <h1>Successfully Registered!</h1>
                    <p>
                        <a href="./login">Sign In</a>
                    </p>
                </div>
            ) : (
              <section>
    <form onSubmit = {onSubmit}>
      <h2 className="header">User Authentication</h2><br/>
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
            name='name' value={name}
            ref={ userRef}
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
            required 
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
            required 
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus = {()=> setMatchFocus(true)}
            onBlur = {()=> setMatchFocus(false)}
            onChange = {(e)=>setMatchPwd(e.target.value)}/>
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
           Must match the password.
            </p>
        </div>
        <button disabled={!validPwd || !validMatch ? true : false}>SIGNUP</button>
      </div>
      <p className='form_foot'>
      Already registered?<br />
      <span className="line">
          <a href="/login.js">Sign In</a>
      </span>
      </p>
    </form>
    
    </section>
    )}
    </>
  )
}

export default Register