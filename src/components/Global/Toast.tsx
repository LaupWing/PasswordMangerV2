import { FC } from "react"
import { toast, ToastOptions, Slide } from "react-toastify"
export declare type ToastType = "info" | "success" | "error"

interface ToastProps {
   type: ToastType
   message: string
}

export const ToastUI:FC<ToastProps> = (props) => {
   console.log(props)
   return (
      <div className="border-2 border-black bg-main-tertiare">Toast</div>
   )
}

const toastOptions: ToastOptions = {
   position: 'top-center',
   autoClose: 10000,
   hideProgressBar: true,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   transition: Slide,
   rtl: false,
   closeButton: false,
}

export const notify = (message: string, type: ToastType) => {
   console.log("heh")
   toast(<ToastUI message={message} type={type}/>)
}
 