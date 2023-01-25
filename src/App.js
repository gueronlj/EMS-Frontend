import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import React, {useState} from 'react'
import Login from './components/login.js'
import Logout from './components/logoutButton.js'
import Profile from './components/simple-profile.js'
import EmployeeList from './components/employee-list.js'
import EventForm from './components/event-form.js'
import DetailsButton from './components/details-button.js'
import ReportButton from './components/report-button.js'
import GenerateReport from './components/generate-report.js'
import QuickMenu from './components/quick-menu.js'
import axios from 'axios'

const App = () => {
   const {isAuthenticated} = useAuth0();
   const [employeeList, setEmployeeList] = useState([])
   const [selectedEmployee, setSelectedEmployee] = useState(null)
   const [editMode, setEditMode] =useState(false)
   const [eventForm, setEventForm] = useState(false)
   const [schedule, setSchedule] = useState()
   const [detailsView, setDetailsView ] = useState(false)
   const [formData, setFormData] = useState({})

   const fetchSchedule = async () => {
      try{
         const response = await axios.get(`http://localhost:3001/admin/${selectedEmployee._id}`)
         setSchedule(response.data.schedule)
      } catch(error){console.log(error)}
   }

   return (<>
      <div className="header">
         <Login />
         <Logout />
      </div>
      <div className="main">
         {isAuthenticated &&(<>
            <div className="main-top">
               <div className="sideMenu">
                  <EmployeeList
                     employeeList={employeeList}
                     setEmployeeList={setEmployeeList}
                     setSelectedEmployee={setSelectedEmployee}
                     selectedEmployee={selectedEmployee}/>
                  <DetailsButton
                     selectedEmployee={selectedEmployee}
                     detailsView={detailsView}
                     setDetailsView={setDetailsView}/>
               </div>
               <div className="quick-menu">
                  {selectedEmployee&&(
                     <QuickMenu
                        selectedEmployee={selectedEmployee}
                        schedule={schedule}
                        fetchSchedule={fetchSchedule}
                        formData={formData}
                        eventForm={eventForm}
                        setEventForm={setEventForm}/>
                  )}
               </div>
            </div>
            <div className="dashboard">
               <Profile
                  selectedEmployee={selectedEmployee}
                  fetchSchedule={fetchSchedule}
                  schedule={schedule}
                  setSchedule={setSchedule}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  detailsView={detailsView}
                  eventForm={eventForm}
                  setEventForm={setEventForm}
                  formData={formData}
                  setFormData={setFormData}/>
               {eventForm?
                  <EventForm
                     selectedEmployee={selectedEmployee}
                     eventForm={eventForm}
                     fetchSchedule={fetchSchedule}/>
                  :<></>}
            </div>
         </>)}
      </div>
   </>)
}

export default App;
