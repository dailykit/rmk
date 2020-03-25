import React from 'react'

import { Header } from '../../sections'
import { ProfileLayout } from '../../components'

const Account = () => {
   return (
      <div>
         <Header onlyNav />
         <ProfileLayout>Account</ProfileLayout>
      </div>
   )
}

export default Account
