import Head from "next/head"
import { useRouter } from "next/router"
import { Accounts } from "~/components/Global"
import { useAppDispatch } from "~/redux/hooks"
import { getDirectoryAccounts } from "~/slices/accountsSlice"

export default function Favorites() {
   const dispatch = useAppDispatch()
   const router = useRouter()
   dispatch(getDirectoryAccounts(router!.query!.directoryId as string))
   return (
      <div>
         Test
      </div>
   )
}