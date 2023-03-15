import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { useState, Fragment, FC } from "react"
import { DirectoryType } from "types"
import { IconCheckmark, IconChevron, IconTrashcan, Input } from "~/components/Elements"
import { useAppSelector } from "~/redux/hooks"
import { DirectoryExtended } from "./AccountModal"

interface AccountModalDirectoriesProps {
   addDirectory: (is_new: boolean, name: string, id?: string | false) => void
   removeDirectory: (name: string) => void
   directories: DirectoryExtended[]
}

export const AccountModalDirectories:FC<AccountModalDirectoriesProps> = ({
   directories,
   addDirectory,
   removeDirectory
}) => {
   const [new_directory, setNewDirectory] = useState("")

   return (
      <div className="flex flex-col space-y-4">
         <div className="border-2 relative mt-2 border-main-tertiare w-[345px] rounded p-3">
            <h2 className="uppercase text-xs text-main-tertiare font-bold tracking-wider absolute top-0 transform -translate-y-1/2 bg-main-primary px-1.5">Toegevoegd aan</h2>
            <div className="flex flex-col space-y-2">
               {directories.map((directory, i) => (
                  <div 
                     className="flex items-center flex-1 justify-between"
                     key={i}
                  >
                     <span className="flex w-72 text-white/60 px-1">
                        {directory.name}
                     </span>
                     <IconTrashcan 
                        className="text-white cursor-pointer hover:text-red-500" 
                        size={20} 
                        onClick={() => removeDirectory(directory.name)}
                     />
                  </div>
               ))}
            </div>
         </div>
         <div className="flex flex-col space-y-4">
            <DirectoryDropdown
               in_directories={directories}
               addDirectory={addDirectory}
            />
            <div className="flex">
               <Input 
                  className="w-72"
                  placeholder="Nieuwe Map" 
                  value={new_directory}
                  onChange={e => setNewDirectory(e.target.value)}
               />
               <button 
                  className="w-12 rounded ml-2 text-white bg-blue-600"
                  onClick={() => {
                     addDirectory(true, new_directory)
                     setNewDirectory("")
                  }}
                  type="button"
               >
                  +
               </button>
            </div>
         </div>
      </div>
   )
}

interface DirectoryDropdownProps {
   in_directories: DirectoryExtended[] 
   addDirectory: (is_new: boolean, name: string, id?: string | false) => void
}

const DirectoryDropdown:FC<DirectoryDropdownProps> = ({
   addDirectory,
   in_directories
}) => {
   const directories = useAppSelector(state => state.accounts.directories)
   const [selected, setSelected] = useState<DirectoryType|null>(directories[0])
   
   return (
      <div className="text-white">
         <Listbox 
            value={selected} 
            onChange={setSelected}
         >
            <div className="relative mt-1">
               <div className="flex">
                  <Listbox.Button 
                     type="button"
                     className="relative w-72 cursor-default rounded bg-main-tertiare py-2 pl-3 pr-10 text-left shadow-md focus-visible:ring-2 ring-blue-600  sm:text-sm"
                  >
                     <span className="block truncate h-5">{selected?.name || ""}</span>
                     <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                     <IconChevron
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                     />
                     </span>
                  </Listbox.Button>
                  <button 
                     className="w-12 rounded ml-2 text-white bg-blue-600"
                     onClick={() => {
                        if(!selected){
                           return
                        }
                        addDirectory(false, selected.name, selected.id)
                        setSelected(null)
                     }}
                     type="button"
                  >
                     +
                  </button>
               </div>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <Listbox.Options className="absolute w-72 mt-1 max-h-60 overflow-auto rounded-md bg-main-tertiare divide-y divide-main-secondary/40 text-base shadow-lg sm:text-sm">
                  {directories.map((directory, index) => (
                     <DirectoryDropdownItem
                        directory={directory}
                        index={index}
                        in_directories={in_directories}
                        key={index}
                     />
                  ))}
                  </Listbox.Options>
               </Transition>
            </div>
         </Listbox>
      </div>
   )
}

interface DirectoryDropdownItemProps {
   directory: DirectoryType
   index: number
   in_directories: DirectoryExtended[] 
}

const DirectoryDropdownItem:FC<DirectoryDropdownItemProps> = ({
   index,
   directory,
   in_directories
}) => {
   const disable = in_directories.find(x => x.id === directory.id)

   return (
      <Listbox.Option
         key={index}
         className={({ active }) =>
            clsx(
               "relative cursor-default select-none py-2 pl-10 pr-4",
               disable 
                  ? "text-gray-500 bg-gray-600/20 cursor-not-allowed"
                  : active 
                     ? "bg-blue-100/5 text-white" 
                     : "text-white"
            )
         }
         value={directory}
      >
         {({ selected }) => (
         <>
            <span
               className={`block truncate ${
               selected ? 'font-medium' : 'font-normal'
               }`}
            >
               {directory.name}
            </span>
            {selected ? (
               <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                  <IconCheckmark className="h-5 w-5" aria-hidden="true" />
               </span>
            ) : null}
         </>
         )}
      </Listbox.Option>
   )
}