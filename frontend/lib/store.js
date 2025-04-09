import { configureStore } from '@reduxjs/toolkit'
import languageReducer from '../features/languageSlice/languageSlice'
export const store = configureStore({
    reducer: {
      toggle:languageReducer
     
    },
  })