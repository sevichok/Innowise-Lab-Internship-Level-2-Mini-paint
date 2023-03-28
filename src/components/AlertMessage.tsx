import React from 'react'
import Snackbar from '@mui/material/Snackbar'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { ErrorProps } from './canvas-types'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const AlertMessage: React.FC<ErrorProps> = ({ error, setError, errorMessage, type }) => {
  let message
  switch (errorMessage) {
    case 'auth/wrong-password':
      message = 'Wrong Password!'
      break
    case 'auth/invalid-email':
      if (type === 'reg') {
        message = 'Invalid Email!'
      } else {
        message = 'Wrong Email!'
      }
      break
    case 'auth/user-not-found':
      message = 'User Not Found!'
      break
    case 'auth/internal-error':
      if (type === 'reg') {
        message = 'Invalid Email!'
      } else {
        message = 'You Lost Password!'
      }

      break
    default:
      message = 'Wrong email or password!'
      break
  }
  return (
    <Snackbar
      open={error}
      autoHideDuration={6000}
      onClose={() => setError(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
    >
      <Alert onClose={() => setError(false)} severity='error' sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AlertMessage
