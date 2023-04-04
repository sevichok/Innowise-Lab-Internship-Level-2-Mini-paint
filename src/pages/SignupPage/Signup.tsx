import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { Typography, TextField, Button, Checkbox, Container, Box } from '@mui/material'

import { auth } from '../../sources/firebase'
import { ElemStyle, HeaderStyle, PageStyle } from '../MuiStyles'

import AlertMessage from '../../components/AlertMessage'
import Loader from '../../components/Loader'

const formSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
})
type MyFormValues = {
  email: string
  password: string
}

const SignUpPage = () => {
  const [error, setError] = useState<boolean>(false)
  const [pswrdVisibility, setPswrdVisibility] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()

  const handleSignIn = (email: string, password: string) => {
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
  const { values, handleChange, handleSubmit, errors, handleBlur, touched, handleReset } =
    useFormik<MyFormValues>({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: formSchema,
      onSubmit: (data) => handleSignIn(data.email, data.password)
    })

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/homepage')
      }
    })
  }, [navigate])

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
        <form
          className='sign-content'
          onSubmit={handleSubmit}
          onReset={handleReset}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '80px',
            padding: '0px 20px',
            textAlign: 'center',
            gap: '5px'
          }}
        >
          <Typography variant='h3'>Welcome Back</Typography>
          <Typography variant='h6'>Hello Again! Sign up to continue!</Typography>
          <TextField
            sx={{ width: '300px' }}
            margin={'dense'}
            size='small'
            id='email'
            label='Email'
            required
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            sx={{ width: '300px' }}
            margin='normal'
            size='small'
            id='password'
            label='Password'
            type={pswrdVisibility ? 'text' : 'password'}
            required
            value={values.password}
            onChange={handleChange}
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
          <Button variant='contained' color='error' sx={{ width: '300px' }} type='submit'>
            SIGN IN
          </Button>
          <AlertMessage error={error} setError={setError} errorMessage={errorMessage} type='sign' />
          <Button
            variant='text'
            color='error'
            className='sign-text-reset'
            type='reset'
            sx={{ width: '300px' }}
          >
            RESET PASSWORD
          </Button>
        </form>
      )}
    </Container>
  )
}

export default SignUpPage
