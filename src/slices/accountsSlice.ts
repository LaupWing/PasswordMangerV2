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
      setPasswords: (state, action: PayloadAction<AccountType[]>) => {
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
         console.log(state.accounts)
      }
   },
})

export const { setPasswords, setDirectories, setFavorite } = passwordsSlice.actions


export const fetchPasswords = 
   () => async (dispatch: Dispatch) => {
      const snapshot = await getDocs(collection(db, "accounts", auth.currentUser?.uid!, "collection"))
      
      if(!snapshot.empty){
         dispatch(setPasswords(
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
   

export const toggleFavorite = 
   (id: string, is_favorite: boolean) => async (dispatch: Dispatch) => {
      console.log(id)
      console.log(is_favorite)
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
