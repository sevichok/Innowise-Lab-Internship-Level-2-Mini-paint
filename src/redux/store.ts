import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import { storage } from '../sources/firebase'

import { AppDispatch, RootState } from './index'

type Image = string
type ImagesState = { list: Image[]; loading: boolean; error: null | string }
const initialState: ImagesState = { list: [], loading: false, error: null }

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const listAllImages = createAsyncThunk<string[], string>(
  'images/listAll',
  async (activeUser) => {
    const imagesListRef = ref(storage, `images/${activeUser}`)
    const response = await listAll(imagesListRef)

    const data = response.items.map((item) => {
      return getDownloadURL(item).then((val) => {
        return val
      })
    })
    return Promise.all(data).then((url) => url)
  }
)

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(listAllImages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(listAllImages.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
  }
})
export const { addImage } = imagesSlice.actions
export default imagesSlice.reducer
