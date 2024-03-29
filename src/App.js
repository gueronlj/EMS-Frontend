import './App.css'
import { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react'
import AdminDashboard from '@components/AdminDashboard/admin-dashboard.js'
import BasicDashboard from '@components/BasicDashboard/basic-dashboard.js'
import { ColorRing } from  'react-loader-spinner'
import {Routes, Route} from 'react-router-dom'

const App = () => {
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false)

  const checkAdmin = () => {
    const adminList = [
      'petertran.pfs@gmail.com',
      'gueronlj@gmail.com',
      'nhtran87@gmail.com'
    ]
    if ( adminList.includes(user?.email) ) {
      setIsAdmin(true)
    }
  }

  useEffect(() => {
    checkAdmin()
  })

  if ( isLoading ) {
    return(
      <div className="main" >
        <img id="loading-logo" src="/images/favicon.ico" alt="Hangry Panda Logo"/>
        <div className="loading-screen-text">
          <h1>Employee Management System</h1>
        </div>
        <div className="loading-spinner">
          <ColorRing
            visible={true}
            height="140"
            width="140"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#192231', '#98878F', '#494E6B', '#56f4de', '#849b87']}
          />
        </div>
      </div>
    )
  } else {
    //console.log(UserContext);
    if ( isAuthenticated ) {
      if( isAdmin ){
        return(
          <AdminDashboard
              isAdmin={isAdmin}
              user={user}/>    
        )
      } else {
        return(
          <BasicDashboard
            isAdmin={isAdmin}
            user={user}/>        
        )
      }
    } else {
      loginWithRedirect()
    }
  }
}

export default App;
