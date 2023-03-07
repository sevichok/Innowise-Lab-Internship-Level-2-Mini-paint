import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/index'
import './index.css'
import App from './App'
import ColorMode from './providers/ThemeProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as Element)
root.render(
  <ColorMode>
    <Provider store={store}>
      <App />
    </Provider>
  </ColorMode>
)
