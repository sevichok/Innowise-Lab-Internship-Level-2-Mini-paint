import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { Typography, TextField, Button, Checkbox, Container, Box } from '@mui/material'

import { auth } from '../../sources/firebase'
import AlertMessage from '../../components/AlertMessage'
import Loader from '../../components/Loader'
import { ContentStyle, ElemStyle, HeaderStyle, PageStyle } from '../MuiStyles'

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [pswrdVisibility, setPswrdVisibility] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

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
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
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
    <Container className='reg-page' sx={PageStyle}>
      <Box className='reg-header' sx={HeaderStyle}>
        <Box className='reg-header-elem' sx={ElemStyle}>
          <Link to='/'>
            <Typography variant='h6'>LOGIN</Typography>
          </Link>
        </Box>
        <Box className='reg-header-elem' sx={ElemStyle}>
          <Typography variant='h6' sx={{ borderBottom: '2px #eeeef0 solid' }}>
            SIGNUP
          </Typography>
        </Box>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <Box className='reg-content' sx={ContentStyle}>
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
          <Box sx={{ display: 'flex' }}>
            <Checkbox
              size='small'
              checked={pswrdVisibility}
              onChange={() => setPswrdVisibility(!pswrdVisibility)}
            />
            <Typography variant='subtitle2' sx={{ marginTop: '10px' }}>
              Show Password
            </Typography>
          </Box>
          <Button
            variant='contained'
            color='error'
            sx={{ width: '300px' }}
            onClick={handleCreateUser}
          >
            SIGN UP
          </Button>
          <AlertMessage error={error} setError={setError} errorMessage={errorMessage} type='reg' />
          <Typography variant='caption' className='sign-text-reset' onClick={onReset}>
            RESET PASSWORD
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default RegisterPage
