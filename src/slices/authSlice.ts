import { createSlice, Dispatch } from "@reduxjs/toolkit"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "~/firebase"
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
   (email: string, password: string) => 
   async (dispatch: Dispatch, getState: typeof store.getState) => {
      try{
         await setPersistence(auth, browserSessionPersistence)
         const user = await signInWithEmailAndPassword(auth, email, password)

         
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
