import React from 'react'
import logo from '../asset/CalvinUniv-Horiz-full-color-positive.png'
import Box from '@mui/material/Box';

function CalvinLogo() {
  return (
    <div>
      <Box sx={{
        position: 'fixed',
        width: '100%',
        pt: '2vh',
        pb: '2vh',
        bottom: 0,
        backgroundColor: 'white'
      }}>
        <img
          src={logo}
          alt="Calvin University Logo"
          style={{
            display: 'block',
            margin: '0 auto',
            width: '50vw'
          }} />
      </Box>
    </div>
  )
}

export default CalvinLogo
