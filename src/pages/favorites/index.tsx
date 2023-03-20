import Head from "next/head"
import { Accounts } from "~/components/Global"
import { fetchFavoriteAccounts } from "~/slices/accountsSlice"

export default function Favorites() {
   return (
      <Accounts 
         dispatchFunction={fetchFavoriteAccounts} 
         prefix="favorites"
      >
         <Head>
            <title>Lockkey: Favorites</title>
         </Head>
      </Accounts>
   )
}