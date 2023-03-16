import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { AccountsDetail } from "~/components/Global"
import { fetchFavoriteAccounts, getDirectoryAccounts } from "~/slices/accountsSlice"

const DirectoryDetail:NextPage = () => {
   const router = useRouter()
   const id = router!.query!.directoryId as string 
   return (
      <AccountsDetail 
         dispatchFunction={() => getDirectoryAccounts(id)}
         prefix={`/directories/${id}`}
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
export default DirectoryDetail