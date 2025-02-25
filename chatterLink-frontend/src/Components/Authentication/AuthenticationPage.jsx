import React, { useState } from 'react'
import logo from '../../images/logo.png'
import './SingupPageStyle.css'
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Box from '@mui/material/Box';
import SignUpComponent from './SignUpComponent';
import SignInComponent from './SignInComponent';
import baseUrl from '../config/baseUrl';
import axios from 'axios';

function SignupPage() {

  // state for tab value change
  const [tabValue, setTabValue] = useState("1");

  // state for signup component
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  // state for signIn component
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  })

  // handles sign up component form change
  const handleSignUpFormChange = (e) => {
    const {name, value} = e.target;
    setSignUpData({
      ...signUpData,
      [name]:value
    })
  }

  const handleSignInFormChange = (e) => {
    const {name, value} = e.target
    setSignInData({
      ...signInData,
      [name]:value
    })
  }

  const handleSignIn = () => {
    const signInPayload = {
      email: signInData.email,
      password: signInData.password,
    }

    const url = `${baseUrl}/api/v1/auth/authenticate`
    axios.post(url, signInPayload)
    .then((res) => {
      console.log(res.data)
      setSignInData({
        email: '',
        password: ''
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleSignUp = async () => {
    /*
      1. build payload
      2. construct http url
      3. make the post call 
      4. save token to local storage
    */
    const signUpPayload = {
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      email: signUpData.email,
      password: signUpData.password
    }

    const url = `${baseUrl}/api/v1/auth/signup`

    axios.post(url, signUpPayload)
    .then((res) => {
      console.log(res.data)

      setSignUpData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const handleTabChange = (event, value) => {
    setTabValue(value)
  }

  return (
    <div className='container'>
      <div className='signIn-container'>
        <img src={logo} width='150px' />
        <h1>Welcome to Chatter Link</h1>
          <TabContext value={tabValue}>
            <Box sx={{borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'}} >
                <TabList onChange={handleTabChange} sx={{display: "flex", justifyContent: "center"}} >
                  <Tab sx={{color: "#00E4E3"}} label="Sign up" value="1" />
                  <Tab sx={{color: "#00E4E3"}} label="Sign in" value="2" />
                </TabList>
              </Box>
          </TabContext>
          {/* if the tab value is 1 mount he Signup in component else mount the SignIn component */}
            {
              tabValue === "1" ? <SignUpComponent
                firstName={signUpData.firstName}
                lastName={signUpData.lastName}
                email={signUpData.email}
                password={signUpData.password}
                onSignUpFormType={handleSignUpFormChange}
               /> : <SignInComponent
                email={signInData.email}
                password={signInData.password}
                onSignInFormChange={handleSignInFormChange}
                /> 
            }
          <Button onClick={tabValue === "1" ? handleSignUp : handleSignIn} variant="outlined" sx={{height: 40, width: 200, }} >
            {tabValue === "1" ? "Sign up" : "Sign in"}
          </Button>
      </div>
    </div>
  )
}

export default SignupPage
