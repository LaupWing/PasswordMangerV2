import { useRouter } from "next/router"
import { useEffect } from "react"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { incrementTimer, startTimer } from "~/slices/authSlice"

export const Topnav = () => {
   const { timer, expire_time, interval, start_time } = useAppSelector(state => state.auth)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const current_time = Math.floor(start_time / 1000) + timer
   const time_left = Math.floor(expire_time/ 1000) - current_time
   const minutes = Math.floor(time_left /  60) 
   const seconds = time_left - (Math.floor(time_left /60) * 60)
   console.log(expire_time)
   console.log(current_time)
   
   if((expire_time / 1000) < current_time){
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