import React, { useState, useEffect, useContext } from 'react'

import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import {
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Button,
  ImageList,
  ImageListItem,
  Modal
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { modalStyle, ImageWrapper, HeaderWrapper, HomepageWrapper } from '../MuiStyles'
import { auth } from '../../sources/firebase'
import Canvas from '../../components/Canvas'
import { ThemeContext } from '../../providers/ThemeProvider'
import ProgressBar from '../../components/ProgressBar'
import { useImagesHook } from '../../redux/useImagesHook'

const Homepage: React.FC = () => {
  const [activeUser, setActiveUser] = useState<string | null>(null)
  const [openCanvas, setOpenCanvas] = useState<boolean>(false)
  const [validReq, setValidReq] = useState<boolean>(false)

  const welcomeText = `It's Time To Work , ${activeUser}`

  const navigate = useNavigate()
  const theme = useTheme()
  const colorMode = useContext(ThemeContext)
  const { images, loading } = useImagesHook(activeUser, validReq)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setActiveUser(user.email)
      } else if (!user) {
        navigate('/')
      }
    })
  }, [navigate])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/')
    })
  }

  return (
    <Box className='homepage' sx={HomepageWrapper}>
      <Box className='homepage-header' sx={HeaderWrapper}>
        <Box>
          <Typography variant='h4'>INNOWISE MINI-PAINT TASK </Typography>
          <Typography variant='h5'>{welcomeText}</Typography>
        </Box>
        <FormGroup sx={{ marginLeft: '20px', gap: '10px' }}>
          <FormControlLabel
            onChange={colorMode.toggleColorMode}
            control={<Switch color='secondary' />}
            label={`${theme.palette.mode[0].toUpperCase() + theme.palette.mode.slice(1)} theme`}
          />
        </FormGroup>
        <Button sx={{ height: '60px' }} onClick={handleSignOut} variant='contained' color='error'>
          Sign Out
        </Button>
      </Box>
      <Button
        sx={{ height: '60px', margin: '20px 20px 0px' }}
        variant='contained'
        color='error'
        onClick={() => setOpenCanvas(true)}
      >
        Open Canvas
      </Button>
      <Modal open={openCanvas} onClose={() => setOpenCanvas(false)} keepMounted={false}>
        <Box sx={modalStyle}>
          <Canvas
            activeUser={activeUser}
            setClose={setOpenCanvas}
            validReq={validReq}
            setValidReq={setValidReq}
            width={0.8 * document.documentElement.clientWidth}
            height={1.2 * document.documentElement.clientHeight}
          />
        </Box>
      </Modal>
      {loading && <ProgressBar />}
      <ImageList sx={{ padding: '20px 20px' }} variant='quilted' cols={4} gap={8}>
        {images.map((url: string) => {
          return (
            <ImageListItem key={url.slice(-7)}>
              <img
                style={ImageWrapper}
                src={`${url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={url.slice(-7)}
                loading='lazy'
              ></img>
            </ImageListItem>
          )
        })}
      </ImageList>
    </Box>
  )
}

export default Homepage
