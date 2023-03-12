import { useState } from "react"
import { IconLoading } from "~/components/Elements"
import { Backdrop } from "~/components/Global"


const AccountModal = () => {
   const [loading, setLoading] = useState(false)
   return (
      <Backdrop className="p-2 items-start flex-col">
         <form 
            autoComplete="off"
            className="w-full max-w-xl border-2 border-black bg-black-default mx-auto rounded overflow-hidden flex flex-col relative min-h-0 mt-[10vh]" 
         >
            {loading && (
               <div className="flex absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-main-secondary bg-opacity-90">
                  <IconLoading width={10} height={10}/>
               </div>
            )}
         </form>
      </Backdrop>
   )
}
export default AccountModal
