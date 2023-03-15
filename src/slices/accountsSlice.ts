import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"
import { AccountType } from "types"
import { auth, db } from "~/firebase"
import { store } from "~/redux/store"

interface PasswordsState {
   accounts: AccountType[]
}

const initialState:PasswordsState = {
   accounts: []
}

export const passwordsSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setPasswords: (state, action: PayloadAction<any>) => {
         state.accounts = action.payload
      },
   },
})

export const { setPasswords } = passwordsSlice.actions


export const fetchPasswords = 
   () => async (dispatch: Dispatch, getState: typeof store.getState) => {
      const snapshot = await getDocs(collection(db, "accounts", auth.currentUser?.uid!, "collection"))
      
      if(!snapshot.empty){
         dispatch(setPasswords(snapshot.docs.map(x => ({...x.data(), id: x.id}))))
      }
   }

export const fetchDirectories = 
   () => async (dispatch: Dispatch, getState: typeof store.getState) => {
      const snapshot = await getDocs(collection(db, "directories", auth.currentUser?.uid!, "collection"))
      
      if(!snapshot.empty){
         console.log(snapshot)
      }
   }

export default passwordsSlice.reducer
