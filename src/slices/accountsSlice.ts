import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
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
      setAccounts: (state, action: PayloadAction<AccountType[]>) => {
         state.accounts = action.payload
      },
      setDirectories: (state, action: PayloadAction<DirectoryType[]>) => {
         state.directories = action.payload
      },
      setFavorite: (state, action: PayloadAction<{id: string, is_favorite: boolean}>) => {
         state.accounts = state.accounts.map(x => 
            x.id === action.payload.id ? ({
               ...x,
               is_favorite: action.payload.is_favorite
            }) : ({...x}))
      },
      updateAccount: (state, action: PayloadAction<{id: string, updates: AccountType}>) => {
         state.accounts = state.accounts.map(x => 
            x.id === action.payload.id ? ({
               ...action.payload.updates
            }) : ({...x}))
      },
   },
})

export const { 
   setAccounts, 
   setDirectories, 
   setFavorite,
   updateAccount 
} = passwordsSlice.actions


export const fetchPasswords = 
   () => async (dispatch: Dispatch) => {
      const snapshot = await getDocs(collection(db, "accounts", auth.currentUser?.uid!, "collection"))
      
      if(!snapshot.empty){
         dispatch(setAccounts(
            snapshot.docs.map(x => ({...x.data(), id: x.id}) as AccountType)
         ))
      }
   }

export const fetchDirectories = 
   () => async (dispatch: Dispatch) => {
      const snapshot = await getDocs(collection(db, "directories", auth.currentUser?.uid!, "collection"))
      
      if(!snapshot.empty){
         dispatch(setDirectories(snapshot.docs.map(x => ({...x.data(), id: x.id}) as DirectoryType)))
      }
   }

export const patchAccount =
   (id: string, updates: AccountType) => async (dispatch: Dispatch) => {
      await updateDoc(doc(db, "accounts", auth.currentUser?.uid!, "collection", id), {
         ...updates
      })
      dispatch(updateAccount({id, updates}))
   }
   
export const createAccount =
   (account: AccountType) => async (dispatch: Dispatch) => {
      const new_doc = await addDoc(collection(db, "accounts", auth.currentUser?.uid!, "collection"), {
         ...account
      })
      new_doc.id
      // dispatch(updateAccount({id, updates}))
   }
   

export const toggleFavorite = 
   (id: string, is_favorite: boolean) => async (dispatch: Dispatch) => {
      await updateDoc(doc(db, "accounts", auth.currentUser?.uid!, "collection", id), {
         is_favorite
      })
      dispatch(setFavorite({
         id,
         is_favorite
      }))
   }

export const postDirectories = 
   (directories: DirectoryType[]) => async () => {
      const proxy = directories.map(async x => {
         const snapshot = await addDoc(collection(db, "directories", auth.currentUser?.uid!, "collection"), {
            name: x.name
         })
         return snapshot.id
      })
      const new_directories = await Promise.all(proxy)
      
      return new_directories
   }

export default passwordsSlice.reducer
