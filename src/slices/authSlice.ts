import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"
import StringCrypto from "string-crypto"
import { auth, db } from "~/firebase"
import checkSecretKey from "~/lib/checkSecretKey"
import { store } from "~/redux/store"

interface AuthState {
   expire_time: number
   start_time: number
   interval: ReturnType<typeof setInterval>
   timer: number
   time_left: {
      minutes: number,
      seconds: number
   },
   secret_key: string
   master_key: string
}

const initialState:AuthState = {
   expire_time: 0,
   start_time: 0,
   interval: setInterval(()=>{}),
   timer: 0,
   time_left: {
      minutes: 0,
      seconds: 0
   },
   secret_key: typeof window !== "undefined" && localStorage.getItem("secret_key") || "",
   master_key: ""
}

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setExperTime: (state) => {
         const lastSignInTime = new Date(auth.currentUser!.metadata.lastSignInTime!)
         
         state.expire_time = Math.floor(Number(lastSignInTime) + ((60 * 30)*1000))
      },
      incrementTimer: (state) => {
         state.timer = state.timer + 1
      },
      setKeys: (state, action: PayloadAction<{secret: string, secret_key: string}>) => {
         const { decryptString } = new StringCrypto()
         const { secret, secret_key } = action.payload

         state.master_key = decryptString(secret, secret_key) 
         state.secret_key = secret_key
      },
      startTimer: (state, action: PayloadAction<ReturnType<typeof setInterval>>) => {
         clearInterval(state.interval)
         state.interval = action.payload
      },
      setStartTime: (state) => {
         state.start_time = new Date().getTime()
      }
   },
})

export const { 
   setExperTime, 
   incrementTimer, 
   setKeys, 
   startTimer,
   setStartTime 
} = authSlice.actions

export const login = 
   (email: string, password: string) => 
   async () => {
      try{
         await setPersistence(auth, browserSessionPersistence)
         await signInWithEmailAndPassword(auth, email, password)
         
      }catch(e){
         auth.signOut()
         throw new Error(e as any)
      }
   }

export const logout = 
   () => async (dispatch: Dispatch, getState: typeof store.getState) => {

   }
   
export const getUser = 
   (secret_key: string) => async (dispatch: Dispatch) => {
      try{
         localStorage.setItem('secret_key', secret_key)
         const secret = await checkSecretKey(secret_key, auth.currentUser?.uid!)
         dispatch(setKeys({
            secret,
            secret_key
         }))
      }catch(e){
         auth.signOut()
         throw new Error(e as any)
      }
   }

export default authSlice.reducer
