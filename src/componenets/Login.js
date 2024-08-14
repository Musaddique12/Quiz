import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './all.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login= () => {
   
    const [email,set_eamail] = useState('')
    const [password,set_Password] = useState('')
    const navigate = useNavigate();

    const submitHandler = (event) =>{
        event.preventDefault()

        signInWithEmailAndPassword(auth,email,password)
        .then((res)=>{
            const user = res.user;

            console.log(user)
            localStorage.setItem('email',user.email)
            localStorage.setItem('uid',user.uid)
            localStorage.setItem('name',user.displayName)
            localStorage.setItem('photo',user.photoURL)

            navigate('/profile')

        })

        .catch(err=>{
            console.log(err)
          })
    }

    return (
        <div id='login'>
              <div id="loginContainer">
             <h2 id="loginHeader">Login</h2>
             <form id="loginForm" onSubmit={submitHandler}>
                 
                 <div id="emailContainer" className="inputContainer">
                     <input
                         id="email"
                         className="inputField"
                         type="email"
                         name="email"
                         placeholder="Email"
                         onChange={(e)=>{set_eamail(e.target.value)}}
                     />
                     <i className="fa fa-envelope inputIcon"></i>
                 </div>
                 <div id="passwordContainer" className="inputContainer">
                     <input
                         id="password"
                         className="inputField"
                         type="password"
                         name="password"
                         placeholder="Password"
                         onChange={(e)=>{set_Password(e.target.value)}}
                     />
                     <i className="fa fa-lock inputIcon"></i>
                 </div>
                 <button id="loginButton" type="submit">Login</button>
                 <button id="signupButton" type="button" >Sign Up</button>
             </form>
         </div>
        </div>
     );
};

export default Login;
