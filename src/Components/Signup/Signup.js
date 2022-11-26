import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import {FirebaseContext} from '../../store/Context'
import { useHistory } from 'react-router-dom';
import './Signup.css';
import Swal from 'sweetalert2'

export default function Signup() {
  const history = useHistory()
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [password, setpassword] = useState('')
  const {firebase} = useContext(FirebaseContext)

  const [usernameErr, setusernameErr] = useState("")
  const [emailErr, setemailErr] = useState("")
  const [phonenumberErr, setphonenumberErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")

  function validateUsername(){
    if (!username) {
      setusernameErr("username is required");
      return false;
    }else if (username.length < 3) {
      setusernameErr("username have minimum 3 character");
      return false;
    } 
    setusernameErr(null);  
    return true;
  }

  function validatePhoneNumber(){
    if (!phone) {
      setphonenumberErr("phone Number is required");
      return false;
    }else if (phone.length !== 10) {
      setphonenumberErr("Phone Number must 10 digit");
      return false;
    } 
    setphonenumberErr(null);  
    return true;
  }




  function validateEmail(){
    if (!email) {
      setemailErr("Email is required");
      return false;
    } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
      setemailErr("Enter a valid email");
      return false;
    } 
    setemailErr(null); 
    return true;
  }

  function validatePassword(){
    if (!password) {
      setPasswordErr("Password is required");
      return false;
    }
     else if (password.length < 6) {
      setPasswordErr("Password at least 6 character");
      return false;
    } 
    setPasswordErr(null); 
    return true;
  }
 

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!validateUsername()||!validateEmail()||!validatePhoneNumber()||!validatePassword()) return ;
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      console.log(result.user);
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
             history.push('/login')
        })
      })
    }).catch((err)=>{
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          {usernameErr && <div style={{color:"Red"}}> {usernameErr}</div>} 
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
           {emailErr && <div style={{color:"Red"}}> {emailErr}</div>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e)=>setphone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          {phonenumberErr && <div style={{color:"Red"}}> {phonenumberErr}</div>} 
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          {passwordErr && <div style={{color:"Red"}}> {passwordErr}</div>} 
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
