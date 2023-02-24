import clsx from "clsx"
import { FC } from "react"
import { missingClass } from "~/lib/utils"

export const Image:FC<HTMLImageElement> = ({
   className = "",
   src
}) => {
   const logo = `https://logo.clearbit.com/${src}`

   const styles = clsx(
      missingClass(className, "w-") && "w-10",
      missingClass(className, "h-") && "h-10",
   )

   return (
      <img 
         className={"rounded-md mr-2 bg-white object-contain " + className}
         src={logo} 
         alt="Logo of website" 
      />
   )
}