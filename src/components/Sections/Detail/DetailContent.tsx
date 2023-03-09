import clsx from "clsx"
import { FC, PropsWithChildren, useState } from "react"
import { AccountType } from "types"
import { IconDuplicate, IconLink, TogglePassword } from "~/components/Elements"

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
const Info:FC<{account: AccountType}> = ({
   account
}) => {
   const [show_password, setShowPassword] = useState(false)

   return (
      <div className="py-6 border-t-2 border-b-2 border-main-tertiare w-full overflow-y-auto">
         <InfoField
            label="username"
            value={account.username}
         >
            <IconDuplicate className="w-5 h-5 mx-1 cursor-pointer hover:text-blue-600"/>
         </InfoField>
         <InfoField
            label="password"
            value={account.password}
            show_password={show_password}
            is_password
         >
            <TogglePassword 
               show_password={show_password}
               setShowPassword={setShowPassword}
            />
            <IconDuplicate className="w-5 h-5 mx-1 cursor-pointer hover:text-blue-600"/>
         </InfoField>
         <InfoField
            label="website"
            value={account.url}
         >
            <IconLink className="w-5 h-5 mx-1 cursor-pointer hover:text-blue-600"/>
            <IconDuplicate/>
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
               />
            ) : (
               <p className="text-white">
                  { value }
               </p>
            )}
            <div className={clsx(
               "text-white flex items-center transform duration-200",
               show_icons ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}>
               { children }
            </div>
         </div>
      </div>
   )
}