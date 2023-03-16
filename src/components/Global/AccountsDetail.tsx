import { Dispatch } from "@reduxjs/toolkit"
import { useRouter } from "next/router"
import { FC, ReactNode, useEffect, useState } from "react"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"

interface AccountsDetailProps {
   children?: ReactNode
   dispatchFunction: (args?: any) => (dispatch: Dispatch) => Promise<void>
}

export const AccountsDetail:FC<AccountsDetailProps> = ({
   dispatchFunction
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
      <div>DetailsPage</div>
   )
}