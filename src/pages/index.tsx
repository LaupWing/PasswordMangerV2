import Head from "next/head"
import { useEffect, useState } from "react"
import { Layout } from "~/components/Global"
import { Websites } from "~/components/Sections"
import { auth } from "~/firebase"
import { useAppDispatch } from "~/redux/hooks"
import { fetchPasswords } from "~/slices/accountsSlice"
import { toast } from "react-hot-toast"
import { notify } from "~/components/Global/Notify"

export default function Home() {
   const dispatch = useAppDispatch()
   const [loaded, setLoaded] = useState(false)

   useEffect(() => {
      (async () =>{
         if(auth.currentUser){
            await dispatch(fetchPasswords())
         }
         setLoaded(true)
      })()
      notify("success", "Updatef", "Text is gupadeee")
   },[])

   if(!loaded){
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
         <Websites />
      </Layout>
   )
}