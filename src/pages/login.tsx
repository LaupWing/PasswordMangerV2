import { FormEvent, SyntheticEvent, useState } from "react"
import { ColorRing } from "react-loader-spinner"
import { FormElements } from "types"
import { IconLoading, Input } from "~/components/Elements"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { login } from "~/slices/authSlice"

const LoginPage = () => {
   const dispatch = useAppDispatch()
   const { secret_key } = useAppSelector(state => state.auth)
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)

   const submitHandler = async (e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      const elements = e.currentTarget.elements as FormElements<
         "secret_key_1" |
         "secret_key_2" |
         "secret_key_3" |
         "secret_key_4" 
      >
      // setLoading(true)
      // const secretKey = [secretKey1, secretKey2, secretKey3, secretKey4].join("-")
      // try{
      //    await dispatch(login(email, password, secretKey))
      //    console.log("Success")
      // }catch(e: any){
      //    setError(e.message.replace("Error: ", ""))
      // }
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
               <div className="flex text-sm space-x-2 items-center font-semibold text-yellow-400">
                  <Input 
                     className="w-1/4 text-center text-yellow-400 px-0" 
                     placeholder="XXXX"
                     defaultValue={secret_key.split("-")[0] || ""}
                     name="secret_key_1"
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400 px-0" 
                     placeholder="XXXX"
                     defaultValue={secret_key.split("-")[1] || ""}
                     name="secret_key_2"
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400 px-0" 
                     placeholder="XXXX"
                     defaultValue={secret_key.split("-")[2] || ""}
                     name="secret_key_3"
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400 px-0" 
                     placeholder="XXXX"
                     defaultValue={secret_key.split("-")[3] || ""}
                     name="secret_key_4"
                  />
               </div>
               <Input 
                  className="w-full" 
                  placeholder="Email"
                  defaultValue={""}
                  />
               <Input 
                  className="w-full" 
                  placeholder="Password" 
                  type={"password"}
                  defaultValue={""}
               />
            </div>
            {error && (
               <p className="text-red-500 mt-2 text-center">
                  {error}
               </p>
            )}
            <button className="bg-blue-600 uppercase text-sm tracking-wider font-bold flex justify-center items-center w-24 rounded mt-6 h-9 hover:bg-blue-700">
               {loading 
                  ? <IconLoading width={40} height={40}/>
                  : "Submit"
               }
            </button>
         </form>
      </div>
   )
}
export default LoginPage
