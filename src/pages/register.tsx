import clsx from "clsx"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react"
import { FormElements, SecretKey } from "types"
import { IconLoading, Input, TogglePassword } from "~/components/Elements"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { getUser, login, register, setExperTime } from "~/slices/authSlice"
import cryptoRandomString from "crypto-random-string"
// @ts-expect-error
import secretKey from "secret-key"
import StringCrypto from "string-crypto"

const RegisterPage:NextPage = () => {
   const dispatch = useAppDispatch()
   const [error, setError] = useState("")
   const router = useRouter()
   const [loading, setLoading] = useState(false)
   const [password, setPassword] = useState("")
   const [confirm_password, setConfirmPassword] = useState("")
   const [secret, setSecret] = useState<SecretKey|false>(false)

   if(auth.currentUser){
      router.replace("/")
      return null
   }

   const submitHandler = async (e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      const elements = e.currentTarget.elements as FormElements<
         "secret_key_1" |
         "secret_key_2" |
         "secret_key_3" |
         "secret_key_4" |
         "email" |
         "password"
      >
      setLoading(true)
      const secret_key = [
         elements.secret_key_1.value, 
         elements.secret_key_2.value, 
         elements.secret_key_3.value, 
         elements.secret_key_4.value
      ].join("-")
      try{
         if(secret){
            await dispatch(register(
               elements.email.value,
               elements.password.value,
               secret,
               secret_key
            ))
         }
         // await dispatch(login(
         //    elements.email.value, 
         //    elements.password.value
         // ))
         // await dispatch(getUser(
         //    secret_key
         // ))
         // dispatch(setExperTime())
         // await router.replace("/")
      }catch(e: any){
         setError(e.message.replace("Error: ", ""))
      }
      setLoading(false)
   }

   return (
      <div className="flex items-center flex-1">
         <form 
            className="w-64 mx-auto flex flex-col items-center text-white text-sm"
            onSubmit={submitHandler}
         >
            <img 
               src="/assets/logo.png" 
               alt="logo" 
               className="w-28 mb-8"
            />
            <div className="space-y-4">
               <MainInfo
                  setConfirmPassword={setConfirmPassword}
                  setPassword={setPassword}
               />
               <GenerateKeys 
                  confirm_password={confirm_password}
                  password={password}
                  setSecret={setSecret}
               />
            </div>
            {error && (
               <p className="text-red-500 mt-2 text-center">
                  {error}
               </p>
            )}
            <Link className="mt-2 mr-auto text-blue-600" href={"/login"}>
               Inloggen
            </Link>
            <button className={clsx(
               "uppercase text-sm tracking-wider font-bold flex justify-center items-center w-24 rounded mt-6 h-9",
               secret
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "text-gray-500/40 bg-gray-500/10"
            )}>
               {loading 
                  ? <IconLoading width={40} height={40}/>
                  : "Submit"
               }
            </button>
         </form>
      </div>
   )
}
export default RegisterPage

interface MainInfoProps {
   setConfirmPassword: Dispatch<SetStateAction<string>>
   setPassword: Dispatch<SetStateAction<string>>
} 
const MainInfo:FC<MainInfoProps> = ({
   setConfirmPassword,
   setPassword
}) => {
   const [show_password, setShowPassword] = useState(false)
   const [show_confirm_password, setShowConfirmPassword] = useState(false)

   return (
      <>
         <Input 
            className="w-full" 
            autoComplete="username"
            placeholder="Email"
            defaultValue={""}
            name="email"
         />
         <div className="flex items-center space-x-1">
            <Input 
               className="w-full" 
               placeholder="Wachtwoord" 
               type={show_password ? "text" : "password"}
               defaultValue={""}
               autoComplete="new-password"
               name="password"
               onChange={e => setPassword(e.target.value)}
            />
            <TogglePassword
               setShowPassword={setShowPassword}
               show_password={show_password}
            />
         </div>
         <div className="flex items-center space-x-1">
            <Input 
               className="w-full" 
               placeholder="Wachtwoord bevestigen" 
               type={show_confirm_password ? "text" : "password"}
               defaultValue={""}
               autoComplete="new-password"
               name="password_confirm"
               onChange={e => setConfirmPassword(e.target.value)}
            />
            <TogglePassword
               setShowPassword={setShowConfirmPassword}
               show_password={show_confirm_password}
            />
         </div>
      </>
   )
}


interface GenerateKeysProps {
   confirm_password: string
   password: string
   setSecret: Dispatch<SetStateAction<SecretKey|false>>
}

const GenerateKeys:FC<GenerateKeysProps> = ({
   confirm_password,
   password,
   setSecret
}) => {
   const [secret_key_1, setSecretKey1] = useState("")
   const [secret_key_2, setSecretKey2] = useState("")
   const [secret_key_3, setSecretKey3] = useState("")
   const [secret_key_4, setSecretKey4] = useState("")
   const generate = () => {
      const { encryptString } = new StringCrypto()
      const secret_key = [...new Array(4)]
         .map((_)=>{
            const crypto_string = cryptoRandomString({
               length: 4, 
               type: "alphanumeric",
            }) 
            // Not using eval here but it works
            // eval(`setSecretKey${i + 1}("${crypto_string}")`)
            return crypto_string
         })
         .join("-")
      const [
         _secrect_key1,
         _secrect_key2,
         _secrect_key3,
         _secrect_key4,
      ] = secret_key.split("-")
      setSecretKey1(_secrect_key1)
      setSecretKey2(_secrect_key2)
      setSecretKey3(_secrect_key3)
      setSecretKey4(_secrect_key4)
      const secret_key_obj = secretKey.create(secret_key)
      const secret = encryptString(secret_key_obj.secret, secret_key)
      
      alert("Scrhijf je privacy sleutels ergens op!")
      setSecret({
         ...secret_key_obj,
         secret
      })
   }
   const keys = [secret_key_1 ,secret_key_2, secret_key_3, secret_key_4]
   return (
      <div className="flex text-sm text-yellow-400 relative py-2">
         {keys.some(x => x === "") && (
            <div className="absolute inset-0 flex items-center justify-center bg-main-primary/80">
               <button 
                  type="button"
                  className={clsx(
                     "uppercase font-bold py-0.5 px-2 rounded text-xs tracking-widest",
                     (confirm_password !== "" && password !== "") && (confirm_password === password) 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "text-gray-500 bg-gray-500/20 pointer-events-none"
                  )}
                  onClick={generate}
               >
                  Genereer
               </button>
            </div>
         )}
         <div className="flex space-x-2 items-center">
            <Input 
               className="w-1/4 text-center text-yellow-400 px-0" 
               placeholder="XXXX"
               readOnly
               name="secret_key_1"
               value={secret_key_1}
            />
            <Input 
               className="w-1/4 text-center text-yellow-400 px-0" 
               placeholder="XXXX"
               readOnly
               name="secret_key_2"
               value={secret_key_2}
            />
            <Input 
               className="w-1/4 text-center text-yellow-400 px-0" 
               placeholder="XXXX"
               readOnly
               name="secret_key_3"
               value={secret_key_3}
            />
            <Input 
               className="w-1/4 text-center text-yellow-400 px-0" 
               placeholder="XXXX"
               value={secret_key_4}
               name="secret_key_4"
               readOnly
            />
         </div>
      </div>
   )
}