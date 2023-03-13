import clsx from "clsx"
import { FC } from "react"
import { IconEye, IconEyeSlash } from "~/components/Elements"

interface TogglePasswordProps {
   show_password: boolean
   setShowPassword: (active: boolean) => void
   className?: string
}

export const TogglePassword:FC<TogglePasswordProps> = ({
   show_password,
   setShowPassword,
   className = ""
}) => {
   const styles = clsx("w-5 h-5 mx-1 cursor-pointer hover:text-blue-600", className)

   return (
      <div className="text-white">
         {show_password ? (
            <IconEyeSlash 
               className={styles}
               onClick={() => setShowPassword(false)}
            />
         ): (
            <IconEye 
               className={styles}
               onClick={() => setShowPassword(true)}
            />
         )}
      </div>
   )
}