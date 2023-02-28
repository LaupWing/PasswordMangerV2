import { SyntheticEvent } from "react"
import { Input } from "~/components/Elements"
import { useAppDispatch } from "~/redux/hooks"

const LoginPage = () => {
   const dispatch = useAppDispatch()

   const submitHandler = (e:SyntheticEvent) =>{
      e.preventDefault()
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
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400 px-0" 
                     placeholder="XXXX"
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400 px-0" 
                     placeholder="XXXX"
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400 px-0" 
                     placeholder="XXXX"
                  />
               </div>
               <Input className="w-full"/>
               <Input className="w-full" type={"password"}/>
            </div>
            <button className="bg-blue-600 uppercase text-sm tracking-wider font-bold flex justify-center items-center w-24 rounded mt-6 h-9 hover:bg-blue-700">
               Login
            </button>
         </form>
      </div>
   )
}
export default LoginPage
