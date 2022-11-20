import { useAuth0 } from '@auth0/auth0-react'
import {useState, useEffect} from 'react'
import EmployeeList from './employee-list.js'
import Details from './employee-details.js'
import Schedule from './simple-schedule.js'
import EditEvent from './edit-event.js'

const Profile = (props) => {
   const { user, isAuthenticated, isLoading} = useAuth0();
   const [editTarget, setEditTarget ] = useState({id:'', name:'', value:null})
   const [editMode, setEditMode] =useState(false)
   const [formData, setFormData] = useState({})

   if (isLoading) return <p>Loading...</p>

   return (
      props.selectedEmployee && isAuthenticated &&(
         <div>
            <Details
               selectedEmployee={props.selectedEmployee}
               setSchedule={props.setSchedule}/>
            <Schedule
               selectedEmployee={props.selectedEmployee}
               editTarget={editTarget}
               setEditTarget={setEditTarget}
               setEditMode={setEditMode}
               editMode={editMode}
               formData={formData}
               setFormData={setFormData}
               schedule={props.schedule}
               fetchSchedule={props.fetchSchedule}/>
            {editMode?
               <EditEvent
                  editTarget={editTarget}
                  editMode={editMode}
                  formData={formData}
                  setFormData={setFormData}
                  selectedEmployee={props.selectedEmployee}
                  fetchSchedule={props.fetchSchedule}/>
               :<></>
            }
         </div>
      )
   )
}

export default Profile
