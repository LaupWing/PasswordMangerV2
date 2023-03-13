import { FC } from "react"

interface PasswordMeterProps {
   password: string
}

export const PasswordMeter:FC<PasswordMeterProps> = ({
   password
}) => {
   const bars = 5

   return (
      <div>PasswordMeter</div>
   )
}

const Bar = () => {
   return (
      <div className="h-1 w-10 mr-2 duration-200">

      </div>
   )
}