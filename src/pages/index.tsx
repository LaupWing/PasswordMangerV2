import Head from "next/head"
import { useEffect, useState } from "react"
import { Protected } from "~/components/Global/Protected"
import Sidenav from "~/components/Global/Sidenav"
import Topnav from "~/components/Global/Topnav"
import { Websites } from "~/components/Sections"
import { auth } from "~/firebase"
import { useAppDispatch } from "~/redux/hooks"
import { fetchPasswords } from "~/slices/passwordsSlice"

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
   },[])

   if(!loaded){
      return null
   }

   return (
      <Protected>
         <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Sidenav />
         <div className="flex flex-col flex-1 w-screen lg:w-auto relative">
            <Topnav/>
            <Websites />
         </div>
      </Protected>
   )
}