import { Dispatch } from "@reduxjs/toolkit"
import { useRouter } from "next/router"
import { FC, ReactNode, useEffect, useState } from "react"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { Detail, Websites } from "~/components/Sections"
import { IconLoading } from "../Elements"

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
   const [deleting, setDeleting] = useState(false)
   const router = useRouter()
   const { accounts } = useAppSelector(state => state.accounts)
   useEffect(() => {
      (async () =>{
         if(auth.currentUser){
            await dispatch(dispatchFunction())
         }
         setLoaded(true)
      })()
   },[])

   if(!loaded && accounts.length === 0){
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
            {deleting && <div className="absolute inset-0 flex items-center justify-center bg-main-primary/90">
               <IconLoading 
                  height={100} 
                  width={100}
               />
            </div>}
            <Websites 
               className="hidden md:flex"
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