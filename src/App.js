import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import React, {useState, useEffect} from 'react'
import Login from './components/login.js'
import Logout from './components/logoutButton.js'
import Profile from './components/simple-profile.js'
import EmployeeList from './components/employee-list.js'
import AddEvent from './components/add-event.js'
import EventForm from './components/event-form.js'
import DetailsButton from './components/details-button.js'
import axios from 'axios'

const App = () => {

   const { user, isAuthenticated, isLoading} = useAuth0();
   const [employeeList, setEmployeeList] = useState([])
   const [selectedEmployee, setSelectedEmployee] = useState(null)
   const [editMode, setEditMode] =useState(false)
   const [eventForm, setEventForm] = useState(false)
   const [schedule, setSchedule] = useState()
   const [addEventText, setAddEventText] = useState("Add event")
   const [detailsView, setDetailsView ] = useState(false)

   const fetchSchedule = async () => {
      try{
         const response = await axios.get(`http://localhost:3001/admin/${selectedEmployee._id}`)
         setSchedule(response.data.schedule)
      } catch(error){console.log(error)}
   }

   const handleAddEvent =() => {
      if(eventForm){
         setEventForm(false);
         setAddEventText('Add event')
      } else{
         setEventForm(true);
         setAddEventText('Cancel')
      }
   }

   return (<>
      <div className="header">
         <Login />
         <Logout />
      </div>
      <div className="main">
      {isAuthenticated &&(
         <div className="sideMenu">
            <EmployeeList
               employeeList={employeeList}
               setEmployeeList={setEmployeeList}
               setSelectedEmployee={setSelectedEmployee}
               selectedEmployee={selectedEmployee}/>
            <AddEvent
               selectedEmployee={selectedEmployee}
               handleAddEvent={handleAddEvent}
               addEventText={addEventText}/>
            <DetailsButton
               selectedEmployee={selectedEmployee}
               detailsView={detailsView}
               setDetailsView={setDetailsView}/>
         </div>
      )}
         <div className="dashboard">
            <Profile
               selectedEmployee={selectedEmployee}
               fetchSchedule={fetchSchedule}
               schedule={schedule}
               setSchedule={setSchedule}
               editMode={editMode}
               setEditMode={setEditMode}
               detailsView={detailsView}/>
         {eventForm?
            <EventForm
               selectedEmployee={selectedEmployee}
               eventForm={eventForm}
               fetchSchedule={fetchSchedule}/>
         :<></>}
         </div>
      </div>
   </>)
}

export default App;
