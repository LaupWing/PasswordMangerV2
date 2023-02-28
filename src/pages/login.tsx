import { SyntheticEvent, useState } from "react"
import { Input } from "~/components/Elements"
import { useAppDispatch } from "~/redux/hooks"
import { login } from "~/slices/authSlice"

const LoginPage = () => {
   const dispatch = useAppDispatch()
   const [secretKey1, setSecretKey1] = useState("")
   const [secretKey2, setSecretKey2] = useState("")
   const [secretKey3, setSecretKey3] = useState("")
   const [secretKey4, setSecretKey4] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const submitHandler = (e:SyntheticEvent) =>{
      e.preventDefault()
      const secretKey = [secretKey1, secretKey2, secretKey3, secretKey4].join("-")
      dispatch(login(email, password, secretKey))
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
                     onChange={(e) => setSecretKey1(e.target.value)}
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400 px-0" 
                     placeholder="XXXX"
                     onChange={(e) => setSecretKey2(e.target.value)}
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400 px-0" 
                     placeholder="XXXX"
                     onChange={(e) => setSecretKey3(e.target.value)}
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400 px-0" 
                     placeholder="XXXX"
                     onChange={(e) => setSecretKey4(e.target.value)}
                  />
               </div>
               <Input 
                  className="w-full" 
                  placeholder="Email"
                  onChange={e => setEmail(e.target.value)}
               />
               <Input 
                  className="w-full" 
                  placeholder="Password" 
                  type={"password"}
                  onChange={e => setPassword(e.target.value)}
               />
            </div>
            <button className="bg-blue-600 uppercase text-sm tracking-wider font-bold flex justify-center items-center w-24 rounded mt-6 h-9 hover:bg-blue-700">
               Login
            </button>
         </form>
      </div>
   )
}
export default LoginPage
