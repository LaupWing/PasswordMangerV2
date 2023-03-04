import "~/styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { store } from "~/redux/store"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "~/firebase"
import { useState } from "react"

export default function App({ Component, pageProps }: AppProps) {
   const [loaded, setLoaded] = useState(false)
   onAuthStateChanged(auth, (user) => {
      setLoaded(true)
   })
   if(!loaded){
      return null
   }
   return  (
      <Provider store={store}>
         <div className="w-screen h-screen fixed inset-0 flex bg-main-primary">
            <Component {...pageProps} />
         </div>
      </Provider>
   )
}
