import Head from "next/head"
import { useEffect, useState } from "react"
import StringCrypto from "string-crypto"
import { AccountType } from "types"
import { Layout } from "~/components/Global"
import { Websites } from "~/components/Sections"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { fetchAccounts, fetchFavoriteAccounts } from "~/slices/accountsSlice"

export default function Favorites() {
   const dispatch = useAppDispatch()
   const [loaded, setLoaded] = useState(false)
   const { accounts } = useAppSelector(state => state.accounts)
   
   useEffect(() => {
      (async () =>{
         if(auth.currentUser){
            await dispatch(fetchFavoriteAccounts())
         }
         setLoaded(true)
      })()
   },[])

   if(!loaded){
      return null
   }

   return (
      <>
         <Head>
            <title>All Passwords</title>
            <meta name="description" content="Generated by create next app" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Websites 
            accounts={accounts}
            prefix="favorites"
         />
      </>
   )
}