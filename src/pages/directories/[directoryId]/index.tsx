import Head from "next/head"
import { useRouter } from "next/router"
import { Accounts } from "~/components/Global"
import { getDirectoryAccounts } from "~/slices/accountsSlice"

export default function Directory() {
   const router = useRouter()
   const id = router!.query!.directoryId as string 
   
   return (
      <Accounts 
         dispatchFunction={() => getDirectoryAccounts(id)} 
         prefix={`directories/${id}`}
         in_directory={id}
      >
         <Head>
            <title>Lockkey: Map</title>
         </Head>
      </Accounts>
   )
}