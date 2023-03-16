import { Dispatch } from "@reduxjs/toolkit"
import { useRouter } from "next/router"
import { FC, ReactNode, useEffect, useState } from "react"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { Detail, Websites } from "~/components/Sections"

interface AccountsDetailProps {
   children?: ReactNode
   dispatchFunction: (args?: any) => (dispatch: Dispatch) => Promise<void>
   prefix: string
}

export const AccountsDetail:FC<AccountsDetailProps> = ({
   dispatchFunction,
   children,
   prefix
}) => {
   const dispatch = useAppDispatch()
   const [loaded, setLoaded] = useState(false)
   const router = useRouter()
   const { accounts } = useAppSelector(state => state.accounts)
   useEffect(() => {
      (async () =>{
         if(auth.currentUser && !loaded){
            await dispatch(dispatchFunction())
         }
         setLoaded(true)
      })()
   },[])

   if(!loaded){
      return null
   }
   const active = accounts.find(x => x.id === router.query.accountId)
   if(!active){
      router.replace("/")
      return null
   }
   return (
      <>
         { children }
         <div className="flex flex-1 min-h-0 relative">
            <Websites 
               accounts={accounts} 
               prefix={prefix}
            />
            <Detail 
               account={active!}
            />
         </div>
      </>
   )
}