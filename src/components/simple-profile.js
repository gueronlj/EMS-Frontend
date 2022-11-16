import { useAuth0 } from '@auth0/auth0-react'
import {useState, useEffect} from 'react'
import EmployeeList from './employee-list.js'
import Details from './employee-details.js'
import Schedule from './simple-schedule.js'

const Profile = (props) => {
   const { user, isAuthenticated, isLoading} = useAuth0();
   const [schedule, setSchedule] = useState([])

   if (isLoading) return <p>Loading...</p>

   return (
      props.selectedEmployee && isAuthenticated &&(
         <div>
            <Details
               selectedEmployee={props.selectedEmployee}
                  setSchedule={setSchedule}/>
            <Schedule
               selectedEmployee={props.selectedEmployee}
               schedule={schedule}/>
         </div>
      )
   )
}

export default Profile
