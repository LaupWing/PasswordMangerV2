import { useRouter } from "next/router"
import { FC } from "react"
import { IconEdit, IconTrashcan } from "~/components/Elements"

interface DetailActionsProps {
   showModal: () => void
}

export const DetailActions:FC<DetailActionsProps> = ({
   showModal
}) => {
   const action_btn_styles = "py-2 focus:outline-none focus:ring-2 focus:border-blue-600 px-4 bg-main-secondary rounded mr-4 flex items-center"
   const router = useRouter()

   const back = () => {
      console.log(router.asPath.includes("directories"))
      console.log(router)
   }

   return (
      <div className="text-white text-sm flex justify-end">
         <button 
            className="bg-blue-600 uppercase text-xs tracking-wider font-bold flex justify-center items-center rounded mb-auto mr-auto py-1 px-4 md:hidden"
            onClick={back}
         >
            Terug
         </button>
         <button 
            className={action_btn_styles}
            onClick={showModal}
         >
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
