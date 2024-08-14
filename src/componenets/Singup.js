import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { app, auth, firestore_database } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { getStorage, ref as imgRef, getDownloadURL, uploadBytes } from 'firebase/storage'

export const Singup = () => {

    const [email,set_eamail] = useState('')
    const [usename,set_Username] = useState('')
    const [password,set_Password] = useState('')
    const [image, setImage] = useState(null)

    const navigate = useNavigate();


    const handleImage = (event) => {
        const file = event.target.files[0]
        setImage(file)
    }

    const submitHandler = (event) =>{
        event.preventDefault()

        createUserWithEmailAndPassword(auth,email,password)
        .then(async(res)=>{
  const user=res.user;


            const storage = getStorage(app)

            const imgReference = imgRef(storage, `images/${user.uid}`)
            await uploadBytes(imgReference, image)
    
            const imgUrl = await getDownloadURL(imgReference)
          

            console.log(user)

            updateProfile(user,{
                displayName:usename,
                photoURL:imgUrl
            })

            const data = addDoc(collection(firestore_database, 'game_data'), {
                uid:user.uid,
                star:0,
                level:'beginer',
                total_quest:0,
                corret_quest:0,
                star_for_next_level:30
            })
            .then(e=>{
                navigate('/login')
            })

            .catch(err=>{
                console.log(err)
            })

        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
       <div id='login'>
             <div id="loginContainer">
            <h2 id="loginHeader">Singup</h2>
            <form id="loginForm" onSubmit={submitHandler}>
                <div id="usernameContainer" className="inputContainer">
                    <input
                        id="username"
                        className="inputField"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={(e)=>{set_Username(e.target.value)}}
                    />
                    <i className="fa fa-user inputIcon"></i>
                </div>
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

                <div id="passwordContainer" className="inputContainer">
                    <input
                        id="password"
                        className="inputField"
                        type="file"
                        name="file"
                        onChange={handleImage}
                    />
                    <i className="fa fa-lock inputIcon"></i>
                </div>

                <button id="loginButton" type="submit">Singup</button>
                <button id="signupButton" type="button" >Login</button>
            </form>
        </div>
       </div>
    );
}
