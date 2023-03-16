import { Dispatch } from "@reduxjs/toolkit"
import { FC, ReactNode, useEffect, useState } from "react"
import { Websites } from "~/components/Sections"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"

interface AccountsProps {
   children?: ReactNode
   dispatchFunction: (args?: any) => (dispatch: Dispatch) => Promise<void>
   prefix: string
}
export const Accounts:FC<AccountsProps> = ({
   dispatchFunction,
   children,
   prefix
}) => {
   const dispatch = useAppDispatch()
   const { accounts } = useAppSelector(state => state.accounts)
   
   useEffect(() => {
      (async () =>{
         if(auth.currentUser){
            await dispatch(dispatchFunction())
         }
      })()
   },[])

   return (
      <>
         { children }
         <Websites 
            accounts={accounts}
            prefix={prefix}
         />
      </>
   )
}