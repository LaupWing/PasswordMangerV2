import { FC, InputHTMLAttributes } from "react"

export const Input:FC<InputHTMLAttributes<HTMLInputElement>> = ({
   type = "text",
   onChange,
   className = "",
   ...props
}) => {
   return (
      <input 
         type={type}
         className={"bg-main-tertiare text-white rounded py-1.5 px-2 focus:outline-none focus:ring-2 focus:ring-blue-600 " + className}
         onChange={onChange}
         {...props}
      />
   )
}