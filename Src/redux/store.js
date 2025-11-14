import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from './Slice/LoginSlice'
import LocalSlice from './Slice/LocalSlice'

export const store = configureStore({
  reducer: {
    isLogin: LoginSlice,
    isLocal:LocalSlice 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
})