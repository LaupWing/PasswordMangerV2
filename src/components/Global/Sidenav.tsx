import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, PropsWithChildren } from "react"
import { IconStarFill, IconItems, IconDirectory } from "~/components/Elements"
import { useAppSelector } from "~/redux/hooks"

export const Sidenav = () => {
   const { directories } = useAppSelector(state => state.accounts)
   
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
            <li className="p-1 mt-2 text-white text-opacity-30 uppercase tracking-widest font-bold">Mappen</li>
            {directories.map(directory => (
               <SidenavLink 
                  href={`directory/${directory.id}`}
                  className="justify-between"
                  key={directory.id}
               >
                  {directory.name}

                  <IconDirectory size={20}/>
               </SidenavLink>
            ))}
         </ul>
      </div>
   )
}

interface SidenavLinkProps extends PropsWithChildren {
   href: string
   className?: string
}

const SidenavLink:FC<SidenavLinkProps> = ({ children, href, className }) => {
   const router = useRouter()
   const baseStyles = "w-48 p-2 py-1 rounded-md flex items-center"
   const styles = clsx(
      baseStyles,
      router.pathname === href && "bg-blue-600",
      href === "/" && router.asPath.includes("all") && "bg-blue-600",
      className
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