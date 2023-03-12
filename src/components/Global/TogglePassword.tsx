import { Dispatch, FC, SetStateAction } from "react"
import { IconEye, IconEyeSlash } from "~/components/Elements"

interface TogglePasswordProps {
   showPassword: boolean
   setShowPassword: Dispatch<SetStateAction<boolean>>
}

export const TogglePassword:FC<TogglePasswordProps> = ({
   showPassword,
   setShowPassword
}) => {
   return (
      <div className="text-white">
         {showPassword ? (
            <IconEye
               className="w-5 h-5 mx-1 cursor-pointer hover:text-blue-600"
               onClick={() => setShowPassword(true)}
            />
         ) : (
            <IconEyeSlash 
               className="w-5 h-5 mx-1 cursor-pointer hover:text-blue-600"
               onClick={() => setShowPassword(false)}
            />
         )}
      </div>
   )
}