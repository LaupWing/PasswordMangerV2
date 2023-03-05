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
   },
   secret_key: string
}

const initialState:AuthState = {
   expire_time: 0,
   interval: 0,
   timer: 0,
   time_left: {
      minutes: 0,
      seconds: 0
   },
   secret_key: localStorage.getItem("secret_key") || ""
}

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setExperTime: (state, action: PayloadAction<UserCredential>) => {
         const lastSignInTime = new Date(action.payload.user.metadata.lastSignInTime!)
         
         state.expire_time = Math.floor(Number(lastSignInTime) + ((60 * 30)*1000))  
      },
      incrementTimer: (state) => {
         state.timer = state.timer + 1
         const timeLeft = state.expire_time - state.timer

         const minutes = Math.floor(timeLeft / 60)
         const seconds = Math.floor(timeLeft - minutes * 60)
         state.time_left = {
            minutes,
            seconds
         }
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
         localStorage.setItem('secret_key', secretKey)
         dispatch(setExperTime(user))
         // dispatch(incrementTimer())
      }catch(e){
         auth.signOut()
         throw new Error(e as any)
      }
   }

export const logout = 
   () => async (dispatch: Dispatch, getState: typeof store.getState) => {

   }
   
export const getUser = 
   () => async (dispatch: Dispatch, getState: typeof store.getState) => {

   }

export default authSlice.reducer
