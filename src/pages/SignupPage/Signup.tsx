import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { Typography, TextField, Button, Checkbox } from '@mui/material'

import { auth } from '../../sources/firebase'

import './signpage.css'
import AlertMessage from '../../components/AlertMessage'
import Loader from '../../components/Loader'

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [pswrdVisibility, setPswrdVisibility] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/homepage')
      }
    })
  }, [navigate])

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
  const handleSignIn = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/homepage')
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='sign-page'>
      <div className='sign-header'>
        <div className='sign-header-elem'>
          <Typography variant='h6'>LOGIN</Typography>
        </div>
        <div className='sign-header-elem'>
          <Link to='/registration'>
            <Typography variant='h6'>SIGNUP</Typography>
          </Link>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className='sign-content'>
          <Typography variant='h3'>Welcome Back</Typography>
          <Typography variant='h6'>Hello Again! Sign up to continue!</Typography>
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
          <Button variant='contained' color='error' sx={{ width: '300px' }} onClick={handleSignIn}>
            SIGN IN
          </Button>
          <AlertMessage error={error} setError={setError} />
          <Typography variant='caption' className='sign-text-reset' onClick={onReset}>
            RESET PASSWORD
          </Typography>
        </div>
      )}
    </div>
  )
}

export default SignUpPage
