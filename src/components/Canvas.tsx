import React, { useState, useRef, useEffect } from 'react'
import { Container, Box } from '@mui/material'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { storage } from '../sources/firebase'

import { CanvasProps } from './canvas-types'
import CanvasOptions from './CanvasOptions'
import { useImagesHook } from '../redux/useImagesHook'
import { CanvasWrapper, ModalWrapper } from '../pages/MuiStyles'

const Canvas: React.FC<CanvasProps> = ({
  activeUser,
  setClose,
  width,
  height,
  validReq,
  setValidReq
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

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

  useImagesHook(activeUser, validReq)

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
        getDownloadURL(snapshot.ref).then((url) => {
          setValidReq((prev) => !prev)
          return url
        })
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
      if (!canvasOffsetX.current || !canvasOffsetY.current) {
        return
      }
      if (shape === 'rectangle' || shape === 'circle') {
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
          contextRef.current.lineWidth = 40
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
          contextRef.current.lineWidth = 40
          contextRef.current.arc(
            startX.current,
            startY.current,
            20 + Math.abs(rectWidth),
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
  const brushPick = (): void => {
    setShape(null)
  }

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLineColor(event.target.value)
  }
  const handleChangeWidth = (event: Event, value: number | number[]) => {
    setLineWidth(value as number)
  }

  return (
    <Container sx={CanvasWrapper}>
      <Box sx={ModalWrapper}>
        <canvas
          id='canvas'
          className='canvas'
          width={0.5 * width}
          height={0.45 * height}
          style={{ border: '2px solid black', borderRadius: '5px' }}
          onMouseMove={drawing}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          ref={canvasRef}
        ></canvas>
        <CanvasOptions
          shape={shape}
          lineColor={lineColor}
          lineWidth={lineWidth}
          handleChangeColor={handleChangeColor}
          handleChangeWidth={handleChangeWidth}
          drawRectangle={drawRectangle}
          drawCircle={drawCircle}
          saveImage={saveImage}
          clearCanvas={clearCanvas}
          brushPick={brushPick}
        />
      </Box>
    </Container>
  )
}

export default Canvas
