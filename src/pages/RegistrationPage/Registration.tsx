import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Typography, TextField, Button, Checkbox, Container, Box } from '@mui/material'

import { auth } from '../../sources/firebase'
import AlertMessage from '../../components/AlertMessage'
import Loader from '../../components/Loader'
import { ElemStyle, HeaderStyle, PageStyle } from '../MuiStyles'

const formSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
})
type MyFormValues = {
  email: string
  password: string
}

const RegisterPage = () => {
  const [error, setError] = useState<boolean>(false)
  const [pswrdVisibility, setPswrdVisibility] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()

  const handleCreateUser = (email: string, password: string) => {
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
  const { values, handleChange, handleSubmit, errors, handleBlur, touched, handleReset } =
    useFormik<MyFormValues>({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: formSchema,
      onSubmit: (data) => handleCreateUser(data.email, data.password)
    })

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
          <Typography variant='h3'>{"You're Welcome"}</Typography>
          <Typography variant='h6'>Register to continue!</Typography>
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
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
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
          <Button variant='contained' color='error' sx={{ width: '300px' }} type='submit'>
            SIGN UP
          </Button>
          <AlertMessage error={error} setError={setError} errorMessage={errorMessage} type='reg' />
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

export default RegisterPage
