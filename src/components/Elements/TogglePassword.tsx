import { FC } from "react"
import { IconEye, IconEyeSlash } from "~/components/Elements"

interface TogglePasswordProps {
   show_password: boolean
   setShowPassword: (active: boolean) => void
}

export const TogglePassword:FC<TogglePasswordProps> = ({
   show_password,
   setShowPassword
}) => {
   const styles = "w-5 h-5 mx-1 cursor-pointer hover:text-blue-600"

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