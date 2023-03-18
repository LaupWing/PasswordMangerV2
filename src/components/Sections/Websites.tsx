import { FC, useState, Dispatch, SetStateAction } from "react"
import { AccountType } from "types"
import Highlighter from "react-highlight-words"
import { IconSearch, ImageContainer } from "~/components/Elements"
import Link from "next/link"
import clsx from "clsx"
import { useRouter } from "next/router"
import { AccountModal } from "~/components/Modals"

interface WebsitesProps {
   accounts: AccountType[]
   prefix: string
   in_directory?: string
   className?: string
}

export const Websites:FC<WebsitesProps> = ({
   accounts,
   prefix,
   in_directory,
   className
}) => {
   const [showModal, setShowModal] = useState<false|AccountType>(false)
   const [search, setSearch] = useState("")

   const addNew = () => {
      setShowModal({
         directories: in_directory ? [in_directory] : [],
         id: "",
         name: "",
         password: "",
         url: "",
         username: "",
         is_favorite: false
      })
   }
   
   return (
      <div className={clsx("h-full md:border-r-2 w-full md:w-[22rem] border-black p-3 pt-6 flex flex-col" , className)}>
         {showModal && <AccountModal 
            account={showModal}
            is_new={true}
            close={() => setShowModal(false)}
         />}
         <AddWebsiteForm 
            addNew={addNew}
            setSearch={setSearch}
            search={search}
         />
         <ul className="text-white text-sm w-full overflow-y-auto">
            {accounts.filter(x => 
               x.name.toLowerCase().includes(search.toLowerCase()) || 
               x.username.toLowerCase().includes(search.toLowerCase())
            ).map(account => (
               <WebsiteItem
                  account={account}
                  key={account.id}
                  prefix={prefix}
                  search={search}
               />
            ))}
            {accounts.length === 0 &&  (
               <p className="opacity-30 text-center tracking-wider uppercase text-xs py-6">Nog geen accounts toegevoegd!</p>
            )}
         </ul>
      </div>
   )
}

const WebsiteItem:FC<{
   account: AccountType
   prefix: string
   search: string
}> = ({ account, prefix, search }) => {
   const router = useRouter()
   
   return (
      <Link 
         href={`/${prefix}/${account.id}`}
         className={clsx(
            router.asPath === `/${prefix}/${account.id}` && "bg-blue-600",
            "flex rounded-md my-2 p-3"
         )}
      >
         <li className="w-full flex items-center">
            <ImageContainer src={account.url}/>
            <div>
               <h2 className="text-base font-bold tracking-wider">
                  <Highlighter
                     highlightClassName="bg-yellow-500 rounded px-[1px]"
                     searchWords={search.split(" ")}
                     autoEscape={true}
                     textToHighlight={account.name}
                  />
               </h2>
               <p className="text-xs text-gray-400">
                  <Highlighter
                     highlightClassName="bg-yellow-500 rounded px-[1px]"
                     searchWords={search.split(" ")}
                     autoEscape={true}
                     textToHighlight={account.username}
                  />
               </p>
            </div>
         </li>
      </Link>
   )
}

interface AddWebsiteFormProps {
   addNew: () => void
   setSearch: Dispatch<SetStateAction<string>>
   search: string
} 
const AddWebsiteForm:FC<AddWebsiteFormProps> = ({
   addNew,
   setSearch,
   search
}) => {
   return (
      <div className="mb-4 flex text-accent-grey">
         <div className="bg-main-tertiare rounded flex p-2 flex-1 items-center">
            <IconSearch size={22} />
            <input 
               type="text" 
               className="bg-main-tertiare text-sm flex-1 outline-none ml-2"
               placeholder="Zoeken in alle"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
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