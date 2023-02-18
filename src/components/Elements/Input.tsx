import { FC, InputHTMLAttributes } from "react"

const Input:FC<InputHTMLAttributes<HTMLInputElement>> = ({
   type = "text"
}) => {
   return (
      <div>Input</div>
   )
}
export default Input