import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AccountType } from "types"
import { Layout } from "~/components/Global"
import { Detail, Websites } from "~/components/Sections"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { fetchPasswords } from "~/slices/accountsSlice"

const AccountDetail:NextPage = () => {
   const dispatch = useAppDispatch()
   const [loaded, setLoaded] = useState(false)
   const router = useRouter()
   const { accounts } = useAppSelector(state => state.accounts)

   useEffect(() => {
      (async () =>{
         if(auth.currentUser){
            await dispatch(fetchPasswords())
         }
         setLoaded(true)
      })()
   },[])

   if(!loaded){
      return null
   }
   const active = accounts.find(x => x.id === router.query.accountId)
   if(!active){
      router.replace("/")
      return null
   }
   return (
      <Layout>
         <Head>
            <title>All Passwords</title>
            <meta name="description" content="Generated by create next app" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <div className="flex flex-1 min-h-0 relative">
            <Websites accounts={accounts}/>
            <Detail account={active!}/>
         </div>
      </Layout>
   )
}
export default AccountDetail
