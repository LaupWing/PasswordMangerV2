import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { auth } from "~/firebase"
import checkSecretKey from "~/lib/checkSecretKey"
import { store } from "~/redux/store"

export const counterSlice = createSlice({
   name: "counter",
   initialState: {
      value: 0,
      expire_time: 0
   },
   reducers: {
      setExperTime: (state, action: PayloadAction<UserCredential>) => {
         const lastSignInTime = action.payload.user.metadata.lastSignInTime
         state.expire_time = Number(lastSignInTime) + ((60 * 30)*1000)  
      },
      decrement: (state) => {
         state.value -= 1
      },
   },
})

export const { setExperTime, decrement } = counterSlice.actions

export const login = 
   (email: string, password: string, secretKey: string) => 
   async (dispatch: Dispatch) => {
      try{
         await setPersistence(auth, browserSessionPersistence)
         const user = await signInWithEmailAndPassword(auth, email, password)
         await checkSecretKey(secretKey, user.user.uid)
         await dispatch(setExperTime(user))
      }catch(e){
         auth.signOut()
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
