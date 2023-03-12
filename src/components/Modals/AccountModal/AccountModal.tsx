import { Backdrop } from "~/components/Global"


const AccountModal = () => {
   return (
      <Backdrop className="p-2 items-start flex-col">
         <form 
            autoComplete="off"
            className="w-full max-w-xl border-2 border-black bg-black-default mx-auto rounded overflow-hidden flex flex-col relative min-h-0 mt-[10vh]" 
         >
            
         </form>
      </Backdrop>
   )
}
export default AccountModal
