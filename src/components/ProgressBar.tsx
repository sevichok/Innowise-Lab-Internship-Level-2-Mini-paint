import React from 'react'

import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

function ProgressBar() {
  return (
    <Box sx={{ width: 'auto', padding: '20px 20px' }}>
      <LinearProgress
        sx={{
          backgroundColor: 'white',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#d92626'
          }
        }}
      />
    </Box>
  )
}

export default ProgressBar
