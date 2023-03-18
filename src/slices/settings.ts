import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"

interface SettingsState {
   xs: boolean
   lg: boolean
   md: boolean
   show_sidenav: boolean
   nav_width: number
}

const initialState:SettingsState = {
   xs: false,
   lg: false,
   md: false,
   nav_width: 0,
   show_sidenav: false
}

export const settingsSlice = createSlice({
   name: "settings",
   initialState,
   reducers: {
      watchResize: (state) => {
         state.lg = window.innerWidth < 1024
         state.md = window.innerWidth < 678
         state.xs = window.innerWidth < 420
         console.log(state.lg)
         window.addEventListener("resize", () => {
            state.lg = window.innerWidth < 1024
            state.md = window.innerWidth < 678
            state.xs = window.innerWidth < 420
         })
      },
      setNavWidth: (state, action: PayloadAction<number>) => {
         state.nav_width = action.payload
      },
      toggleSidenav: (state) => {
         state.show_sidenav = !state.show_sidenav 
      }
   },
})

export const { 
   watchResize,
   setNavWidth,
   toggleSidenav
} = settingsSlice.actions

export default settingsSlice.reducer
