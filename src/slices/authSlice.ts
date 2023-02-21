import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { auth } from "~/firebase"
import checkSecretKey from "~/lib/checkSecretKey"
import { store } from "~/redux/store"

interface AuthState {
   expire_time: number
   interval: number
   timer: number
   time_left: {
      minutes: number,
      seconds: number
   }
}

const initialState:AuthState = {
   expire_time: 0,
   interval: 0,
   timer: 0,
   time_left: {
      minutes: 0,
      seconds: 0
   }
}

export const authSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      setExperTime: (state, action: PayloadAction<UserCredential>) => {
         const lastSignInTime = action.payload.user.metadata.lastSignInTime
         state.expire_time =  Math.floor(Number(lastSignInTime) + ((60 * 30)*1000))  
      },
      incrementTimer: (state) => {
         state.timer = state.timer + 1
         const timeLeft = state.expire_time - state.timer
         console.log(state.timer)
         // const minutes = Math.floor(timeLeft / 60)
         // const seconds = Math.floor(timeLeft - minutes * 60)
         // state.time_left = {
         //    minutes,
         //    seconds
         // }
      },
   },
})

export const { setExperTime, incrementTimer } = authSlice.actions

export const login = 
   (email: string, password: string, secretKey: string) => 
   async (dispatch: Dispatch) => {
      try{
         await setPersistence(auth, browserSessionPersistence)
         const user = await signInWithEmailAndPassword(auth, email, password)
         await checkSecretKey(secretKey, user.user.uid)

         dispatch(setExperTime(user))
         // dispatch(startTimer())
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

export default authSlice.reducer
