import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
   expire_time: number
   start_time: number
   interval: ReturnType<typeof setInterval>
   timer: number
   secret_key: string
   master_key: string
}

const initialState:AuthState = {
   expire_time: 0,
   start_time: 0,
   interval: setInterval(()=>{}),
   timer: 0,
   secret_key: typeof window !== "undefined" && localStorage.getItem("secret_key") || "",
   master_key: ""
}

export const authSlice = createSlice({
   name: "settings",
   initialState,
   reducers: {
      
   },
})

export const { 

} = authSlice.actions

export default authSlice.reducer
