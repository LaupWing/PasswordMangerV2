import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"
import StringCrypto from "string-crypto"
import { auth, db } from "~/firebase"
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
   secret_key: typeof window !== "undefined" && localStorage.getItem("secret_key") || ""
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
      setKeys: (state, action: PayloadAction<{secret: string, secret_key: string}>) => {
         const { decryptString } = new StringCrypto()
         const { secret, secret_key } = action.payload
         console.log(decryptString(secret, secret_key))
      }
   },
})

export const { setExperTime, incrementTimer, setKeys } = authSlice.actions

export const login = 
   (email: string, password: string, secret_key: string) => 
   async (dispatch: Dispatch) => {
      try{
         await setPersistence(auth, browserSessionPersistence)
         const user = await signInWithEmailAndPassword(auth, email, password)
         const secret = await checkSecretKey(secret_key, user.user.uid)
         localStorage.setItem('secret_key', secret_key)
         dispatch(setExperTime(user))
         dispatch(setKeys({
            secret,
            secret_key
         }))
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
