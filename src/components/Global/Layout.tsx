import { FC, PropsWithChildren, useEffect, useState } from "react"
import { Protected } from "./Protected"
import { Sidenav, Topnav } from "~/components/Global"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { auth } from "~/firebase"
import { fetchDirectories } from "~/slices/accountsSlice"
import { getUser, setExperTime } from "~/slices/authSlice"
import { useRouter } from "next/router"
import { toggleSidenav, watchResize } from "~/slices/settings"

export const Layout:FC<PropsWithChildren> = ({children}) => {
   const dispatch = useAppDispatch()
   const [loaded, setLoaded] = useState(false)
   const { secret_key } = useAppSelector(state => state.auth)
   const { show_sidenav } = useAppSelector(state => state.settings)
   const router = useRouter()

   useEffect(() => {
      (async () =>{
         try{
            if(auth.currentUser){
               await dispatch(getUser(secret_key))
               await dispatch(fetchDirectories())
               dispatch(setExperTime())
               dispatch(watchResize())
               window.addEventListener("resize", () => {
                  dispatch(watchResize())
               })
            }
         }catch{
            router.replace("/login")
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
         <div className="flex flex-col flex-1 w-screen lg:w-auto relative translate">
            {show_sidenav && (
               <div 
                  className="absolute inset-0 z-50" 
                  onClick={() => dispatch(toggleSidenav(false))}
               />
            )}
            <Topnav />
            {children}
         </div>
      </Protected>
   )
}
