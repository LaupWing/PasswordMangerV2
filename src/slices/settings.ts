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
      setSizes: (state) => {
         state.lg = window.innerWidth < 1024
         state.md = window.innerWidth < 678
         state.xs = window.innerWidth < 42
      },
      setNavWidth: (state, action: PayloadAction<number>) => {
         state.nav_width = action.payload
      },
      toggleSidenav: (state, action: PayloadAction<boolean|undefined>) => {
         if(action.payload){
            state.show_sidenav = action.payload
         }else{
            state.show_sidenav = !state.show_sidenav 
         }
      }
   },
})

export const { 
   setSizes,
   setNavWidth,
   toggleSidenav
} = settingsSlice.actions

export default settingsSlice.reducer
