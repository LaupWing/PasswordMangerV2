import clsx from "clsx"
import { FC, PropsWithChildren } from "react"

interface BackdropProps extends PropsWithChildren {
   className?: string
}

const Backdrop:FC<BackdropProps> = ({
   children,
   className = ""
}) => {
   return (
      <div className={clsx(
         "flex fixed inset-0 z-50 bg-black/70",
         className
      )}>
         { children }
      </div>
   )
}
export default Backdrop
