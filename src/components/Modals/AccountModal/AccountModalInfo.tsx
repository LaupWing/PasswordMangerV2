import { generate } from "generate-password"
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
   const [password_options, setPasswordOptions] = useState(["numbers", "symbols", "uppercase"]) 
   const checkboxes = [
      {
         value: "numbers",
         label: "Nummers"
      },
      {
         value: "symbols",
         label: "Symbolen"
      },
      {
         value: "uppercase",
         label: "Hoofdletters"
      },
   ]
   const editPasswordOptions = (value: string, add: boolean) => {
      if(!add){
         setPasswordOptions(prev => prev.filter(x => x !== value))
      }else{
         setPasswordOptions(prev => [...prev, value])
      }
   }
   const [password_length, setPasswordLength] = useState(20)

   const generatePassword = () => {
      const options_exists = (val: string) => !!password_options.find(x => x === val)
      setEditAccount({
         ...edit_account,
         password: generate({
            length: password_length,
            numbers: options_exists("numbers"),
            symbols: options_exists("symbols"),
            uppercase: options_exists("uppercase"),
         })
      })
   }

   return (
      <div className="text-sm py-2 flex flex-col">
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
               value={edit_account.url}
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
            value={edit_account.name}
         />
         <Input 
            placeholder="Gebruikersnaam"
            autoComplete="off"
            className="sm:w-72 w-60 w-30 mb-6"
            onChange={e => setEditAccount({
               ...edit_account,
               username: e.target.value
            })}
            value={edit_account.username}
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
                  value={edit_account.password}
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
                  value={edit_account.password}
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
               onClick={generatePassword}
            >
               {small_screen ? "g": "genereren"}
            </button>
         </div>
         <PasswordMeter 
            className="my-2"
            password={edit_account.password}
         />
         <PasswordOptions 
            checkboxes={checkboxes}
            actives={password_options}
            setOptions={editPasswordOptions}
            setPasswordLength={setPasswordLength}
            password_length={password_length}
         />
      </div>
   )
}