import React from 'react'
import { TextField } from '@mui/material'

function SignUpComponent( { firstName, lastName, email, password, onSignUpFormType } ) {
  return (
    <div className='auth-container'>
      {/* Username Field */}
      <div className='name-container'>
        <TextField
            label="First Name"
            type="text"
            name='firstName'
            value={firstName}
            onChange={onSignUpFormType}
            sx={{
                marginRight: "10px",
            '& label': { color: '#00E4E3' }, // Label color
            '& label.Mui-focused': { color: '#00E4E3' }, // Focused label color
            '& .MuiOutlinedInput-root': {
            color: '#00E4E3', // Text color inside the input
            '& fieldset': { borderColor: '#00E4E3' }, // Default outline color
            '&:hover fieldset': { borderColor: '#00E4E3' }, // Hover outline color
            '&.Mui-focused fieldset': { borderColor: '#00E4E3' }, // Focused outline color
          }
        }}
        />
        <TextField
            label="Last Name"
            type="text"
            name='lastName'
            value={lastName}
            onChange={onSignUpFormType}
            sx={{
            marginBottom: "10px",
            '& label': { color: '#00E4E3' }, // Label color
            '& label.Mui-focused': { color: '#00E4E3' }, // Focused label color
            '& .MuiOutlinedInput-root': {
            color: '#00E4E3', // Text color inside the input
            '& fieldset': { borderColor: '#00E4E3' }, // Default outline color
            '&:hover fieldset': { borderColor: '#00E4E3' }, // Hover outline color
            '&.Mui-focused fieldset': { borderColor: '#00E4E3' }, // Focused outline color
          }
        }}
        />
      </div>
      <TextField
        label="Username"
        type="text"
        name="email"
        value={email}
        onChange={onSignUpFormType}
        sx={{
            marginBottom: "10px",
          '& label': { color: '#00E4E3' }, // Label color
          '& label.Mui-focused': { color: '#00E4E3' }, // Focused label color
          '& .MuiOutlinedInput-root': {
            color: '#00E4E3', // Text color inside the input
            '& fieldset': { borderColor: '#00E4E3' }, // Default outline color
            '&:hover fieldset': { borderColor: '#00E4E3' }, // Hover outline color
            '&.Mui-focused fieldset': { borderColor: '#00E4E3' }, // Focused outline color
          }
        }}
      />

      {/* Password Field */}
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        name="password"
        value={password}
        onChange={onSignUpFormType}
        sx={{
          '& label': { color: '#00E4E3' }, // Label color
          '& label.Mui-focused': { color: '#00E4E3' }, // Focused label color
          '& .MuiOutlinedInput-root': {
            color: '#00E4E3', // Text color inside the input
            '& fieldset': { borderColor: '#00E4E3' }, // Default outline color
            '&:hover fieldset': { borderColor: '#00E4E3' }, // Hover outline color
            '&.Mui-focused fieldset': { borderColor: '#00E4E3' }, // Focused outline color
          }
        }}
      />
    </div>
  )
}

export default SignUpComponent
