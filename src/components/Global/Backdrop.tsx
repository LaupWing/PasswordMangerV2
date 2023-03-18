import clsx from "clsx"
import { FC, PropsWithChildren } from "react"
import { useAppSelector } from "~/redux/hooks"

interface BackdropProps extends PropsWithChildren {
   className?: string
   onClick?: () => void
}

export const Backdrop:FC<BackdropProps> = ({
   children,
   className = "",
   onClick = () => {}
}) => {
   const { show_sidenav, lg, nav_width } = useAppSelector(state => state.settings)
   
   return (
      <div 
         className={clsx(
            "flex fixed left-0 top-0 w-screen h-screen z-50 bg-black/60",
            className
         )}
         onClick={onClick}
         style={{
            transform: `translateX(${(lg && !show_sidenav) ? nav_width : '0'}px)`
         }}
      >
         { children }
      </div>
   )
}
