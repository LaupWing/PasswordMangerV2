import type { FC, PropsWithChildren } from "react"
import { Protected } from "./Protected"
import { Sidenav, Topnav } from "~/components/Global"

export const Layout:FC<PropsWithChildren> = ({children}) => {
   return (
      <Protected>
         <Sidenav />
         <div className="flex flex-col flex-1 w-screen lg:w-auto relative">
            <Topnav />
            {children}
         </div>
      </Protected>
   )
}
