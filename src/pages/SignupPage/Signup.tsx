import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { Typography, TextField, Button, Checkbox, Container, Box } from '@mui/material'

import { auth } from '../../sources/firebase'
import { ContentStyle, ElemStyle, HeaderStyle, PageStyle } from '../MuiStyles'

import AlertMessage from '../../components/AlertMessage'
import Loader from '../../components/Loader'

const SignUpPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [pswrdVisibility, setPswrdVisibility] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

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
      .catch((err) => {
        setErrorMessage(err.code)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Container className='sign-page' sx={PageStyle}>
      <Box className='sign-header' sx={HeaderStyle}>
        <Box className='sign-header-elem' sx={ElemStyle}>
          <Typography variant='h6' sx={{ borderBottom: '2px #eeeef0 solid' }}>
            LOGIN
          </Typography>
        </Box>
        <Box className='sign-header-elem' sx={ElemStyle}>
          <Link to='/registration'>
            <Typography variant='h6'>SIGNUP</Typography>
          </Link>
        </Box>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <Box className='sign-content' sx={ContentStyle}>
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
          <Box style={{ display: 'flex' }}>
            <Checkbox
              size='small'
              checked={pswrdVisibility}
              onChange={() => setPswrdVisibility(!pswrdVisibility)}
            />
            <Typography variant='subtitle2' sx={{ marginTop: '10px' }}>
              Show Password
            </Typography>
          </Box>
          <Button variant='contained' color='error' sx={{ width: '300px' }} onClick={handleSignIn}>
            SIGN IN
          </Button>
          <AlertMessage error={error} setError={setError} errorMessage={errorMessage} type='sign' />
          <Typography variant='caption' className='sign-text-reset' onClick={onReset}>
            RESET PASSWORD
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default SignUpPage
