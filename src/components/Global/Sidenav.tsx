import Link from "next/link"
import { IconItems } from "~/components/Elements"

const Sidenav = () => {

   const linkStyles = "w-48 p-2 py-1 rounded-md flex items-center"

   return (
      <div className="bg-main-secondary p-4 border-r-2 border-black">
         <img 
            src="/assets/logo.png" 
            alt="logo" 
            className="w-20 mx-auto mb-6"
         />
         <ul className="text-white text-sm flex flex-col">
            <Link
               className={linkStyles}
               href={"/"}
            >
               <IconItems className="w-5 mr-1"/>
               Alle Items
            </Link>
         </ul>
      </div>
   )
}
export default Sidenav
