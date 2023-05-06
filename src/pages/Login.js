import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { MDBCol, MDBRow,  MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';  
import image from '../assets/all-images/login.jpg'
import HeroSlider from '../components/UI/HeroSlider';
import '../styles/login1.css'
import Footer from '../components/Footer/Footer';
import api from '../api/api';
import PasswordChecklist from "react-password-checklist";
import { TailSpin } from 'react-loader-spinner';

function Login({onLogin}) {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [dob, setDob] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [roleName, setRoleName] = useState('');
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const passwordRules = ["capital", "specialChar", "minLength", "number", "lowercase"];
  const [loading, setLoading] = useState(false);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
 
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const tokenResponse = await sendTokenRequest(email, password);
      localStorage.setItem('authToken', tokenResponse?.accessToken);
      setToken(tokenResponse);
      localStorage.setItem('roleName',tokenResponse?.roleName);
      setRoleName(roleName);
      localStorage.setItem('userName', tokenResponse?.userName); // Store the user name in local storage
      setUserName(tokenResponse?.userName);
      localStorage.setItem('storeId', tokenResponse?.storeId);
      localStorage.setItem('userId', tokenResponse?.userId);
      onLogin(tokenResponse)
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  
  const sendTokenRequest = async (email, password) => {
    try{
    const response = await axios.post(api+'/user/login', { email:email, password:password });
    return response.data;
  } catch(error){
    console.log(error);
  }
}
  
  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    // Check if password meets minimum requirements
    const passwordRegex = /^.*(?=.{6,12})(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#$%&*]).*$/;
    if (!passwordRegex.test(registerPassword)) {
      alert('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number');
      setLoading(false);
      return;
    }else{
  
    try {
      const response = await axios.post(api+'/user', { firstName:firstName, lastName:lastName, email: registerEmail, password: registerPassword, dob: dob, drivingLicense :drivingLicense});
      localStorage.setItem('authToken', response.data.token);
  
      setFirstName('');
      setLastName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setDob('');
      setDrivingLicense('');
      alert("You have successfully registered");
      setLoading(false);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
   
  }
  };
  
  return (
    <div className="login-wrapper" style={{ position: "relative" }}>
    {loading && (
      <div className="loader-wrapper" style={{ position: "absolute", top: 0, left:0 , bottom: 0, right: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <TailSpin
          height="180"
          width="180"
          color="#fff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{ position: "absolute", top: 250, left: 625, bottom: 0, right: 0 }}
          wrapperClass=""
          visible={true}
        />
      </div>
    )}
    <MDBContainer className="p-5 my-6 d-flex flex-column w-50">
        <MDBRow>

  <MDBCol col='10' md='6 ' className='container-with-image' >
  <img src={image} className="img-fluid" alt="Sample image" />
  </MDBCol>

<MDBCol col='4' md='6' className='container-with-noimage'>
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      
      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>
      

        <MDBInput prefix={<MDBIcon icon='user' className='my-prefix-icon-class'/>}  wrapperClass='mb-4' placeholder='Email' id='form1' type='email' name='email' 
        onChange={(e)=>setEmail(e.target.value)}/>

          <MDBInput wrapperClass='mb-4' placeholder='Password' id='form1 ' type='password' onChange={(e)=>setPassword(e.target.value)}/>
    
          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="/">Forgot password?</a>
          </div>

          <MDBBtn className="btn mb-4 w-100" onClick={handleLogin}>Sign in</MDBBtn>
      
          <p className="text-center">Not a member? <a href="javascript:void(0)" onClick={() => setJustifyActive('tab2')}>Register</a></p>


        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          

        <div className='row'>
            <div className='col-md-6'>
                <MDBInput wrapperClass='mb-2' placeholder='First Name' id='form1' type='text' name='firstName'onChange={(e)=>setFirstName(e.target.value)}/>
            </div>
            <div className='col-md-6'>
                <MDBInput wrapperClass='mb-2' placeholder='Last Name' id='form1' type='text' name='lastName' onChange={(e)=>setLastName(e.target.value)}/>
            </div>
        </div>
          <MDBInput  wrapperClass='mb-4' placeholder='Email' id='form1' type='email' name='email' value={registerEmail} 
              onChange={(e) => setRegisterEmail(e.target.value)} />
              
              <MDBInput  wrapperClass="mb-4"  placeholder="Password"  id="form1"  type="password"  value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}/>
             <p className='password-rules'>Should contain uppercase,lowercase,special character,numbers</p>

          <MDBInput wrapperClass='mb-4' placeholder='Date of birth' id='form1' type='date' name = 'dob' onChange={(e)=> setDob(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' placeholder='Driving License Number' id='form1' type='text'  onChange={(e)=>setDrivingLicense(e.target.value)}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="btn mb-4 w-100 style" onClick={handleRegister}>Sign up</MDBBtn>

        </MDBTabsPane>

      </MDBTabsContent>
    </MDBCol>
    </MDBRow>
    
    </MDBContainer>
    <Footer/>
    </div>
  );
}

export default Login;