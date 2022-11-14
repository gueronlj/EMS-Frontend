import { useAuth0 } from '@auth0/auth0-react'
import EmployeeList from './employee-list.js'
import MonthlyCalendar from './calendar.js'

const Profile = () => {
   const { user, isAuthenticated, isLoading} = useAuth0();

   if (isLoading) return <p>Loading...</p>

   return (
      isAuthenticated && (
         <div>
            <h2>Hello, {user.name}!</h2>
            <EmployeeList/>
            <h2>Current Week</h2>
            <p>This week's schedule here.</p>
            <h2>Monthly</h2>
            <MonthlyCalendar/>
         </div>
      )
   )
}

export default Profile
