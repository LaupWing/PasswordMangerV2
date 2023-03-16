import StringCrypto from "string-crypto"
import { useAppSelector } from "~/redux/hooks"

export const useEncryptPassword = (password: string) => {
   const { encryptString } = new StringCrypto()
   const { master_key } = useAppSelector(state => state.auth)
   const parsed_password = encryptString(
      password,
      master_key
   )
   return parsed_password
}
export const useDecryptPassword = (password: string) => {
   const { decryptString } = new StringCrypto()
   const { master_key } = useAppSelector(state => state.auth)
   const parsed_password = decryptString(
      password,
      master_key
   )
   return parsed_password
}