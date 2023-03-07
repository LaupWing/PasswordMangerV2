import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"
import { auth, db } from "~/firebase"
import { store } from "~/redux/store"

interface PasswordsState {
   passwords: any
}

const initialState:PasswordsState = {
   passwords: []
}

export const passwordsSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setPasswords: (state, action: PayloadAction<any>) => {
         state.passwords = action.payload
      },
   },
})

export const { setPasswords } = passwordsSlice.actions


export const fetchPasswords = 
   () => async (dispatch: Dispatch, getState: typeof store.getState) => {
      const snapshot = await getDocs(collection(db, "accounts", auth.currentUser?.uid!, "collection"))
      console.log(snapshot)
      if(!snapshot.empty){
         dispatch(setPasswords(snapshot.docs.map(x => x.data())))
      }
   }

export default passwordsSlice.reducer
