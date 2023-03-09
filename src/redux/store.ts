import { configureStore } from "@reduxjs/toolkit"
import authSlice from "~/slices/authSlice"
import accountsSlice from "~/slices/accountsSlice"

export const store = configureStore({
   reducer: {
      auth: authSlice,
      accounts: accountsSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
