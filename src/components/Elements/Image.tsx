import { FC } from "react"

export const Image:FC<HTMLImageElement> = ({
   className = "",
   src
}) => {
   const logo = `https://logo.clearbit.com/${src}`

   return (
      <img 
         className={"rounded-md mr-2 bg-white object-contain " + className}
         src={logo} 
         alt="Logo of website" 
      />
   )
}