import { FC, useState } from "react"
import { AccountType } from "types"
import { useAppSelector } from "~/redux/hooks"
import { IconSearch, ImageContainer } from "~/components/Elements"
import Link from "next/link"
import clsx from "clsx"
import { useRouter } from "next/router"
import { AccountModal } from "~/components/Modals"

export const Websites:FC = () => {
   const { accounts } = useAppSelector(state => state.accounts)
   const [showModal, setShowModal] = useState<false|AccountType>(false)

   const addNew = () => {
      setShowModal({
         directories: [],
         id: "",
         name: "",
         password: "",
         url: "",
         username: ""
      })
   }
   
   return (
      <div className="h-full md:border-r-2 w-full md:w-[22rem] border-black p-3 pt-6 flex flex-col">
         {showModal && <AccountModal 
            account={showModal}
            is_new={true}
            close={() => setShowModal(false)}
         />}
         <AddWebsiteForm 
            addNew={addNew}
         />
         <ul className="text-white text-sm w-full overflow-y-auto">
            {accounts.map(account => (
               <WebsiteItem
                  account={account}
                  key={account.id}
               />
            ))}
         </ul>
      </div>
   )
}

const WebsiteItem:FC<{
   account: AccountType
}> = ({ account }) => {
   const router = useRouter()
   
   return (
      <Link 
         href={`/all/${account.id}`}
         className={clsx(
            router.asPath === `/all/${account.id}` && "bg-blue-600",
            "flex rounded-md my-2 p-3"
         )}
      >
         <li className="w-full flex items-center">
            <ImageContainer src={account.url}/>
            <div>
               <h2 className="text-base font-bold tracking-wider">{account.name}</h2>
               <p className="text-xs text-gray-400">{account.username}</p>
            </div>
         </li>
      </Link>
   )
}

interface AddWebsiteFormProps {
   addNew: () => void
} 
const AddWebsiteForm:FC<AddWebsiteFormProps> = ({
   addNew
}) => {
   return (
      <div className="mb-4 flex text-accent-grey">
         <div className="bg-main-tertiare rounded flex p-2 flex-1 items-center">
            <IconSearch size={22} />
            <input 
               type="text" 
               className="bg-main-tertiare text-sm flex-1 outline-none ml-2"
               placeholder="Zoeken in alle"
            />
         </div>
         <button
            onClick={addNew}
            className="w-12 text-2xl text-white rounded ml-4 bg-blue-600"
         >
            +
         </button>
      </div>
   )
}