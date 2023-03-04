import { FC, PropsWithChildren } from "react"
import { useAppSelector } from "~/redux/hooks"

export const Protected:FC<PropsWithChildren> = ({children}) => {
   const {time_left} = useAppSelector(state => state.auth)
   
   console.log(time_left)
   return (
      <>
         {children}
      </>
   )
}
