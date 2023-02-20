import Head from "next/head"
import { Inter } from "@next/font/google"
import Sidenav from "~/components/Global/Sidenav"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { startTimer } from "~/slices/authSlice"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
   const dispatch = useAppDispatch()
   const {timer} = useAppSelector(state => state.auth)
   useEffect(() =>{
      dispatch(startTimer())
   },[])
   return (
      <>
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
        {timer}
      </>
   )
}
