import type { IconType } from "react-icons"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { BsGridFill } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"

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

export const IconItems:IconType = (props) => {
   return (
      <BsGridFill {...props}/>
   )
} 

export const IconFavorite:IconType = (props) => {
   return (
      <AiFillStar {...props}/>
   )
} 