import React, { Dispatch, SetStateAction } from 'react'

export type CanvasType = {
  width: number
  height: number
}

export type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  activeUser: string | null
  setClose: Dispatch<SetStateAction<boolean>>
  width: number
  height: number
}

export type ColorPickerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  lineColor: string
  handlePick?: () => void
  handleChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type ErrorProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  error: boolean
  setError: (error: boolean) => void
}
