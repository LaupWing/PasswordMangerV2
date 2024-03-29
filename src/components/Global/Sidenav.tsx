import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, PropsWithChildren, useEffect, useRef } from "react"
import { IconStarFill, IconItems, IconFolder, IconFolderOpen } from "~/components/Elements"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { setNavWidth, toggleSidenav } from "~/slices/settings"

export const Sidenav = () => {
   const { directories } = useAppSelector(state => state.accounts)
   const ref = useRef<HTMLDivElement>(null)
   const router = useRouter()
   const dispatch = useAppDispatch()

   useEffect(()=>{
      dispatch(setNavWidth(ref.current!.offsetWidth))
   }, [])
   
   return (
      <div 
         ref={ref} 
         className="bg-main-secondary p-4 border-r-2 border-black"
      >
         <img 
            src="/assets/logo.png" 
            alt="logo" 
            className="w-20 mx-auto mb-6"
         />
         <ul className="text-white text-sm flex flex-col space-y-2">
            <SidenavLink 
               href="/"
               activeCheck="all"
            >
               <IconItems className="w-5 mr-1"/>
               Alle Items
            </SidenavLink>
            <SidenavLink 
               href="/favorites"
               activeCheck="favorites"
            >
               <IconStarFill className="w-5 mr-1"/>
               Favoriete
            </SidenavLink>
            <li className="p-1 mt-2 text-white text-opacity-30 uppercase tracking-widest font-bold">Mappen</li>
            {directories.map(directory => (
               <SidenavLink 
                  href={`/directories/${directory.id}`}
                  className="justify-between"
                  activeCheck={directory.id!}
                  key={directory.id}
               >
                  {directory.name}
                  {router.asPath === `/directories/${directory.id}` 
                     ? (
                        <IconFolderOpen size={20}/>
                     ): (
                        <IconFolder size={20}/>
                     )}
               </SidenavLink>
            ))}
         </ul>
      </div>
   )
}

interface SidenavLinkProps extends PropsWithChildren {
   href: string
   className?: string
   activeCheck: string
}

const SidenavLink:FC<SidenavLinkProps> = ({ children, href, className, activeCheck }) => {
   const router = useRouter()
   const baseStyles = "w-48 p-2 py-1 rounded-md flex items-center"
   const styles = clsx(
      baseStyles,
      router.pathname === href && "bg-blue-600",
      router.asPath.includes(activeCheck) && "bg-blue-600",
      className
   )
   const dispatch = useAppDispatch()
   const { md } = useAppSelector(state => state.settings)

   return (
      <Link
         className={styles}
         href={href}
         onClick={() => md && dispatch(toggleSidenav(false))}
      >
         { children }
      </Link>
   )
}