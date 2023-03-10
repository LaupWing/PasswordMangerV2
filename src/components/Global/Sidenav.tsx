import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, PropsWithChildren } from "react"
import { IconStarFill, IconItems } from "~/components/Elements"

const Sidenav = () => {
   return (
      <div className="bg-main-secondary p-4 border-r-2 border-black">
         <img 
            src="/assets/logo.png" 
            alt="logo" 
            className="w-20 mx-auto mb-6"
         />
         <ul className="text-white text-sm flex flex-col space-y-2">
            <SidenavLink href="/">
               <IconItems className="w-5 mr-1"/>
               Alle Items
            </SidenavLink>
            <SidenavLink href="/favorites">
               <IconStarFill className="w-5 mr-1"/>
               Favoriete
            </SidenavLink>
         </ul>
      </div>
   )
}
export default Sidenav

interface SidenavLinkProps extends PropsWithChildren {
   href: string
}

const SidenavLink:FC<SidenavLinkProps> = ({ children, href }) => {
   const router = useRouter()
   const baseStyles = "w-48 p-2 py-1 rounded-md flex items-center"
   const styles = clsx(
      baseStyles,
      router.pathname === href && "bg-blue-600",
      href === "/" && router.asPath.includes("all") && "bg-blue-600"
   )

   return (
      <Link
         className={styles}
         href={href}
      >
         { children }
      </Link>
   )
}