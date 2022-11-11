import React from 'react'
import Login from './components/login.js'
import Logout from './components/logoutButton.js'
import Profile from './components/profile.js'

const App = () => {
  return (
    <div className="dashboard">
      <Login />
      <Logout />
      <Profile />
    </div>
  )
}

export default App;
