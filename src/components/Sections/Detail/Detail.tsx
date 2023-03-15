import { FC, useState } from "react"
import { AccountType } from "types"
import { AccountModal } from "~/components/Modals"
import { DetailActions } from "./DetailActions"
import { DetailContent } from "./DetailContent"
import { DetailHeader } from "./DetailHeader"

export const Detail:FC<{account: AccountType}> = ({
   account
}) => {
   const [showModal, setShowModal] = useState<false|AccountType>(false)
   return (
      <>
         {showModal && <AccountModal 
            account={showModal}
            is_new={true}
            close={() => setShowModal(false)}
         />}
         <div className="flex-1 items-start p-4 pt-6 max-w-5xl flex flex-col">
            <div className="flex flex-col w-full md:max-w-lg max-w-xl min-h-0 mx-auto">
               <DetailActions 
                  showModal={() => setShowModal(account)}
               />
               <DetailHeader account={account} />
               <DetailContent account={account} />
            </div>
         </div>
      </>
   )
}
