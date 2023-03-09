import clsx from "clsx"
import { FC, useState } from "react"
import { AccountType } from "types"

export const DetailContent:FC<{account: AccountType}> = ({ account }) => {
   const [show_info, setShowInfo] = useState(false)

   return (
      <div className="flex flex-col items-start min-h-0">
         <div className="flex">
            <span
               className={clsx(
                  "px-2 py-0.5 border-b-0 border-2 border-main-tertiare font-bold uppercase text-xs tracking-wider rounded-md rounded-b-none mr-1 cursor-pointer",
                  show_info ? "text-white bg-main-tertiare" : "text-main-tertiare"
               )}
               onClick={() => setShowInfo(true)}
               >
               Info
            </span>
            <span
               className={clsx(
                  "px-2 py-0.5 border-b-0 border-2 border-main-tertiare font-bold uppercase text-xs tracking-wider rounded-md rounded-b-none mr-1 cursor-pointer",
                  !show_info ? "text-white bg-main-tertiare" : "text-main-tertiare"
               )}
               onClick={() => setShowInfo(false)}
            >
               Mappen
               ({ account.directories.length })
            </span>
         </div>
      </div>
   )
}

const Directories = () => {}
const Info = () => {
   return (
      <div className="py-6 border-t-2 border-b-2 border-main-tertiare w-full overflow-y-auto">

      </div>
   )
}

interface InfoFieldProps {
   is_password?: boolean
   show_password?: boolean
   value: string
   label: string
}
const InfoField:FC<InfoFieldProps> = () => {
   return (
      <div 
         className="py-4 px-3 rounded-md hover:bg-main-secondary text-sm flex items-center 
         justify-between overflow-hidden select-none"
         // onMouseOver={() => }
      >

      </div>
   )
}