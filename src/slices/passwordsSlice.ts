import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, UserCredential } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore"
import { auth, db } from "~/firebase"
import { store } from "~/redux/store"

interface AuthState {
   passwords: any
}

const initialState:AuthState = {
   passwords: []
}

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setExperTime: (state, action: PayloadAction<any>) => {
      },
   },
})

export const { setExperTime } = authSlice.actions


export const fetchPasswords = 
   () => async (dispatch: Dispatch, getState: typeof store.getState) => {
      const snapshot = await getDocs(collection(db, "accounts", auth.currentUser?.uid!, "collection"))
      if(!snapshot.empty){
         console.log(snapshot.docs.map(x => x.data()))
      }
   }

export default authSlice.reducer
