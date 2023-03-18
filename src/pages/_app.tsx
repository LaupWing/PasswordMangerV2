import "~/styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { store } from "~/redux/store"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "~/firebase"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { Layout } from "~/components/Global"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }: AppProps) {
   const [loaded, setLoaded] = useState(false)
   const router = useRouter()
   onAuthStateChanged(auth, () => {
      setLoaded(true)
   })
   if(!loaded){
      return null
   }
   if(router.asPath.includes("login") || router.asPath.includes("register")){
      return (
         <Provider store={store}>
            <div className="w-screen h-screen fixed inset-0 flex bg-main-primary">
               <Component {...pageProps} />
            </div>
         </Provider>
      )
   }
   return  (
      <Provider store={store}>
         <div className="w-screen h-screen fixed inset-0 flex bg-main-primary">
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </div>
         <Toaster
            containerStyle={{
               padding: 0,
               margin: 0
            }}
            toastOptions={{
               style: {
                  margin: 0,
                  padding: 0,
                  background: "transparent",
                  boxShadow: "none",
                  maxWidth: "900px"
               },
               duration: 5000,
            }}
         />
      </Provider>
   )
}
