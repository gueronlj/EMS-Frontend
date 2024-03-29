import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
   const {logout, isAuthenticated} = useAuth0()
   return(
      isAuthenticated && (
         <button id="logout-btn" className="header-btn" onClick={()=>{logout()}}>
            Logout
         </button>
      )
   )
}

export default LogoutButton
