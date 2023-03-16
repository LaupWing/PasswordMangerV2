import { Dispatch } from "@reduxjs/toolkit"
import { FC, ReactNode, useEffect, useState } from "react"
import { Websites } from "~/components/Sections"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"

interface AccountsProps {
   children?: ReactNode
   dispatchFunction: (args?: any) => (dispatch: Dispatch) => Promise<void>
}
export const Accounts:FC<AccountsProps> = ({
   dispatchFunction,
   children
}) => {
   const dispatch = useAppDispatch()
   const [loaded, setLoaded] = useState(false)
   const { accounts } = useAppSelector(state => state.accounts)
   
   useEffect(() => {
      (async () =>{
         if(auth.currentUser){
            await dispatch(dispatchFunction())
         }
         setLoaded(true)
      })()
   },[])

   if(!loaded){
      return null
   }

   return (
      <>
         { children }
         <Websites 
            accounts={accounts}
            prefix="all"
         />
      </>
   )
}