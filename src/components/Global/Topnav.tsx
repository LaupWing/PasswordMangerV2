import { useRouter } from "next/router"
import { useEffect } from "react"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { incrementTimer, startTimer } from "~/slices/authSlice"

export const Topnav = () => {
   const { timer, expire_time, interval, start_time } = useAppSelector(state => state.auth)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const time_left = start_time + timer
   
   if(expire_time < time_left){
      clearInterval(interval)
      auth.signOut()
      router.push("/login")
      console.log("logout")
   }
   useEffect(() => {
      if(auth.currentUser){
         dispatch(startTimer(setInterval(() => {
            dispatch(incrementTimer())

         }, 1000)))
         
      } 
   },[])
   return (
      <div className="bg-main-secondary text-sm py-1 px-3 border-b-2 border-black text-main-tertiare flex items-center justify-between uppercase font-bold tracking-wider z-50">
         TopNav
      </div>
   )
}