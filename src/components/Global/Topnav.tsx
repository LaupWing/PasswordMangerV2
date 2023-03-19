import { useRouter } from "next/router"
import { memo, useEffect, useState } from "react"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { resetAccount } from "~/slices/accountsSlice"
import { incrementTimer, logout, resetAuth, startTimer } from "~/slices/authSlice"
import { toggleSidenav } from "~/slices/settings"
import { IconChevron, IconMenu } from "../Elements"
import { Backdrop } from "./Backdrop"

export const Topnav = memo(() => {
   const { accounts, directories } = useAppSelector(state => state.accounts)
   const [current_path, setCurrentPath] = useState("")
   const router = useRouter()
   const dispatch = useAppDispatch()

   const [show_tooltip, setShowTooltip] = useState(false)
   
   useEffect(() => {
      if(Object.keys(router.query).length === 0){
         if(router.asPath === "/ "){
            setCurrentPath("all")
         }
         if(router.asPath.includes("favorites")){
            setCurrentPath("favorites")
         }
      }
      else if(router.asPath.includes("all")){
         const name = accounts.find(x => x.id! === router.query.accountId)?.name!
         setCurrentPath(`all / ${name}`)
      }
      else if(router.asPath.includes("directories")){
         if(router.query.accountId){
            const directory_name = directories.find(x => x.id! === router.query.directoryId)?.name!
            const account_name = accounts.find(x => x.id! === router.query.accountId)?.name! 
            setCurrentPath(`map / ${directory_name} / ${account_name}`)

         }else {
            const name = directories.find(x => x.id! === router.query.directoryId)?.name!
            setCurrentPath(`map / ${name}`)
         }
      }

   }, [router.asPath])

   return (
      <div className="bg-main-secondary text-sm py-1 px-3 border-b-2 border-black text-main-tertiare hover:text-white flex items-center justify-between uppercase font-bold tracking-wider z-50 duration-150">
         <div className="flex">
            <IconMenu 
               className="lg:hidden" 
               size={34} 
               onClick={() => dispatch(toggleSidenav())}
            />
            {current_path}
         </div>
         <div className="flex lg:space-x-4 space-x-1">
            <TimesLeft />
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
})

const TimesLeft = () => {
   const dispatch = useAppDispatch()
   const { timer, expire_time, interval, start_time } = useAppSelector(state => state.auth)
   const current_time = Math.floor(start_time / 1000) + timer
   const time_left = Math.floor(expire_time/ 1000) - current_time
   const minutes = Math.floor(time_left /  60) 
   const router = useRouter()
   const seconds = (time_left - (Math.floor(time_left /60) * 60)) < 10 
      ? `0${time_left - (Math.floor(time_left /60) * 60)}`
      : time_left - (Math.floor(time_left /60) * 60)
   
   if((expire_time / 1000) < current_time){
      clearInterval(interval)
      auth.signOut()
      router.push("/login")
   }

   useEffect(() => {
      if(auth.currentUser){
         dispatch(startTimer(setInterval(() => {
            dispatch(incrementTimer())

         }, 1000)))
         
      } 
   },[])

   return (
      <p className="mr-2 flex">
         Time left: <span className="w-11 text-center ml-1">{minutes}:{seconds}</span>
      </p>
   )
}

const Tooltip = () => {
   const dispatch = useAppDispatch()
   const router = useRouter()
   const _logout = async () => {
      await dispatch(logout())
      router.push("/login")
      dispatch(resetAuth())
      dispatch(resetAccount())
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