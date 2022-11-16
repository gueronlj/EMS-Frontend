import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import React, {useState, useEffect} from 'react'
import Login from './components/login.js'
import Logout from './components/logoutButton.js'
import Profile from './components/simple-profile.js'
import EmployeeList from './components/employee-list.js'
import AddEvent from './components/add-event.js'
import EventForm from './components/event-form.js'

const App = () => {

   const { user, isAuthenticated, isLoading} = useAuth0();
   const [employeeList, setEmployeeList] = useState([])
   const [selectedEmployee, setSelectedEmployee] = useState(null)
   const [eventForm, setEventForm] = useState(false)

   return (
      <>
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
               selectedEmployee={selectedEmployee}
               />
            <button>New employee</button>
            <AddEvent
               eventForm={eventForm}
               setEventForm={setEventForm}
               selectedEmployee={selectedEmployee}/>
         </div>
      )}
         <div className="dashboard">
            <Profile
               setEmployeeList={setEmployeeList}
               setSelectedEmployee={setSelectedEmployee}
               selectedEmployee={selectedEmployee}/>
            {eventForm?
               <EventForm
                  employeeList={employeeList}
                  selectedEmployee={selectedEmployee}
                  setEventForm={setEventForm}/>
            :<></>}
         </div>
      </div>
      </>
   )
}

export default App;
