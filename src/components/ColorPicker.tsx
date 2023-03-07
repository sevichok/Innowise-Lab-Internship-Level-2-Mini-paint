import React from 'react'

import { RadioGroup, Radio } from '@mui/material'
import { blue, green, pink, red, yellow, grey, orange, purple } from '@mui/material/colors'

import { ColorPickerProps } from './canvas-types'

const ColorPicker: React.FC<ColorPickerProps> = ({ lineColor, handleChangeColor }) => {
  const controlProps = (item: string) => ({
    checked: lineColor === item,
    onChange: handleChangeColor,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item }
  })

  return (
    <RadioGroup aria-label='color' name='color' row>
      <Radio
        {...controlProps('black')}
        sx={{
          color: grey[900],
          '&.Mui-checked': {
            color: grey[900]
          }
        }}
      />
      <Radio
        {...controlProps('red')}
        sx={{
          color: red[600],
          '&.Mui-checked': {
            color: red[600]
          }
        }}
      />
      <Radio
        {...controlProps('blue')}
        sx={{
          color: blue[600],
          '&.Mui-checked': {
            color: blue[600]
          }
        }}
      />
      <Radio
        {...controlProps('green')}
        sx={{
          color: green[600],
          '&.Mui-checked': {
            color: green[600]
          }
        }}
      />
      <Radio
        {...controlProps('yellow')}
        color='default'
        sx={{
          color: yellow[600],
          '&.Mui-checked': {
            color: yellow[600]
          }
        }}
      />
      <Radio
        {...controlProps('pink')}
        color='default'
        sx={{
          color: pink[100],
          '&.Mui-checked': {
            color: pink[100]
          }
        }}
      />{' '}
      <Radio
        {...controlProps('purple')}
        color='default'
        sx={{
          color: purple[600],
          '&.Mui-checked': {
            color: purple[600]
          }
        }}
      />{' '}
      <Radio
        {...controlProps('orange')}
        color='default'
        sx={{
          color: orange[600],
          '&.Mui-checked': {
            color: orange[600]
          }
        }}
      />
    </RadioGroup>
  )
}

export default ColorPicker
