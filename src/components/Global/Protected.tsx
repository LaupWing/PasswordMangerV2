import { useRouter } from "next/router"
import { FC, PropsWithChildren } from "react"
import { auth } from "~/firebase"

export const Protected:FC<PropsWithChildren> = ({children}) => {
   const router = useRouter()

   if(!auth.currentUser){
      router.replace("/login")
      return null
   }
   return (
      <>
         {children}
      </>
   )
}
