<<<<<<< HEAD
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
   const {logout, isAuthenticated} = useAuth0()
   return(
      isAuthenticated && (
         <button className="header-btn" onClick={()=>{logout()}}>
            Log Out
         </button>
      )
   )
}

export default LogoutButton
=======
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
   const {logout, isAuthenticated} = useAuth0()
   return(
      isAuthenticated && (
         <button onClick={() => {logout()} }>
            Log Out
         </button>
      )
   )
}

export default LogoutButton
>>>>>>> 6db1040 (trying to fix clockout function)
