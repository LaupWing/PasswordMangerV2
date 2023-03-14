import clsx from "clsx"
import { FC, useState } from "react"
import { Checkbox, IconChevron } from "~/components/Elements"

interface PasswordOptionsProps {
   checkboxes: {
      value: string
      label: string
   }[]
   actives: string[]
   setOptions: (value: string, state: boolean) => void
   setPasswordLength: (length: number) => void
}

export const PasswordOptions:FC<PasswordOptionsProps> = ({
   checkboxes,
   actives,
   setOptions,
   setPasswordLength
}) => {
   const [show, setShow] = useState(false)

   return (
      <div className="flex flex-col w-56 duration-500 border-2 overflow-hidden border-main-tertiare rounded-md flex-shrink-0">
         <button 
            type="button"
            className="bg-main-tertiare text-white text-xs font-bold tracking-widest uppercase p-1 px-1.5 flex items-center cursor-pointer select-none text-left"
            onClick={() => setShow(_show => !_show)}
         >
            wachtwoord opties
            <IconChevron
               className={clsx(
                  "w-5 text-white ml-auto transform duration-200",
                  show ? "rotate-180" : "rotate-0"
               )}
               size={22}
            />
         </button>
         <div className={clsx(
            "flex flex-col duration-500",
            show ? "max-h-96 p-2" : "max-h-0 p-0"
         )}>
            <input 
               type="number" 
               className="p-1 w-12 bg-main-tertiare rounded text-white tracking-widest my-1 focus:outline-none focus:ring-2 focus:border-blue-600"
               onChange={(e) => setPasswordLength(Number(e.target.value))}
            />
            {checkboxes.map(c => (
               <Checkbox
                  checked={!!actives.find(a => a === c.value)}
                  label={c.label}
                  key={c.label}
                  onChange={(state) => {
                     setOptions(c.value, state)
                  }}
               />
            ))}
         </div>
      </div>
   )
}
