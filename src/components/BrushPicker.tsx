import React from 'react'

import { RadioGroup, Radio, FormControlLabel } from '@mui/material'

import { ColorPickerProps } from './canvas-types'

const BrushPicker: React.FC<ColorPickerProps> = ({
  lineColor,
  handleChangeColor,
  handlePick,
  shape
}) => {
  const controlProps = (item: string) => ({
    checked: lineColor !== 'white' && shape === null,
    onChange: handleChangeColor,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item }
  })
  const controlPropsEraser = (item: string) => ({
    checked: lineColor === item,
    onChange: handleChangeColor,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item }
  })
  return (
    <RadioGroup aria-label='color' name='color' row={false}>
      <FormControlLabel
        value='Brush'
        onClick={handlePick}
        control={<Radio color='primary' {...controlProps('black')} />}
        label='Brush'
      />
      <FormControlLabel
        value='Eraser'
        onClick={handlePick}
        control={<Radio color='default' {...controlPropsEraser('white')} />}
        label='Eraser'
      />
    </RadioGroup>
  )
}

export default BrushPicker
