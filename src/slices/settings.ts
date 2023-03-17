import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"

interface SettingsState {
   xs: boolean
   lg: boolean
   md: boolean
}

const initialState:SettingsState = {
   xs: false,
   lg: false,
   md: false,
}

export const settingsSlice = createSlice({
   name: "settings",
   initialState,
   reducers: {
      watch_resize: (state) => {
         state.lg = window.innerWidth < 1024
         state.md = window.innerWidth < 678
         state.xs = window.innerWidth < 420
         
         window.addEventListener("resize", () => {
            state.lg = window.innerWidth < 1024
            state.md = window.innerWidth < 678
            state.xs = window.innerWidth < 420
         })
      }
   },
})

export const { 

} = settingsSlice.actions

export default settingsSlice.reducer
