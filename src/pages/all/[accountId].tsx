import { NextPage } from "next"
import Head from "next/head"
import { AccountsDetail } from "~/components/Global"
import { fetchAccounts } from "~/slices/accountsSlice"

const AccountDetail:NextPage = () => {
   return (
      <AccountsDetail dispatchFunction={fetchAccounts}>
         <Head>
            <title>All Passwords</title>
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
export default AccountDetail
