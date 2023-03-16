import { Dispatch } from "@reduxjs/toolkit"
import { FC, ReactNode, useEffect, useState } from "react"
import { Websites } from "~/components/Sections"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"

interface AccountsProps {
   children?: ReactNode
   dispatchFunction: (args?: any) => (dispatch: Dispatch) => Promise<void>
   prefix: string
   in_directory?: string
}
export const Accounts:FC<AccountsProps> = ({
   dispatchFunction,
   children,
   in_directory,
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
   },[dispatchFunction])

   return (
      <>
         { children }
         <Websites 
            accounts={accounts}
            prefix={prefix}
            in_directory={in_directory}
         />
      </>
   )
}