'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import { initializeI18n } from "../lib/lang";
 
initializeI18n() //i needed to do that in top level component hence.. provider?
export function ReduxProvider({ children }) {
  return <Provider store={store}>
     
    {children}
     
    </Provider>
}
