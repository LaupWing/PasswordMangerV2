import { configureStore } from "@reduxjs/toolkit"
import authSlice from "~/slices/authSlice"
import accountsSlice from "~/slices/accountsSlice"
import settingsSlice from "~/slices/settings"

export const store = configureStore({
   reducer: {
      auth: authSlice,
      accounts: accountsSlice,
      settings: settingsSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
