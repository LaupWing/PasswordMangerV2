import { Input } from "~/components/Elements"

const LoginPage = () => {
   return (
      <div className="flex items-center flex-1">
         <form className="w-64 mx-auto flex flex-col items-center text-white text-sm">
            <img 
               src="/assets/logo.png" 
               alt="logo" 
               className="w-28 mb-8"
            />
            <div className="flex mb-4 space-x-1 items-center font-bold text-yellow-400">
               <Input className="w-1/4"/>
               <Input className="w-1/4"/>
               <Input className="w-1/4"/>
               <Input className="w-1/4"/>
            </div>
         </form>
      </div>
   )
}
export default LoginPage
