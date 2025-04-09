// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,  // We will store the token here
}

const TokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token  // Store the token in the state
    },
    clearToken: (state) => {
      state.token = null  // Clear the token when logging out
    },
  },
})

export const { setToken, clearToken } = TokenSlice.actions
export default TokenSlice.reducer
