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
            <div className="space-y-4">
               <div className="flex space-x-2 items-center font-bold text-yellow-400">
                  <Input 
                     className="w-1/4 text-center text-yellow-400" 
                     placeholder="XXXX"
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400" 
                     placeholder="XXXX"
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400" 
                     placeholder="XXXX"
                  />
                  <Input 
                     className="w-1/4 text-center text-yellow-400" 
                     placeholder="XXXX"
                  />
               </div>
               <Input className="w-full"/>
               <Input className="w-full"/>
            </div>
            <button className="bg-blue-600 uppercase text-sm tracking-wider font-bold flex justify-center items-center w-24 rounded mt-6 h-9 hover:bg-blue-700">
               Login
            </button>
         </form>
      </div>
   )
}
export default LoginPage
