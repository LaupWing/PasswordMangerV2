import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, PropsWithChildren } from "react"

interface SidenavLinkProps extends PropsWithChildren {
   href: string
}

export const SidenavLink:FC<SidenavLinkProps> = ({ children, href }) => {
   const router = useRouter()
   const baseStyles = "w-48 p-2 py-1 rounded-md flex items-center"
   const styles = clsx(
      baseStyles,
      router.pathname === href && "bg-blue-600"
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