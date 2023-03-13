import { Input } from "~/components/Elements"

export const MainInfo = () => {
   return (
      <div className="p-4 text-sm border-b-2 border-t-2 py-6 border-black flex flex-col overflow-y-auto">
         <div className="flex items-center sm:w-72 w-60 mb-6">
            <p className="mr-0.5 text-main-tertiare font-bold tracking-wider">www.</p>
            <Input />
         </div>
      </div>
   )
}