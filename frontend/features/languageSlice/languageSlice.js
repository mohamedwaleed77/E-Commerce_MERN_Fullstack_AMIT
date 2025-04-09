import { createSlice } from '@reduxjs/toolkit'

export const languageSliceSlice = createSlice({
  name: 'toggle',
  initialState: {
    value: false
  },
  reducers: {
    toggle: state => {
      state.value=!state.value
    } 
  }
})
export const { toggle} = languageSliceSlice.actions

export default languageSliceSlice.reducer