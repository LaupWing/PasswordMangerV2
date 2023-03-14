import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { useState, Fragment } from "react"
import { IconCheckmark, IconChevron, Input } from "~/components/Elements"

export const AccountModalDirectories = () => {
   return (
      <div className="flex flex-col space-y-4">
         <div className="border-2 relative mt-2 border-main-tertiare w-72 rounded p-2">
            <h2 className="uppercase text-xs text-main-tertiare font-bold tracking-wider absolute top-0 transform -translate-y-1/2 bg-main-primary px-1.5">Toegevoegd aan</h2>
         </div>
         <div className="flex flex-col space-y-4">
            <DirectoryDropdown/>
            <div className="flex">
               <Input className="w-72" placeholder="Nieuwe Map" />
               <button className="w-12 rounded ml-2 text-white bg-blue-600">
                  +
               </button>
            </div>
         </div>
      </div>
   )
}


const DirectoryDropdown = () => {
   const directories = [
      "test1",
      "test2",
      "test3",
   ]
   // const directories = [
   //    { id: 1, name: 'Durward Reynolds', unavailable: false },
   //    { id: 2, name: 'Kenton Towne', unavailable: false },
   //    { id: 3, name: 'Therese Wunsch', unavailable: false },
   //    { id: 4, name: 'Benedict Kessler', unavailable: true },
   //    { id: 5, name: 'Katelyn Rohan', unavailable: false },
   // ]
   const [selected, setSelected] = useState(directories[0])
   
   return (
      <div className="text-white">
         <Listbox 
            value={selected} 
            onChange={setSelected}
         >
            <div className="relative mt-1">
               <div className="flex">
                  <Listbox.Button 
                     className="relative w-72 cursor-default rounded bg-main-tertiare py-2 pl-3 pr-10 text-left shadow-md focus-visible:ring-2 ring-blue-600  sm:text-sm"
                  >
                     <span className="block truncate">{selected}</span>
                     <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                     <IconChevron
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                     />
                     </span>
                  </Listbox.Button>
                  <button className="w-12 rounded ml-2 text-white bg-blue-600">
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
                     <Listbox.Option
                        key={index}
                        className={({ active }) =>
                           clsx(
                              "relative cursor-default select-none py-2 pl-10 pr-4",
                              active 
                                    ? "bg-blue-100/5 text-white" 
                                    : "text-white"
                           )
                           // clsx(
                           //    "relative cursor-default select-none py-2 pl-10 pr-4",
                           //    directory.unavailable 
                           //       ? "text-gray-300 bg-gray-200"
                           //       : active 
                           //          ? "bg-blue-100 text-blue-900" 
                           //          : "text-gray-900"
                           // )
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
                              {directory}
                           </span>
                           {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                 <IconCheckmark className="h-5 w-5" aria-hidden="true" />
                              </span>
                           ) : null}
                        </>
                        )}
                     </Listbox.Option>
                  ))}
                  </Listbox.Options>
               </Transition>
            </div>
         </Listbox>
      </div>
   )
}