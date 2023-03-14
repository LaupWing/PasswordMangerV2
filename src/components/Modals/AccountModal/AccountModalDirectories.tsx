import { Listbox } from "@headlessui/react"
import { useState } from "react"
import { IconChevron } from "~/components/Elements"

export const AccountModalDirectories = () => {
   return (
      <div className="flex flex-col">
         <DirectoryDropdown/>
      </div>
   )
}


const DirectoryDropdown = () => {
   const directories = [
      { id: 1, name: 'Durward Reynolds', unavailable: false },
      { id: 2, name: 'Kenton Towne', unavailable: false },
      { id: 3, name: 'Therese Wunsch', unavailable: false },
      { id: 4, name: 'Benedict Kessler', unavailable: true },
      { id: 5, name: 'Katelyn Rohan', unavailable: false },
   ]
   const [selected, setSelected] = useState(directories[0])

   return (
      <div className="w-72">
         <Listbox 
            value={selected} 
            onChange={setSelected}
         >
            <div className="relative mt-1">
            <Listbox.Button 
               className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
               <span className="block truncate">{selected.name}</span>
               <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
               <IconChevron
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
               />
               </span>
            </Listbox.Button>

            </div>
         </Listbox>
      </div>
   )
}