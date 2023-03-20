import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { AccountsDetail } from "~/components/Global"
import { getDirectoryAccounts } from "~/slices/accountsSlice"

const DirectoryDetail:NextPage = () => {
   const router = useRouter()
   const id = router!.query!.directoryId as string 
   return (
      <AccountsDetail 
         dispatchFunction={() => getDirectoryAccounts(id)}
         prefix={`directories/${id}`}
      >
         <Head>
            <title>Lockkey Map </title>
         </Head>
      </AccountsDetail>
   )
}
export default DirectoryDetail