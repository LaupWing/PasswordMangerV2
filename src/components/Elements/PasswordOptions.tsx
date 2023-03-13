import clsx from "clsx"
import { useState } from "react"
import { IconChevron } from "~/components/Elements"

export const PasswordOptions = () => {
   const [show, setShow] = useState(false)

   return (
      <div className="flex flex-col w-56 duration-500 border-2 overflow-hidden border-main-tertiare rounded-md flex-shrink-0">
         <button 
            className="bg-main-tertiare text-white text-xs font-bold tracking-widest uppercase p-1 px-5 flex items-center cursor-pointer select-none"
            onClick={() => setShow(_show => !_show)}
         >
            wachtwoord opties
            <IconChevron
               className={clsx(
                  "w-5 text-white ml-auto transform duration-200",
                  show ? "rotate-180" : "rotate-0"
               )}
            />
         </button>
         <div className={clsx(
            "flex flex-col duration-500",
            show ? "max-h-96 p-2" : "max-h-0 p-0"
         )}>

         </div>
      </div>
   )
}
