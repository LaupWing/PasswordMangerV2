import { FC } from "react"
import { PasswordMeter as _PasswordMeter } from "password-meter"
import clsx from "clsx"

interface PasswordMeterProps {
   password: string
   className?: string
}

export const PasswordMeter:FC<PasswordMeterProps> = ({
   password,
   className = ""
}) => {
   const bars = 5

   return (
      <div className={clsx("flex", className)}>
         {new Array(bars).map(bar => (
            <Bar
               index={bar}
               password={password}
            />
         ))}
      </div>
   )
}

interface BarProps {
   index: number
   password: string
}
const Bar:FC<BarProps> = ({
   password,
   index
}) => {
   const strength = () => {
      const {percent} = new _PasswordMeter().getResult(password) 
      if(index  === 1 && (percent >= 5 && percent <= 20)){
         return "bg-red-600"
      }
      if(index  <= 2 && (percent > 20 && percent <= 40)){
         return "bg-red-400"
      }
      if(index  <= 3 && (percent > 40 && percent <= 60)){
         return "bg-yellow-600"
      }
      if(index  <= 4 && (percent > 60 && percent <= 80)){
         return "bg-green-300"
      }
      if(index  <= 5 && (percent > 80 && percent <= 100)){
         return "bg-green-400"
      }
      return 'bg-black-lightest'
   }

   return (
      <div className={clsx(
         "h-1 w-10 mr-2 duration-200",
         strength()
      )}>
      </div>
   )
}