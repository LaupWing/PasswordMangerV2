import type { FC, PropsWithChildren } from "react"
import { useEffect } from "react"
import { Protected } from "./Protected"
import Sidenav from "./Sidenav"
import Topnav from "./Topnav"

export const Layout:FC<PropsWithChildren> = ({children}) => {
   return (
      <Protected>
         <Sidenav />
         <div className="flex flex-col flex-1 w-screen lg:w-auto relative">
            <Topnav/>
            {children}
         </div>
      </Protected>
   )
}
