import './App.css'
import { useContext, createContext, useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react'
import AdminDashboard from '@components/admin-dashboard.js'
import BasicDashboard from '@components/BasicDashboard/basic-dashboard.js'
import { ColorRing } from  'react-loader-spinner'

const App = () => {
  const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false)

  const checkAdmin = () => {
    const adminList = [
      'petertran.pfs@gmail.com',
      'gueronlj@gmail.com'
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
        <img src="/images/favicon.ico" alt="Hangry Panda Logo"/>
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
