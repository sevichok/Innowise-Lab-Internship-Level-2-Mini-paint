import { configureStore } from '@reduxjs/toolkit'

import imagesSlice from './store'

const store = configureStore({
  reducer: {
    images: imagesSlice
  }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
