import { useAppSelector } from "~/redux/hooks"

export const Websites = () => {
   const { passwords } = useAppSelector(state => state.passwords)
   console.log(passwords)
   return (
      <div className="h-full md:border-r-2 w-full md:w-auto border-black p-3 pt-6 flex flex-col">
         <ul className="text-white text-sm md:w-80 w-full overflow-y-auto">

         </ul>
      </div>
   )
}

const WebsiteItem = () => {
   return (
      <li className="w-full flex items-center my-2 p-3 cursor-pointer rounded-md">

      </li>
   )
}