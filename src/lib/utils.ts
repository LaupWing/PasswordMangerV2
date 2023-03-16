import StringCrypto from "string-crypto"
import { useAppSelector } from "~/redux/hooks"

export const missingClass = (string?: string, prefix?: string) => {
   if(!string){
      return true
   }
   const regex = new RegExp(` ?${prefix}`, "g")
   return string.match(regex) === null
}

export const encryptPassword = (password: string) => {
   const { encryptString } = new StringCrypto()
   const { master_key } = useAppSelector(state => state.auth)
   const parsed_password = encryptString(
      password,
      master_key
   )
   return parsed_password
}
export const decryptPassword = (password: string) => {
   const { decryptString } = new StringCrypto()
   const { master_key } = useAppSelector(state => state.auth)
   const parsed_password = decryptString(
      password,
      master_key
   )
   return parsed_password
}