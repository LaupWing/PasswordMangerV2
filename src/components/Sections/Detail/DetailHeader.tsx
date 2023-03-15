import { FC } from "react"
import { AccountType } from "types"
import { IconStarFill, IconStarOutline, ImageContainer } from "~/components/Elements"

export const DetailHeader:FC<{account: AccountType}> = ({
   account
}) => {
   return (
      <header className="py-6 text-white flex">
         <ImageContainer
            src={account.url}
            className="h-16 w-16"
         />
         <div className="ml-4">
            <h2 className="text-2xl font-semibold tracking-wide">
               {account.name}
               <span>

               </span>
            </h2>
            <p className="text-accent-grey">Login</p>
         </div>
         {account.is_favorite ? (
            <IconStarOutline className="ml-auto my-auto" size={50} />
         ) : (
            <IconStarFill className="ml-auto my-auto text-yellow-500" size={50} />
         )}
      </header>
   )
}
