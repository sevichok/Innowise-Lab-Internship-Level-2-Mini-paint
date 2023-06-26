import React from 'react'
import { Slider, Button, Stack, Paper, Typography, Container, Box } from '@mui/material'

import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import ColorPicker from './ColorPicker'

import BrushPicker from './BrushPicker'
import { OptionsProps } from './canvas-types'

const CanvasOptions: React.FC<OptionsProps> = ({
  shape,
  lineWidth,
  lineColor,
  clearCanvas,
  saveImage,
  drawCircle,
  drawRectangle,
  brushPick,
  handleChangeColor,
  handleChangeWidth
}) => {
  const styledBox = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    maxWidth: '200px',
    padding: '0px 10px'
  }
  return (
    <Container sx={{ display: 'flex' }}>
      <Box sx={styledBox}>
        <Typography
          variant='h6'
          sx={{
            cursor: 'default'
          }}
        >
          Options:
        </Typography>
        <BrushPicker
          shape={shape}
          handlePick={brushPick}
          lineColor={lineColor}
          handleChangeColor={handleChangeColor}
        />
        <Typography
          variant='h6'
          sx={{
            cursor: 'default'
          }}
        >
          Colors:
        </Typography>
        <ColorPicker lineColor={lineColor} handleChangeColor={handleChangeColor} />
        <Typography
          variant='h6'
          sx={{
            cursor: 'default'
          }}
        >
          Width:
        </Typography>
        <Slider
          valueLabelDisplay='auto'
          value={lineWidth}
          step={2}
          onChange={handleChangeWidth}
          marks
          min={2}
          max={18}
        ></Slider>
      </Box>
      <Box sx={styledBox}>
        <Stack direction='column' spacing={2}>
          <Typography
            variant='h6'
            sx={{
              cursor: 'default'
            }}
          >
            Shapes:
          </Typography>
          <Paper
            onClick={drawRectangle}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '2px 5px',
              border: shape === 'rectangle' ? '1px solid black' : '0px'
            }}
          >
            <CropSquareIcon />
            <Typography variant='subtitle1'>Rectangle</Typography>
          </Paper>
          <Paper
            onClick={drawCircle}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '2px 5px',
              border: shape === 'circle' ? '1px solid black' : '0px'
            }}
          >
            <PanoramaFishEyeIcon />
            <Typography variant='subtitle1'>Circle</Typography>
          </Paper>
        </Stack>
        <Stack spacing={2}>
          <Button onClick={clearCanvas} size='small' color='error' variant='contained'>
            Clear
          </Button>
          <Button onClick={saveImage} size='small' color='success' variant='contained'>
            Upload
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default CanvasOptions
