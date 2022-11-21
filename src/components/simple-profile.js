import { useAuth0 } from '@auth0/auth0-react'
import {useState, useEffect} from 'react'
import EmployeeList from './employee-list.js'
import Details from './employee-details.js'
import Schedule from './simple-schedule.js'
import EditEvent from './edit-event.js'
import QuickMenu from './quick-menu.js'

const Profile = (props) => {
   const { user, isAuthenticated, isLoading} = useAuth0();
   const [editTarget, setEditTarget ] = useState({id:'', name:'', value:null})
   const [formData, setFormData] = useState({})

   if (isLoading) return <p>Loading...</p>

   return (
      props.selectedEmployee &&(
         <div>
            <QuickMenu
               detailsView={props.detailsView}
               setDetailsView={props.setDetailsView}
               selectedEmployee={props.selectedEmployee}
               setSelectedEmployee={props.setSelectedEmployee}/>
            {props.detailsView?
               <>
                  <Details
                     selectedEmployee={props.selectedEmployee}
                     setSchedule={props.setSchedule}/>
                  <Schedule
                     selectedEmployee={props.selectedEmployee}
                     editTarget={editTarget}
                     setEditTarget={setEditTarget}
                     setEditMode={props.setEditMode}
                     editMode={props.editMode}
                     formData={formData}
                     setFormData={setFormData}
                     schedule={props.schedule}
                     fetchSchedule={props.fetchSchedule}/>
                  {props.editMode?
                     <EditEvent
                        editTarget={editTarget}
                        editMode={props.editMode}
                        setEditMode={props.setEditMode}
                        formData={formData}
                        setFormData={setFormData}
                        selectedEmployee={props.selectedEmployee}
                        fetchSchedule={props.fetchSchedule}/>
                     :<></>
                  }
               </>
               :<></>
            }
         </div>
      )
   )
}

export default Profile
