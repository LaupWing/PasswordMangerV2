import clsx from "clsx"
import { FC } from "react"
import { toast } from "react-hot-toast"

export type NotifyType = "success" | "favorite" | "deleted" 

interface NotifyProps {
   title: string
   text: string
   type: NotifyType
}

export const Notify:FC<NotifyProps> = ({
   type,
   title,
   text
}) => {
   let typeObj
   switch(type){
      case "deleted":
         typeObj = {
            color: "text-red-500",
            icon: Delete
         }
         break
      case "favorite":
         typeObj = {
            color: "text-yellow-400",
            icon: Star
         }
         break
      case "success":
         typeObj = {
            color: "text-green-500",
            icon: Checkmark
         }
         break
   }
   return (
      <div className={
         clsx(
            "bg-main-tertiare p-2 rounded shadow border-2 border-black flex select-none", 
            typeObj.color
      )}>
         {typeObj.icon()}
         <div className="flex flex-col flex-1">
            <h1 className="uppercase text-xs font-bold tracking-widest mb-0.5">
               {title}
            </h1>
            <p
               className="text-base text-white"
               dangerouslySetInnerHTML={{
                  __html: text
               }}
            ></p>
         </div>
      </div>
   )
}

export const notify = (type: NotifyType, title: string, text: string) => {
   toast(<Notify 
      type={type}
      title={title}
      text={text}
   />)
}

const Star = () => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-10 mr-1"
   >
      <path
         d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
   </svg>
)


const Checkmark = () => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-10 mr-1"
      stroke="currentColor"
   >
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth="2"
         d="M5 13l4 4L19 7"
      />
   </svg>
)

const Delete = () => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-10 mr-1"
      stroke="currentColor"
   >
      <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth="2"
         d="M5 13l4 4L19 7"
      />
   </svg>
)