import { FC, InputHTMLAttributes } from "react"

export const Input:FC<InputHTMLAttributes<HTMLInputElement>> = ({
   type = "text"
}) => {
   return (
      <div>Input</div>
   )
}