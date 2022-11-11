import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
   const { user, isAuthenticated, isLoading} = useAuth0();

   if (isLoading) return <p>Loading...</p>
   
   return (
      isAuthenticated && (
         <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
         {JSON.stringify(user)}
         </div>
      )
   )
}

export default Profile
