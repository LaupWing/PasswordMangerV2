import Head from "next/head"
import { Accounts } from "~/components/Global"
import { fetchAccounts } from "~/slices/accountsSlice"

export default function Home() {
   return (
      <Accounts 
         dispatchFunction={fetchAccounts}
         prefix="all"
      >
         <Head>
            <title>All Passwords</title>
            <meta name="description" content="Generated by create next app" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
      </Accounts>
   )
}