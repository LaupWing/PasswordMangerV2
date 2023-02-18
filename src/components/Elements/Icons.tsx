import type { IconType } from "react-icons"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export const IconEye:IconType = (props) => {
   return (
      <FaEye {...props}/>
   )
} 

export const IconEyeSlash:IconType = (props) => {
   return (
      <FaEyeSlash {...props}/>
   )
} 