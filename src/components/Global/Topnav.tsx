import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { resetAccount } from "~/slices/accountsSlice"
import { incrementTimer, logout, resetAuth, startTimer } from "~/slices/authSlice"
import { toggleSidenav } from "~/slices/settings"
import { IconChevron, IconMenu } from "../Elements"
import { Backdrop } from "./Backdrop"

export const Topnav = () => {
   const { timer, expire_time, interval, start_time } = useAppSelector(state => state.auth)
   const router = useRouter()
   const dispatch = useAppDispatch()
   const current_time = Math.floor(start_time / 1000) + timer
   const time_left = Math.floor(expire_time/ 1000) - current_time
   const minutes = Math.floor(time_left /  60) 
   const seconds = (time_left - (Math.floor(time_left /60) * 60)) < 10 
      ? `0${time_left - (Math.floor(time_left /60) * 60)}`
      : time_left - (Math.floor(time_left /60) * 60)
   
   if((expire_time / 1000) < current_time){
      clearInterval(interval)
      auth.signOut()
      router.push("/login")
   }
   const [show_tooltip, setShowTooltip] = useState(false)

   useEffect(() => {
      if(auth.currentUser){
         dispatch(startTimer(setInterval(() => {
            dispatch(incrementTimer())

         }, 1000)))
         
      } 
   },[])
   return (
      <div className="bg-main-secondary text-sm py-1 px-3 border-b-2 border-black text-main-tertiare hover:text-white flex items-center justify-between uppercase font-bold tracking-wider z-50 duration-150">
         <div className="flex">
            <IconMenu 
               className="lg:hidden" 
               size={34} 
               onClick={() => dispatch(toggleSidenav())}
            />
         </div>
         <div className="flex lg:space-x-4 space-x-1">
            <p className="mr-2 flex">
               Time left: <span className="w-11 text-center ml-1">{minutes}:{seconds}</span>
            </p>
            <div className="relative">
               <h2 
                  className="flex space-x-1 items-center cursor-pointer"
                  onClick={()=> setShowTooltip(true)}
               >
                  Account
                  <IconChevron size={20}/>
               </h2>
               {show_tooltip && <Tooltip />}
            </div>
         </div>
         {show_tooltip && (
            <Backdrop 
               className="!bg-transparent z-[900]"
               onClick={() => setShowTooltip(false)}
            />
         )}
      </div>
   )
}

const Tooltip = () => {
   const dispatch = useAppDispatch()
   const router = useRouter()
   const _logout = async () => {
      await dispatch(logout())
      dispatch(resetAuth())
      dispatch(resetAccount())
      router.push("/login")
   }

   return (
      <ul className="bg-main-secondary border-2 border-black absolute bottom-0 right-0 transform translate-y-full z-[1000]">
         <li className="cursor-pointer hover:bg-blue-600 py-1 px-2 w-24 tracking-wider border-b-2 border-black">Help</li>
         <li className="cursor-pointer hover:bg-blue-600 py-1 px-2 w-24 tracking-wider border-b-2 border-black">Settings</li>
         <li 
            className="cursor-pointer hover:bg-blue-600 py-1 px-2 w-24 tracking-wider border-b-2 border-black"
            onClick={_logout}
         >Logout</li>
      </ul>
   )
}