import { useAuth0 } from '@auth0/auth0-react'
import {useState} from 'react'
import Details from './employee-details.js'
import Schedule from './simple-schedule.js'
import EditEvent from './edit-event.js'
import GenerateReport from './generate-report.js'

const Profile = (props) => {
   const {isLoading} = useAuth0();
   const [editTarget, setEditTarget] = useState({id:'', name:'', value:null})

   if (isLoading) return <p>Loading...</p>
   return (
      props.selectedEmployee &&(
         <>
            {props.detailsView?<>
               <Schedule
                  selectedEmployee={props.selectedEmployee}
                  editTarget={editTarget}
                  setEditTarget={setEditTarget}
                  setEditMode={props.setEditMode}
                  editMode={props.editMode}
                  setFormData={props.setFormData}
                  schedule={props.schedule}
                  fetchSchedule={props.fetchSchedule}/>
               {props.editMode?
                  <EditEvent
                     editTarget={editTarget}
                     editMode={props.editMode}
                     setEditMode={props.setEditMode}
                     formData={props.formData}
                     setFormData={props.setFormData}
                     selectedEmployee={props.selectedEmployee}
                     fetchSchedule={props.fetchSchedule}/>
               :<></>}
               <Details
                  selectedEmployee={props.selectedEmployee}
                  setSchedule={props.setSchedule}/>
               <GenerateReport
                  fetchSchedule={props.fetchSchedule}
                  setSchedule={props.setSchedule}
                  schedule={props.schedule}
                  selectedEmployee={props.selectedEmployee}/></>
            :<></>}
         </>
      )
   )
}
export default Profile
