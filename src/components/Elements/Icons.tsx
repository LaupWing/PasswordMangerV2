import type { IconType } from "react-icons"
import type { FC } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { BsCheck, BsGridFill, BsSearch } from "react-icons/bs"
import { BiTrash } from "react-icons/bi"
import { MdOutlineEdit } from "react-icons/md"
import { IoClose } from "react-icons/io5"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { GoFileDirectory } from "react-icons/go"
import { FiChevronDown } from "react-icons/fi"
import { HiOutlineDuplicate, HiOutlineExternalLink, HiUsers } from "react-icons/hi"
import { ColorRing } from "react-loader-spinner"

export const IconClose:IconType = (props) => {
   return (
      <IoClose {...props}/>
   )
} 

export const IconEye:IconType = (props) => {
   return (
      <FaEye {...props}/>
   )
} 

export const IconChevron:IconType = (props) => {
   return (
      <FiChevronDown {...props}/>
   )
} 

export const IconEdit:IconType = (props) => {
   return (
      <MdOutlineEdit {...props}/>
   )
} 

export const IconStarFill:IconType = (props) => {
   return (
      <AiFillStar {...props}/>
   )
} 

export const IconStarOutline:IconType = (props) => {
   return (
      <AiOutlineStar {...props}/>
   )
} 

export const IconDuplicate:IconType = (props) => {
   return (
      <HiOutlineDuplicate {...props}/>
   )
} 

export const IconLink:IconType = (props) => {
   return (
      <HiOutlineExternalLink {...props}/>
   )
} 

export const IconTrashcan:IconType = (props) => {
   return (
      <BiTrash {...props}/>
   )
} 

export const IconDirectory:IconType = (props) => {
   return (
      <GoFileDirectory {...props}/>
   )
} 

export const IconEyeSlash:IconType = (props) => {
   return (
      <FaEyeSlash {...props}/>
   )
} 

export const IconSearch:IconType = (props) => {
   return (
      <BsSearch {...props}/>
   )
} 

export const IconItems:IconType = (props) => {
   return (
      <BsGridFill {...props}/>
   )
}  

export const IconCheckmark:IconType = (props) => {
   return (
      <BsCheck {...props}/>
   )
}  

export const IconUsers:IconType = (props) => {
   return (
      <HiUsers {...props}/>
   )
} 

interface IconLoadingProps {
   width: number
   height: number
}

export const IconLoading:FC<IconLoadingProps> = ({
   width,
   height
}) => {
   return (
      <ColorRing
         visible={true}
         height={height}
         width={width}
         ariaLabel="blocks-loading"
         wrapperStyle={{}}
         wrapperClass="blocks-wrapper"
         colors={["#ffc107", "#1e1e1e", "#455a64", "#404040", "#2563eb"]}
      />
   )
} 