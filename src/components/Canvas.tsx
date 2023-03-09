import React, { useState, useRef, useEffect } from 'react'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Slider, Button, Stack, Paper, Typography } from '@mui/material'

import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye'
import CropSquareIcon from '@mui/icons-material/CropSquare'

import { storage } from '../sources/firebase'

import { useAppDispatch, addImage } from '../redux/store'

import ColorPicker from './ColorPicker'

import BrushPicker from './BrushPicker'
import { CanvasProps } from './canvas-types'

const Canvas: React.FC<CanvasProps> = ({ activeUser, setClose, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const dispatch = useAppDispatch()

  const [isDraw, setDraw] = useState<boolean>(false)
  const [lineColor, setLineColor] = useState<string>('black')
  const [lineWidth, setLineWidth] = useState<number>(2)
  const [shape, setShape] = useState<string | null>(null)

  const canvasOffsetX = useRef<number | null>(null)
  const canvasOffsetY = useRef<number | null>(null)
  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }
    ctx.lineCap = 'round'
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    contextRef.current = ctx

    const canvasOffset = canvas.getBoundingClientRect()
    canvasOffsetX.current = canvasOffset.left
    canvasOffsetY.current = canvasOffset.top
  }, [lineColor, lineWidth])

  const saveImage = (): void => {
    if (!contextRef.current) {
      return
    }
    contextRef.current.canvas.toBlob((blob) => {
      if (!blob) {
        return
      }
      const image = new Image()
      image.src = URL.createObjectURL(blob)
      const imgRef = ref(storage, `images/${activeUser}/${image.src.slice(-7)}`)
      uploadBytes(imgRef, blob).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => dispatch(addImage(url)))
      })
      setTimeout(() => {
        clearCanvas()
        setClose(false)
      }, 1000)
    })
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!contextRef.current) {
      return
    }
    setDraw(true)
    if (canvasRef.current) {
      if (shape === 'rectangle') {
        if (!canvasOffsetX.current || !canvasOffsetY.current) {
          return
        }
        startX.current = e.clientX - canvasOffsetX.current
        startY.current = e.clientY - canvasOffsetY.current
      } else if (shape === 'circle') {
        if (!canvasOffsetX.current || !canvasOffsetY.current) {
          return
        }
        startX.current = e.clientX - canvasOffsetX.current
        startY.current = e.clientY - canvasOffsetY.current
      }
      const fixing = canvasRef.current.getBoundingClientRect()
      contextRef.current.beginPath()
      contextRef.current.moveTo(e.clientX - fixing.left, e.clientY - fixing.top)
    }
  }

  const drawing = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!contextRef.current) {
      return
    }
    if (isDraw) {
      if (canvasRef.current) {
        if (shape === 'rectangle') {
          if (
            !canvasOffsetX.current ||
            !canvasOffsetY.current ||
            !startX.current ||
            !startY.current
          ) {
            return
          }
          const newClientX = e.clientX - canvasOffsetX.current
          const newClientY = e.clientY - canvasOffsetY.current
          const rectWidth = newClientX - startX.current
          const rectHeight = newClientY - startY.current

          contextRef.current.rect(startX.current, startY.current, 5 + rectWidth, 5 + rectHeight)
        } else if (shape === 'circle') {
          if (
            !canvasOffsetX.current ||
            !canvasOffsetY.current ||
            !startX.current ||
            !startY.current
          ) {
            return
          }
          const newClientX = e.clientX - canvasOffsetX.current
          const rectWidth = newClientX - startX.current

          contextRef.current.arc(
            startX.current,
            startY.current,
            10 + Math.abs(rectWidth),
            0,
            2 * Math.PI
          )
        }
        const fixing = canvasRef.current.getBoundingClientRect()
        contextRef.current.lineTo(e.clientX - fixing.left, e.clientY - fixing.top)
      }
      contextRef.current.stroke()
    }
  }

  const finishDrawing = (): void => {
    if (!contextRef.current) {
      return
    }
    if (shape === 'rectangle') {
      setDraw(false)
    }
    contextRef.current.closePath()
    setDraw(false)
  }

  const clearCanvas = (): void => {
    if (!contextRef.current) {
      return
    }
    contextRef.current.clearRect(
      0,
      0,
      contextRef.current.canvas.width,
      contextRef.current.canvas.height
    )
  }

  const drawRectangle = (): void => {
    setShape('rectangle')
  }
  const drawCircle = (): void => {
    setShape('circle')
  }

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLineColor(event.target.value)
  }
  const handleChangeWidth = (event: Event, value: number | number[]) => {
    setLineWidth(value as number)
  }

  return (
    <div className='canvas-wrapper'>
      <div className='modal'>
        <canvas
          id='canvas'
          className='canvas'
          width={0.5 * width}
          height={0.45 * height}
          onMouseMove={drawing}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          ref={canvasRef}
        ></canvas>
        <div className='canvas-options'>
          <div className='canvas-options-left'>
            <Typography variant='h6'>Options:</Typography>
            <BrushPicker
              handlePick={() => setShape(null)}
              lineColor={lineColor}
              handleChangeColor={handleChangeColor}
            />
            <Typography variant='h6'>Colors:</Typography>
            <ColorPicker lineColor={lineColor} handleChangeColor={handleChangeColor} />
            <Typography variant='h6'>Width:</Typography>
            <Slider
              // aria-label='lineWidth'
              // valueLabelDisplay='auto'
              // defaultValue={2}
              value={lineWidth}
              step={2}
              onChange={handleChangeWidth}
              marks
              min={2}
              max={18}
            ></Slider>
          </div>
          <div className='canvas-options-right'>
            <Stack direction='column' spacing={2}>
              <Typography variant='h6'>Shapes:</Typography>
              <Paper
                onClick={drawRectangle}
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <CropSquareIcon />
                <Typography variant='subtitle1'>Rectangle</Typography>
              </Paper>
              <Paper
                onClick={drawCircle}
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Canvas
