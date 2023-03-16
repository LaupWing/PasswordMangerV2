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
            <meta name="description" content="Generated by create next app" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
      </AccountsDetail>
   )
}
export default FavoritesDetail
