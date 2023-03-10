import { FC } from "react"
import { AccountType } from "types"
import { ImageContainer } from "~/components/Elements"

export const DetailHeader:FC<{account: AccountType}> = ({
   account
}) => {
   return (
      <header className="py-6 text-white flex">
         <ImageContainer
            src={account.url}
         />
         <div className="ml-4">
            <h2 className="text-2xl font-semibold tracking-wide">
               {account.name}
               <span>

               </span>
            </h2>
            <p className="text-accent-grey">Login</p>
         </div>
      </header>
   )
}
