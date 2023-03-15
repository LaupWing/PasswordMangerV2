import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { addDoc, collection, getDocs, setDoc } from "firebase/firestore"
import { AccountType, DirectoryType } from "types"
import { auth, db } from "~/firebase"
import { store } from "~/redux/store"

interface PasswordsState {
   accounts: AccountType[]
   directories: DirectoryType[]
}

const initialState:PasswordsState = {
   accounts: [],
   directories: []
}

export const passwordsSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setPasswords: (state, action: PayloadAction<AccountType[]>) => {
         state.accounts = action.payload
      },
      setDirectories: (state, action: PayloadAction<DirectoryType[]>) => {
         state.directories = action.payload
      }
   },
})

export const { setPasswords, setDirectories } = passwordsSlice.actions


export const fetchPasswords = 
   () => async (dispatch: Dispatch) => {
      const snapshot = await getDocs(collection(db, "accounts", auth.currentUser?.uid!, "collection"))
      
      if(!snapshot.empty){
         dispatch(setPasswords(snapshot.docs.map(x => ({...x.data(), id: x.id}) as AccountType)))
      }
   }

export const fetchDirectories = 
   () => async (dispatch: Dispatch) => {
      const snapshot = await getDocs(collection(db, "directories", auth.currentUser?.uid!, "collection"))
      
      if(!snapshot.empty){
         dispatch(setDirectories(snapshot.docs.map(x => ({...x.data(), id: x.id}) as DirectoryType)))
      }
   }
export const postDirectories = 
   (directories: DirectoryType[]) => async () => {
      const proxy = directories.map(async x => {
         const snapshot = await addDoc(collection(db, "directories", auth.currentUser?.uid!, "collection"), {
            name: x.name
         })
         return snapshot.id
      })
      const newDirectories = await Promise.all(proxy)
      console.log(newDirectories)
   }

export default passwordsSlice.reducer
