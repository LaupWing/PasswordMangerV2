import { NextPage } from "next"
import Head from "next/head"
import { AccountsDetail } from "~/components/Global"
import { fetchFavoriteAccounts } from "~/slices/accountsSlice"

const FavoritesDetail:NextPage = () => {
   return (
      <AccountsDetail 
         dispatchFunction={fetchFavoriteAccounts}
         prefix="favorites"
      >
         <Head>
            <title>Favorites</title>
         </Head>
      </AccountsDetail>
   )
}
export default FavoritesDetail
