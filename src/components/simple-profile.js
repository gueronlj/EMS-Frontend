<<<<<<< HEAD
import { useAuth0 } from '@auth0/auth0-react'
import {useState} from 'react'
import Details from './employee-details.js'
import Schedule from './simple-schedule.js'
import EditEvent from './edit-event.js'
import GenerateReport from './generate-report.js'
import Paper from '@mui/material/Paper'
import ReportFilters from './report-filters.js'
import EditProfileBtn from './edit-profile-button.js'

const Profile = (props) => {
   const {isLoading} = useAuth0();
   const [editTarget, setEditTarget] = useState({id:'', name:'', value:null})
   const [totalDays, setTotalDays] = useState(0)
   const [totalHours, setTotalHours] = useState(0)
   const [totalDailyWages, setTotalDailyWages] = useState(0)
   const [totalHourlyWages, setTotalHourlyWages] = useState(0)

   if (isLoading) return <p>Loading...</p>
   return (
      props.selectedEmployee &&(
         <>
            {props.detailsView?<>
                  <h1>{props.selectedEmployee.name}</h1>
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
               <Paper elevation={3}>
                  <div className = "details-card">
                     <div className="report-filters">
                        <ReportFilters
                           setSchedule={props.setSchedule}
                           schedule={props.schedule}
                           selectedEmployee={props.selectedEmployee}
                           setTotalDays={setTotalDays}
                           setTotalHours={setTotalHours}
                           setTotalHourlyWages={setTotalHourlyWages}
                           setTotalDailyWages={setTotalDailyWages}/>
                     </div>
                     <Details
                        selectedEmployee={props.selectedEmployee}
                        setSchedule={props.setSchedule}/>
                     <GenerateReport
                        fetchSchedule={props.fetchSchedule}
                        setSchedule={props.setSchedule}
                        schedule={props.schedule}
                        selectedEmployee={props.selectedEmployee}
                        totalDays={totalDays}
                        totalHours={totalHours}
                        totalHourlyWages={totalHourlyWages}
                        totalDailyWages={totalDailyWages}/>
                     <EditProfileBtn
                        selectedEmployee={props.selectedEmployee}
                        setShowEditModal={props.setShowEditModal}/>
                  </div>
               </Paper>
            </>
            :<></>}
         </>
      )
   )
}
export default Profile
=======
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
               selectedEmployee={props.selectedEmployee}
               fetchSchedule={props.fetchSchedule}/>
      {props.detailsView?<>
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
         }</>
         :<></>
      }
      </div>
      )
   )
}

export default Profile
>>>>>>> 6db1040 (trying to fix clockout function)
