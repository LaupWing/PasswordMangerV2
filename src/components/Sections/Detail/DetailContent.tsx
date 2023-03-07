import { FC } from "react"

export const DetailContent = () => {
   return <div>DetailContent</div>
}

const Directories = () => {}
const Info = () => {
   return (
      <div className="py-6 border-t-2 border-b-2 border-main-tertiare w-full overflow-y-auto">

      </div>
   )
}

interface InfoFieldProps {
   is_password?: boolean
   show_password?: boolean
   value: string
   label: string
}
const InfoField:FC<InfoFieldProps> = () => {
   return (
      <div 
         className="py-4 px-3 rounded-md hover:bg-main-secondary text-sm flex items-center 
         justify-between overflow-hidden select-none"
         // onMouseOver={() => }
      >

      </div>
   )
}