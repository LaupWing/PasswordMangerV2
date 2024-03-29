import clsx from "clsx"
import { FC, FormEvent, useState } from "react"
import { AccountType, DirectoryType } from "types"
import { IconClose, IconLoading } from "~/components/Elements"
import { Backdrop } from "~/components/Global"
import { notify } from "~/components/Global/Notify"
import { decryptPassword, encryptPassword } from "~/lib/utils"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { createAccount, postDirectories, patchAccount, fetchDirectories, addToDirectory, removeFromDirectory } from "~/slices/accountsSlice"
import { AccountModalDirectories } from "./AccountModalDirectories"
import { AccountModalInfo } from "./AccountModalInfo"

interface AccountModalProps {
   is_new?: boolean
   account: AccountType
   close: () => void
}

export interface DirectoryExtended extends Omit<DirectoryType, "id"> {
   is_new: boolean
   id?: string | false
}

export const AccountModal:FC<AccountModalProps> = ({
   is_new,
   account,
   close
}) => {
   const [loading, setLoading] = useState(false)
   const [show_main_info, setShowMainInfo] = useState(true)
   const { master_key } = useAppSelector(state => state.auth)
   const parsed_password = is_new ? "" : decryptPassword(
      account.password,
      master_key
   ) 
   const [edit_account, setEditAccount] = useState({
      ...account,
      password: parsed_password
   })
   const [directories, setDirectories] = useState<DirectoryExtended[]>(account.directories.map(x => {
      const { directories } = useAppSelector(state => state.accounts)
      const directory = directories.find(y => y.id === x) as DirectoryType
      return {
         ...directory,
         is_new: false
      }
   }))
   const dispatch = useAppDispatch()

   const tab_style = "p-0.5 text-center font-bold rounded-md text-xs tracking-widest border-b-0 uppercase px-3 border-2 border-black rounded-b-none mr-1 cursor-pointer"

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      
      setLoading(true)
      const new_directories = await dispatch(postDirectories(directories
         .filter(x => x.is_new)
         .map(x => ({
            name: x.name
         }))
      ))
      await dispatch(fetchDirectories())
      
      const updated_directories = [
         ...new_directories,
         ...directories.filter(x => !x.is_new).map(x => x.id)
      ] as string[]
      const removed_directories = account.directories.filter(x => !updated_directories.includes(x))
      const added_directories = updated_directories.filter(x => !account.directories.includes(x))
      let id:string
      if(is_new){
         id = await dispatch(createAccount({
            is_favorite: edit_account.is_favorite,
            name: edit_account.name,
            password: encryptPassword(edit_account.password, master_key),
            url: edit_account.url,
            username: edit_account.username,
            directories: updated_directories
         }))
         close()
         notify("success", "Toegevoegd", "Account is toegevoegd!")
      }else {
         id = account.id!
         dispatch(patchAccount(
            account.id!,
            {
               directories: updated_directories,
               is_favorite: edit_account.is_favorite,
               name: edit_account.name,
               password: encryptPassword(edit_account.password, master_key),
               url: edit_account.url,
               username: edit_account.username
            }
         ))
         close()
         notify("success", "Update", "Account is geupdate!")
      }
      await Promise.all(added_directories.map(async x => {
         return await dispatch(addToDirectory(x, id))
      }))
      await Promise.all(removed_directories.map(async x => {
         return await dispatch(removeFromDirectory(x, id))
      }))
      setLoading(false)
   }

   return (
      <Backdrop className="p-2 items-start flex-col">
         <form 
            autoComplete="off"
            className="w-full max-w-xl border-2 border-black bg-main-primary mx-auto rounded  flex flex-col relative min-h-0 mt-[10vh]"
            onSubmit={handleSubmit}
         >
            {loading && (
               <div className="flex absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-main-secondary bg-opacity-90 z-50">
                  <IconLoading width={50} height={50}/>
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
                  <IconClose 
                     className="cursor-pointer hover:text-blue-600" 
                     size={24} 
                     onClick={close}
                  />
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
            <div className="p-4 border-y-2 flex flex-col overflow-y-auto border-black">
               {show_main_info ? (
                  <AccountModalInfo 
                     edit_account={edit_account!}
                     setEditAccount={setEditAccount}
                  />
               ) :(
                  <AccountModalDirectories
                     directories={directories}
                     removeDirectory={(name)=>{
                        setDirectories([...directories].filter(x => x.name !== name))
                     }}
                     addDirectory={(is_new, name, id = false) => {
                        setDirectories([...directories, {
                           is_new,
                           name,
                           id
                        }])
                     }}
                  />
               )}
            </div>
            <div className="flex items-center p-4 flex-shrink-0">
               <button className="bg-blue-600 uppercase text-white font-bold ml-auto py-1.5 px-4 rounded text-sm tracking-widest hover:bg-blue-700">
                  Opslaan
               </button>
            </div>
         </form>
      </Backdrop>
   )
}
