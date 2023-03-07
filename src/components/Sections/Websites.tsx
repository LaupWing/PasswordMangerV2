import { FC } from "react"
import { PasswordType } from "types"
import { useAppSelector } from "~/redux/hooks"
import { ImageContainer } from "~/components/Elements"

export const Websites = () => {
   const { passwords } = useAppSelector(state => state.passwords)
   
   return (
      <div className="h-full md:border-r-2 w-full md:w-auto border-black p-3 pt-6 flex flex-col">
         <ul className="text-white text-sm md:w-80 w-full overflow-y-auto">
            {passwords.map(password => (
               <WebsiteItem
                  password={password}
               />
            ))}
         </ul>
      </div>
   )
}

const WebsiteItem:FC<{
   password: PasswordType
}> = ({password}) => {
   return (
      <li className="w-full flex items-center my-2 p-3 cursor-pointer rounded-md">
         <ImageContainer src={password.url}/>
         <div>
            <h2 className="text-base font-bold tracking-wider">{password.name}</h2>
            <p className="text-xs text-gray-400">{password.username}</p>
         </div>
      </li>
   )
}