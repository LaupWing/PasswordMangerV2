import "~/styles/globals.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
   return  (
      <div className="w-screen h-screen fixed inset-0 flex bg-main-primary">
         <Component {...pageProps} />
      </div>
   )
}
