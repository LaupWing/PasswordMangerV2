import { useState } from "react"

export const PasswordOptions = () => {
   const [show, setShow] = useState(false)

   return (
      <div className="flex flex-col w-56 duration-500 border-2 overflow-hidden border-main-tertiare rounded-md flex-shrink-0">
         <button 
            className="bg-main-tertiare text-white text-xs font-bold tracking-widest uppercase p-1 px-5 flex items-center cursor-pointer select-none"
            onClick={() => setShow(_show => !_show)}
         >
            wachtwoord opties
            {/* <Icon */}
         </button>
      </div>
   )
}
