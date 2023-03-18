import { useRouter } from "next/router"
import { FC, PropsWithChildren } from "react"
import { auth } from "~/firebase"
import { useAppSelector } from "~/redux/hooks"

export const Protected:FC<PropsWithChildren> = ({children}) => {
   const router = useRouter()
   const { show_sidenav, lg, nav_width } = useAppSelector(state => state.settings)
   
   if(!auth.currentUser){
      router.replace("/login")
      return null
   }
   return (
      <div 
         className="flex"
         style={{
            transform: `translateX(-${lg ? nav_width : '0'}px)`
         }}
      >
         {children}
      </div>
   )
}
