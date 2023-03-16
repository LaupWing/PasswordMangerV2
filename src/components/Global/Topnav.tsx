import { useAppSelector } from "~/redux/hooks"

export const Topnav = () => {
   const { time_left } = useAppSelector((state) => state.auth)
   console.log(time_left)
   return (
      <div className="bg-main-secondary text-sm py-1 px-3 border-b-2 border-black text-main-tertiare flex items-center justify-between uppercase font-bold tracking-wider z-50">
         TopNav
      </div>
   )
}