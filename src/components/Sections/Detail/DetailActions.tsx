import { IconEdit } from "~/components/Elements"

export const DetailActions = () => {
   const action_btn_styles = "py-2 focus:outline-none focus:ring-2 focus:border-blue-600 px-4 bg-main-secondary rounded mr-4 flex items-center"

   return (
      <div className="text-white text-sm flex justify-end">
         <button className={action_btn_styles}>
            <IconEdit className="w-4 mr-2"/>
            Bewerk
         </button>
      </div>
   )
}
