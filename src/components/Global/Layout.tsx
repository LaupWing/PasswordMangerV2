import { FC, PropsWithChildren, useEffect, useState } from "react"
import { Protected } from "./Protected"
import { Sidenav, Topnav } from "~/components/Global"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { auth } from "~/firebase"
import { fetchDirectories } from "~/slices/accountsSlice"
import { getUser, incrementTimer, setExperTime, startTimer } from "~/slices/authSlice"
import { useRouter } from "next/router"

export const Layout:FC<PropsWithChildren> = ({children}) => {
   const dispatch = useAppDispatch()
   const [loaded, setLoaded] = useState(false)
   const { secret_key } = useAppSelector(state => state.auth)
   const router = useRouter()

   useEffect(() => {
      (async () =>{
         try{
            if(auth.currentUser){
               await dispatch(getUser(secret_key))
               await dispatch(fetchDirectories())
               await dispatch(setExperTime())
               dispatch(startTimer(setInterval(() => {
                  dispatch(incrementTimer())
               }, 1000)))
               
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
         <div className="flex flex-col flex-1 w-screen lg:w-auto relative">
            <Topnav />
            {children}
         </div>
      </Protected>
   )
}
