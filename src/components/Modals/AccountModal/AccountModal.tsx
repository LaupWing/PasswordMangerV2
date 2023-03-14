import clsx from "clsx"
import { FC, FormEvent, useState } from "react"
import { AccountType } from "types"
import { IconClose, IconLoading } from "~/components/Elements"
import { Backdrop } from "~/components/Global"
import { AccountModalDirectories } from "./AccountModalDirectories"
import { AccountModalInfo } from "./AccountModalInfo"

interface AccountModalProps {
   is_new?: boolean
   account?: AccountType
}

export const AccountModal:FC<AccountModalProps> = ({
   is_new,
   account
}) => {
   const [loading, setLoading] = useState(false)
   const [show_main_info, setShowMainInfo] = useState(false)
   const [edit_account, setEditAccount] = useState(account)
   const [directories, setDirectories] = useState([])

   const tab_style = "p-0.5 text-center font-bold rounded-md text-xs tracking-widest border-b-0 uppercase px-3 border-2 border-black rounded-b-none mr-1 cursor-pointer"

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      console.log(edit_account)
   }

   return (
      <Backdrop className="p-2 items-start flex-col">
         <form 
            autoComplete="off"
            className="w-full max-w-xl border-2 border-black bg-main-primary mx-auto rounded  flex flex-col relative min-h-0 mt-[10vh]"
            onSubmit={handleSubmit}
         >
            {loading && (
               <div className="flex absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-main-secondary bg-opacity-90">
                  <IconLoading width={10} height={10}/>
               </div>
            )}
            <header className="bg-main-secondary text-white flex-col">
               <div className="flex justify-between p-4 pb-2">
                  <h2 className="text-lg">
                     {is_new 
                        ? "Account aanmaken"
                        : "Account bewerken"
                     }
                  </h2>
                  <IconClose size={24} />
               </div>
               <div className="flex px-2 select-none">
                  <span 
                     className={clsx(tab_style, show_main_info ? "bg-main-tertiare text-white" : 'text-black')}
                     onClick={() => setShowMainInfo(true)}
                  >
                     info
                  </span>
                  <span
                     className={clsx(tab_style, !show_main_info ? "bg-main-tertiare text-white" : 'text-black')}
                     onClick={() => setShowMainInfo(false)}
                  >
                     Mappen
                  </span>
               </div>
            </header>
            <div className="p-4 border-y-2 border-black">
               {show_main_info ? (
                  <AccountModalInfo 
                     edit_account={edit_account!}
                     setEditAccount={setEditAccount}
                  />
               ) :(
                  <AccountModalDirectories
                     directories={directories}
                     setDirectories={()=> setDirectories}
                  />
               )}
            </div>
            <div className="flex items-center p-4">
               <button className="bg-blue-600 uppercase text-white font-bold ml-auto py-1.5 px-4 rounded text-sm tracking-widest hover:bg-blue-700">
                  Opslaan
               </button>
            </div>
         </form>
      </Backdrop>
   )
}
