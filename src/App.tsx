import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
const RegPage = React.lazy(() => import('./pages/RegistrationPage/Registration'))
const SignPage = React.lazy(() => import('./pages/SignupPage/Signup'))
const HomePage = React.lazy(() => import('./pages/Homepage/Home'))
import Loader from './components/Loader'

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        boxSizing: 'border-box',
        width: '100%',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        p: 0
      }}
    >
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Suspense fallback={<Loader />}>
                <SignPage />
              </Suspense>
            }
          ></Route>
          <Route
            path='/registration'
            element={
              <Suspense fallback={<Loader />}>
                <RegPage />
              </Suspense>
            }
          ></Route>
          <Route
            path='/homepage'
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          ></Route>
        </Routes>
      </Router>
    </Box>
  )
}

export default App
