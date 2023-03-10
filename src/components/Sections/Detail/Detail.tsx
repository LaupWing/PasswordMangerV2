import { FC } from "react"
import { AccountType } from "types"
import { DetailActions } from "./DetailActions"
import { DetailContent } from "./DetailContent"
import { DetailHeader } from "./DetailHeader"

export const Detail:FC<{account: AccountType}> = ({
   account
}) => {
   return (
      <div className="flex-1 items-start p-4 pt-6 max-w-5xl flex flex-col">
         <div className="flex flex-col w-full md:max-w-lg max-w-xl min-h-0 mx-auto">
            <DetailActions />
            <DetailHeader account={account} />
            <DetailContent account={account} />
         </div>
      </div>
   )
}
