import React from 'react'
import { TextField } from '@mui/material'

function SignInComponent({ email, password, onSignInFormChange}) {
  return (
    <div className='auth-container'>
        <TextField
            id="outlined-username-input"
            label="Username"
            type="text"
            autoComplete="username"
            name="email"
            value={email}
            onChange={onSignInFormChange}
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
            onChange={onSignInFormChange}
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

export default SignInComponent
