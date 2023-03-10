import { IconEdit, IconTrashcan } from "~/components/Elements"

export const DetailActions = () => {
   const action_btn_styles = "py-2 focus:outline-none focus:ring-2 focus:border-blue-600 px-4 bg-main-secondary rounded mr-4 flex items-center"

   return (
      <div className="text-white text-sm flex justify-end">
         <button className="bg-blue-600 uppercase text-xs tracking-wider font-bold flex justify-center items-center rounded mb-auto mr-auto py-1 px-4 md:hidden">
            Terug
         </button>
         <button className={action_btn_styles}>
            <IconEdit size={18} className="w-5 mr-2"/>
            Bewerk
         </button>
         <button className={action_btn_styles}>
            <IconTrashcan size={18} className="w-5 mr-2"/>
            Verwijder
         </button>
      </div>
   )
}
