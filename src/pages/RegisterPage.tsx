import React, { useState } from 'react'
import './regpage.css'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { Typography, TextField, Button, Checkbox } from '@mui/material'

import { auth } from '../sources/firebase'
import AlertMessage from '../components/AlertMessage'

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [pswrdVisibility, setPswrdVisibility] = useState<boolean>(false)

  const navigate = useNavigate()

  const onchangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onchangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const onReset = () => {
    setPassword('')
    setEmail('')
    setError(false)
  }
  const handleCreateUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/homepage')
      })
      .catch(() => setError(true))
  }

  return (
    <div className='reg-page'>
      <div className='reg-header'>
        <div className='reg-header-elem'>
          <Link to='/'>
            <Typography variant='h6'>LOGIN</Typography>
          </Link>
        </div>
        <div className='reg-header-elem'>
          <Typography variant='h6'>SIGNUP</Typography>
        </div>
      </div>
      <div className='reg-content'>
        <Typography variant='h3'>{"You're Welcome"}</Typography>
        <Typography variant='h6'>Register to continue!</Typography>
        <TextField
          sx={{ width: '300px' }}
          margin={'dense'}
          size='small'
          type={'email'}
          required
          label='Email'
          onChange={onchangeEmail}
          value={email}
        />
        <TextField
          sx={{ width: '300px' }}
          margin='normal'
          size='small'
          label='Password'
          type={pswrdVisibility ? 'text' : 'password'}
          required
          value={password}
          onChange={onchangePassword}
        />
        <div style={{ display: 'flex' }}>
          <Checkbox
            size='small'
            checked={pswrdVisibility}
            onChange={() => setPswrdVisibility(!pswrdVisibility)}
          />
          <Typography variant='subtitle2' sx={{ marginTop: '10px' }}>
            Show Password
          </Typography>
        </div>
        <Button
          variant='contained'
          color='error'
          sx={{ width: '300px' }}
          onClick={handleCreateUser}
        >
          SIGN IN
        </Button>
        <AlertMessage error={error} setError={setError} />
        <Typography variant='caption' className='sign-text-reset' onClick={onReset}>
          RESET PASSWORD
        </Typography>
      </div>
    </div>
  )
}

export default RegisterPage
