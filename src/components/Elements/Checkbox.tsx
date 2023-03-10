import clsx from "clsx"
import { FC } from "react"
import { IconCheckmark } from "./Icons"

interface CheckboxProps {
   checked: boolean
   label: string
}
export const Checkbox:FC<CheckboxProps> = ({
   checked,
   label
}) => {
   return (
      <label className="relative text-sm my-1 flex items-center cursor-pointer select-none">
         <input 
            type="checbox" 
            className="sr-only"
         />
         <span
            id="checkmark"
            className={clsx(
               "relative mr-2 0 h-5 w-5 rounded flex items-center justify-center",
               checked ? "bg-blue-600" : "bg-main-tertiare"
            )}
         >
            {checked && <IconCheckmark className="text-white" size={22}/>}
         </span>
         <p className={checked ? "text-white" : "text-main-tertiare"}>
            { label }
         </p>
      </label>
   )
}
