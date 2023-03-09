import type { FC, PropsWithChildren } from "react"
import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Protected } from "./Protected"
import Sidenav from "./Sidenav"
import Topnav from "./Topnav"

export const Layout:FC<PropsWithChildren> = ({children}) => {
   useEffect(() => {
      setTimeout(() =>{
         toast(
            <div className="bg-red-500">

            </div>
         )
      }, 4000)
   }, [])
   return (
      <Protected>
         <Toaster
            toastOptions={{
               className: "bg-red-500",
            }}
         />
         <Sidenav />
         <div className="flex flex-col flex-1 w-screen lg:w-auto relative">
            <Topnav/>
            {children}
         </div>
      </Protected>
   )
}
