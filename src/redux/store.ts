import { configureStore } from "@reduxjs/toolkit"
import authSlice from "~/slices/authSlice"
import passwordsSlice from "~/slices/passwordsSlice"

export const store = configureStore({
   reducer: {
      auth: authSlice,
      passwords: passwordsSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
   })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
