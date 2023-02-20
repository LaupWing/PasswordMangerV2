import { createSlice, Dispatch } from "@reduxjs/toolkit"
import { store } from "~/redux/store"

export const counterSlice = createSlice({
   name: "counter",
   initialState: {
      value: 0,
   },
   reducers: {
      increment: (state) => {
         state.value += 1
      },
      decrement: (state) => {
         state.value -= 1
      },
      incrementByAmount: (state, action) => {
         state.value += action.payload
      },
   },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const login = 
   () => async (dispatch: Dispatch, getState: typeof store.getState) => {
      try{
         
      }catch(e){
         throw e
      }
   }

export const logout = 
   () => async (dispatch: Dispatch, getState: typeof store.getState) => {

   }
   
export const getUser = 
   () => async (dispatch: Dispatch, getState: typeof store.getState) => {

   }

export default counterSlice.reducer
