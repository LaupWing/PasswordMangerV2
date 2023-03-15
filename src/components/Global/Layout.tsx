import { FC, PropsWithChildren, useEffect, useState } from "react"
import { Protected } from "./Protected"
import { Sidenav, Topnav } from "~/components/Global"
import { useAppDispatch } from "~/redux/hooks"
import { auth } from "~/firebase"
import { fetchDirectories } from "~/slices/accountsSlice"

export const Layout:FC<PropsWithChildren> = ({children}) => {
   const dispatch = useAppDispatch()
   const [loaded, setLoaded] = useState(false)

   useEffect(() => {
      (async () =>{
         if(auth.currentUser){
            await dispatch(fetchDirectories())
         }
         setLoaded(true)
      })()
   },[])

   if(!loaded){
      return null
   }
   return (
      <Protected>
         <Sidenav />
         <div className="flex flex-col flex-1 w-screen lg:w-auto relative">
            <Topnav />
            {children}
         </div>
      </Protected>
   )
}
