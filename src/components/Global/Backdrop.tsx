import { FC, PropsWithChildren } from "react"

const Backdrop:FC<PropsWithChildren> = ({
   children
}) => {
   return (
      <div className="flex fixed inset-0 z-50 bg-black/70">
         { children }
      </div>
   )
}
export default Backdrop
