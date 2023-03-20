import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
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
      resetAccount: (state) => {
         state.accounts = []
         state.directories = []
      },
      setAccounts: (state, action: PayloadAction<AccountType[]>) => {
         state.accounts = action.payload
      },
      setDirectories: (state, action: PayloadAction<DirectoryType[]>) => {
         state.directories = action.payload
      },
      removeDirectory: (state, action: PayloadAction<string>) => {
         state.directories = state.directories.filter(x => x.id! !== action.payload)
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
               ...action.payload.updates,
               id: action.payload.id
            }) : ({...x}))
      },
      addAccount: (state, action: PayloadAction<AccountType>) => {
         state.accounts = [...state.accounts, {
            ...action.payload
         }]
      },
   },
})

export const { 
   setAccounts, 
   setDirectories, 
   setFavorite,
   addAccount,
   updateAccount,
   resetAccount,
   removeDirectory
} = passwordsSlice.actions


export const fetchAccounts = 
   () => async (dispatch: Dispatch) => {
      const snapshot = await getDocs(collection(db, "accounts", auth.currentUser?.uid!, "collection"))
      
      if(!snapshot.empty){
         dispatch(setAccounts(
            snapshot.docs.map(x => ({...x.data(), id: x.id}) as AccountType)
         ))
      }
   }

export const fetchFavoriteAccounts = 
   () => async (dispatch: Dispatch) => {
      const accounts_ref = collection(db, "accounts", auth.currentUser?.uid!, "collection")
      const q = query(accounts_ref, where("is_favorite", "==", true))
      const snapshot = await getDocs(q)
      console.log(snapshot)
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
         ...updates,
      })
      dispatch(updateAccount({id, updates}))
   }
   
export const createAccount =
   (account: AccountType) => async (dispatch: Dispatch) => {
      const new_doc = await addDoc(collection(db, "accounts", auth.currentUser?.uid!, "collection"), {
         ...account
      })
      dispatch(addAccount({
         ...account,
         id: new_doc.id
      }))
      return new_doc.id
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

export const removeFromDirectory = 
   (id: string, account_id: string) => async (dispatch: Dispatch) => {
      await deleteDoc(doc(
         db, 
         "directories", 
         auth.currentUser?.uid!, 
         "collection", 
         id,
         "accounts",
         account_id
      ))
   }

export const deleteDirectory = 
   (id: string) => async (dispatch: Dispatch) => {
      const snapshot = await getDocs(collection(
         db, 
         "directories", 
         auth.currentUser?.uid!, 
         "collection", 
         id,
         "accounts"
      ))
      const accounts_to_update = snapshot.docs
         .map(x => x.id)
         .map(async x => {
            const account_snapshot = await getDoc(doc(
               db, 
               "accounts", 
               auth.currentUser?.uid!, 
               "collection",
               x
            ))
            const account = account_snapshot.data() as AccountType
            await updateDoc(doc(
               db,
               "accounts", 
               auth.currentUser?.uid!, 
               "collection",
               x
            ), {
               directories: account.directories.filter(x => x !== id)
            })
            await deleteDoc(doc(
               db, 
               "directories", 
               auth.currentUser?.uid!, 
               "collection", 
               id,
               "accounts",
               x
            ))
         })
      await Promise.all(accounts_to_update)
      await deleteDoc(doc(
         db, 
         "directories", 
         auth.currentUser?.uid!, 
         "collection", 
         id
      ))
      dispatch(removeDirectory(id))
   }

export const addToDirectory = 
   (id: string, account_id: string) => async () => {
      await setDoc(doc(
         db, 
         "directories", 
         auth.currentUser?.uid!, 
         "collection", 
         id,
         "accounts",
         account_id
      ), {
         id: account_id
      })
   }

export const getDirectoryAccounts = 
   (id: string) => async (dispatch: Dispatch) => {
      try{
         const snapshot = await getDocs(collection(
            db, 
            "directories", 
            auth.currentUser?.uid!, 
            "collection", 
            id,
            "accounts"
         ))
         const accounts = (await Promise.all(snapshot.docs
            .map(x => x.id)
            .map(x => getDoc(doc(
               db, 
               "accounts",
               auth.currentUser?.uid!,
               "collection",
               x 
            )))
         )).map(x => ({
            ...x.data(),
            id: x.id
         }))
         
         dispatch(setAccounts(accounts as AccountType[]))
      }catch(e){
         throw new Error(e as any)
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
      const new_directories = await Promise.all(proxy)
      
      return new_directories
   }

export default passwordsSlice.reducer
