import clsx from "clsx"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react"
import { FormElements } from "types"
import { IconLoading, Input, TogglePassword } from "~/components/Elements"
import { auth } from "~/firebase"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { getUser, login, setExperTime } from "~/slices/authSlice"
// @ts-expect-error
import secretKey from "secret-key"

const RegisterPage:NextPage = () => {
   const dispatch = useAppDispatch()
   const [error, setError] = useState("")
   const router = useRouter()
   const [loading, setLoading] = useState(false)
   const [password, setPassword] = useState("")
   const [confirm_password, setConfirmPassword] = useState("")

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
         await dispatch(login(
            elements.email.value, 
            elements.password.value
         ))
         await dispatch(getUser(
            secret_key
         ))
         dispatch(setExperTime())
         await router.replace("/")
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
               (confirm_password !== "" && password !== "") && (confirm_password === password) 
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
}

const GenerateKeys:FC<GenerateKeysProps> = ({
   confirm_password,
   password
}) => {
   return (
      <div className="flex text-sm text-yellow-400 relative py-2">
         <div className="absolute inset-0 flex items-center justify-center bg-main-primary/80">
            <button className={clsx(
               "uppercase font-bold py-0.5 px-2 rounded text-xs tracking-widest",
               (confirm_password !== "" && password !== "") && (confirm_password === password) 
               ? "bg-blue-600 hover:bg-blue-700 text-white" 
               : "text-gray-500 bg-gray-500/20"
            )}>
               Genereer
            </button>
         </div>
         <div className="flex space-x-2 items-center">
            <Input 
               className="w-1/4 text-center text-yellow-400 px-0" 
               placeholder="XXXX"
               defaultValue={""}
               name="secret_key_1"
            />
            <Input 
               className="w-1/4 text-center text-yellow-400 px-0" 
               placeholder="XXXX"
               defaultValue={""}
               name="secret_key_2"
            />
            <Input 
               className="w-1/4 text-center text-yellow-400 px-0" 
               placeholder="XXXX"
               defaultValue={""}
               name="secret_key_3"
            />
            <Input 
               className="w-1/4 text-center text-yellow-400 px-0" 
               placeholder="XXXX"
               defaultValue={""}
               name="secret_key_4"
            />
         </div>
      </div>
   )
}