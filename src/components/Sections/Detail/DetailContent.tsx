import clsx from "clsx"
import copy from "copy-to-clipboard"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, PropsWithChildren, useState } from "react"
import StringCrypto from "string-crypto"
import { AccountType } from "types"
import { IconDirectory, IconDuplicate, IconLink, TogglePassword } from "~/components/Elements"
import { notify } from "~/components/Global/Notify"
import { decryptPassword } from "~/lib/utils"
import { useAppSelector } from "~/redux/hooks"

export const DetailContent:FC<{account: AccountType}> = ({ account }) => {
   const [show_info, setShowInfo] = useState(true)

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
         {show_info ? (
            <Info
               account={account}
            />
         ): (
            <Directories
               account={account}
            />
         )}
      </div>
   )
}

const Directories:FC<{account: AccountType}> = ({
   account
}) => {
   const router = useRouter()
   return (
      <div className="py-6 border-y-2 flex flex-col border-main-tertiare w-full overflow-y-auto">
         {account.directories.length === 0 ?  (
            <p className="py-1 px-2 text-main-tertiare">
               Not associated with any directories!
            </p>
         ): (
            <>
               {account.directories.map((directory, i) => (
                  <Link 
                     href={`/directories/${directory}`}
                     className={clsx(
                        "py-1 px-2 my-1 text-main-tertiare hover:bg-main-tertiare hover:text-white rounded capitalize flex items-center",
                        router.pathname === `/directories/${directory}` && "bg-blue-600 text-white"
                     )}
                     key={i}
                  >
                     <IconDirectory className="w-5 mr-1"/> {directory}
                  </Link>
               ))}
            </>
         )}
      </div>
   )
}

const Info:FC<{account: AccountType}> = ({
   account
}) => {
   const [show_password, setShowPassword] = useState(false)
   const { master_key } = useAppSelector(state => state.auth)
   const parsed_password = decryptPassword(account.password, master_key)

   return (
      <div className="py-6 border-t-2 border-b-2 border-main-tertiare w-full overflow-y-auto">
         <InfoField
            label="username"
            value={account.username}
         >
            <IconDuplicate 
               className="w-5 h-5 mx-1 cursor-pointer hover:text-blue-600"
               onClick={() => {
                  copy(account.username)
                  notify("success", "Gekopieërd", "Gebruikersnaam is gekopieërd")
               }}
            />
         </InfoField>
         <InfoField
            label="password"
            value={parsed_password}
            show_password={show_password}
            is_password
         >
            <TogglePassword 
               show_password={show_password}
               setShowPassword={setShowPassword}
            />
            <IconDuplicate 
               className="w-5 h-5 mx-1 cursor-pointer hover:text-blue-600"
               onClick={() => {
                  copy(parsed_password)
                  notify("success", "Gekopieërd", "Wachtwoord is gekopieërd")
               }}
            />
         </InfoField>
         <InfoField
            label="website"
            value={account.url}
         >
            <IconLink className="w-5 h-5 mx-1 cursor-pointer hover:text-blue-600"/>
            <IconDuplicate
               onClick={() => {
                  copy(account.url)
                  notify("success", "Gekopieërd", "URL is gekopieërd")
               }}
            />
         </InfoField>
      </div>
   )
}

interface InfoFieldProps extends PropsWithChildren {
   is_password?: boolean
   show_password?: boolean
   value: string
   label: string
}
const InfoField:FC<InfoFieldProps> = ({
   is_password,
   show_password,
   value,
   label,
   children
}) => {
   const [show_icons, setShowIcons] = useState(false)

   return (
      <div 
         className="py-4 px-3 rounded-md hover:bg-main-secondary text-sm flex items-center 
         justify-between overflow-hidden select-none"
         onMouseOver={() => setShowIcons(true)}
         onMouseOut={() => setShowIcons(false)}
      >
         <div>
            <h2 className="text-accent-grey font-bold tracking-wider capitalize mb-1 select-none">
               { label }
            </h2>
            {is_password ? (
               <input 
                  value={value}
                  type={show_password ? "text" : "password"} 
                  className="text-white bg-transparent pointer-events-none"
                  readOnly
               />
            ) : (
               <p className="text-white">
                  { value }
               </p>
            )}
         </div>
         <div className={clsx(
            "text-white flex items-center transform duration-200",
            show_icons ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
         )}>
            { children }
         </div>
      </div>
   )
}