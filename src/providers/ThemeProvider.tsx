import React, { createContext } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export const ThemeContext = createContext({
  toggleColorMode: (): void => {}
})

const ColorMode = ({ children }: any) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: {
                  default: '#0a0a23'
                }
              }
            : {
                background: {
                  default: '#fff'
                }
              })
        },
        typography: {
          fontFamily: 'Raleway, sans-serif'
        }
      }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
export default ColorMode
