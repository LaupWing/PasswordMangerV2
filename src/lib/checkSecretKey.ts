import { doc, getDoc } from "firebase/firestore"
import StringCrypto from "string-crypto"
import { db } from "~/firebase"

export default async (secretKey: string, userId: string) => {
   const { decryptString } = new StringCrypto()  
   const containsNonLatinCodepoints = (s:string) => {
      return /[^\u0000-\u00ff]/.test(s)
   }
   const { secret } = (await getDoc(doc(db, "secret_key", userId))).data()!
   const masterKey = decryptString(secret, secretKey)
   if(containsNonLatinCodepoints(masterKey)){
      throw new Error("Invalid secret key")
   }
}