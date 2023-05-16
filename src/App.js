import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import AdminDashboard from '@components/admin-dashboard.js'
import { ColorRing } from  'react-loader-spinner'

const App = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  return (
    <>
      {isLoading?
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
      :
        <AdminDashboard
          isAuthenticated={isAuthenticated}
          user={user}/>
      }
    </>
  )
}

export default App;
