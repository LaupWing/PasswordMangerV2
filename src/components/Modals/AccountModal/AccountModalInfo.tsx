import { FC, useState } from "react"
import useWindowSize from "react-use/lib/useWindowSize"
import { AccountType } from "types"
import { Input, PasswordMeter, PasswordOptions, TogglePassword } from "~/components/Elements"

interface MainInfoProps {
   edit_account: AccountType
   setEditAccount: (account: AccountType) => void
}

export const AccountModalInfo:FC<MainInfoProps> = ({
   edit_account,
   setEditAccount
}) => {
   const [show_password, setShowPassword] = useState(false)
   const { width } = useWindowSize()
   const small_screen = width < 420

   return (
      <div className="p-4 text-sm border-b-2 border-t-2 py-6 border-black flex flex-col overflow-y-auto">
         <div className="flex items-center sm:w-72 w-60 mb-6">
            <p className="mr-0.5 text-main-tertiare font-bold tracking-wider">www.</p>
            <Input 
               placeholder="URL"
               autoComplete="off"
               className="flex-1"
               onChange={e => setEditAccount({
                  ...edit_account,
                  url: e.target.value
               })}
            />
         </div>
         <Input 
            placeholder="Naam"
            autoComplete="off"
            className="sm:w-72 w-60 w-30 mb-6"
            onChange={e => setEditAccount({
               ...edit_account,
               name: e.target.value
            })}
         />
         <Input 
            placeholder="Gebruikersnaam"
            autoComplete="off"
            className="sm:w-72 w-60 w-30 mb-6"
            onChange={e => setEditAccount({
               ...edit_account,
               username: e.target.value
            })}
         />
         <div className="flex items-center">
            {show_password ? (
               <Input 
                  placeholder="Wachtwoord"
                  autoComplete="off"
                  className="sm:w-72 w-60 w-30"
                  onChange={e => setEditAccount({
                     ...edit_account,
                     password: e.target.value
                  })}
               />
            ) : (
               <Input 
                  placeholder="Wachtwoord"
                  autoComplete="off"
                  type={"password"}
                  className="sm:w-72 w-60 w-30"
                  onChange={e => setEditAccount({
                     ...edit_account,
                     password: e.target.value
                  })}
               />
            )}
            <TogglePassword 
               setShowPassword={setShowPassword}
               show_password={show_password}
               className="mx-2"
            />
            <button
               className="text-xs uppercase tracking-wider px-2 bg-blue-600 rounded-full text-white py-0.5 hover:bg-blue-700"
               type="button"
            >
               {small_screen ? "g": "genereren"}
            </button>
         </div>
         <PasswordMeter 
            className="my-2"
            password={edit_account.password}
         />
         <PasswordOptions />
      </div>
   )
}