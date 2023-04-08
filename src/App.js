import './App.css'
import { useAuth0} from '@auth0/auth0-react'
import React, {useState, useEffect} from 'react'
import Login from '@components/Buttons/login.js'
import Logout from '@components/Buttons/logoutButton.js'
import Profile from '@components/simple-profile.js'
import EmployeeList from '@components/Employees/employee-list.js'
import QuickMenu from '@components/quick-menu.js'
import Modal from './components/modal.js'
import AddEmployeeButton from '@components/Buttons/new-employee-button.js'
import EventForm from '@components/Schedule/event-form.js'
import EmployeeEditForm from '@components/Employees/employee-edit-form.js'
import NewEmployeeForm from '@components/Employees/employee-new-form.js'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import axios from 'axios'

const App = () => {
   const TARGET_URI = process.env.REACT_APP_DEV_URI;
   const {isAuthenticated, isLoading, user} = useAuth0();
   const [employeeList, setEmployeeList] = useState([])
   const [selectedEmployee, setSelectedEmployee] = useState(null)
   const [editMode, setEditMode] =useState(false)
   const [eventForm, setEventForm] = useState(false)
   const [schedule, setSchedule] = useState([])
   const [detailsView, setDetailsView ] = useState(false)
   const [formData, setFormData] = useState({})
   const [showModal, setShowModal] = useState(false)
   const [showEditModal, setShowEditModal] = useState(false)
   const [showNewEmployeeModal,setShowNewEmployeeModal ] = useState(false)
   const [message, setMessage] = useState('')
   const [feedbackAlert, setFeedbackAlert] = useState(false)

   const fetchSchedule = async () => {
      try{
         const response = await axios.get(`${TARGET_URI}/admin/${selectedEmployee._id}`)
         setSchedule(response.data.schedule)
      } catch(error){console.log(error)}
   }

   useEffect(() => {
     setFeedbackAlert(true)
   },[message])

   return (
      <>
         <div className="header">
          {user && <h4 className="user-name">Hello, {user.name}</h4>}
          <AddEmployeeButton
             selectedEmployee={selectedEmployee}
             showNewEmployeeModal={showNewEmployeeModal}
             setShowNewEmployeeModal={setShowNewEmployeeModal}/>
           <Login />
           <Logout />
         </div>
         {isLoading?<h3 className="loading-text">Loading...</h3>:
            <>
              <div className="main">
                {isAuthenticated && (
                  <>
                    <div className="dashboard">
                       <Profile
                         selectedEmployee={selectedEmployee}
                         fetchSchedule={fetchSchedule}
                         schedule={schedule}
                         setSchedule={setSchedule}
                         editMode={editMode}
                         setEditMode={setEditMode}
                         detailsView={detailsView}
                         setDetailsView={setDetailsView}
                         eventForm={eventForm}
                         setEventForm={setEventForm}
                         formData={formData}
                         setFormData={setFormData}
                         setShowEditModal={setShowEditModal}
                         setMessage={setMessage}/>
                       {showModal?
                          <Modal>
                            <EventForm
                               selectedEmployee={selectedEmployee}
                               eventForm={eventForm}
                               setEventForm={setEventForm}
                               fetchSchedule={fetchSchedule}
                               setShowModal={setShowModal}
                               setMessage={setMessage}/>
                          </Modal>
                       :null}
                       {showEditModal?
                         <Modal>
                            <EmployeeEditForm
                               setShowEditModal={setShowEditModal}
                               selectedEmployee={selectedEmployee}
                               setSelectedEmployee={setSelectedEmployee}/>
                         </Modal>
                       :null}
                       {showNewEmployeeModal?
                         <Modal>
                           <NewEmployeeForm
                              setShowNewEmployeeModal={setShowNewEmployeeModal}
                              selectedEmployee={selectedEmployee}
                              setSelectedEmployee={setSelectedEmployee}/>
                         </Modal>
                       :null}
                    </div>
                    <div className="main-top">
                       <div className="sideMenu">
                          <EmployeeList
                             employeeList={employeeList}
                             setEmployeeList={setEmployeeList}
                             setSelectedEmployee={setSelectedEmployee}
                             selectedEmployee={selectedEmployee}
                             setMessage={setMessage}/>
                       </div>
                       <div className="quick-menu">
                          {selectedEmployee?
                             <QuickMenu
                                selectedEmployee={selectedEmployee}
                                schedule={schedule}
                                fetchSchedule={fetchSchedule}
                                formData={formData}
                                eventForm={eventForm}
                                setEventForm={setEventForm}
                                showModal={showModal}
                                setShowModal={setShowModal}
                                message={message}
                                setMessage={setMessage}
                                detailsView={detailsView}
                                setDetailsView={setDetailsView}/>
                             :
                             <p>Select an employee to to clock in and out.</p>
                          }
                       </div>
                    </div>
                  </>
                )}
                {feedbackAlert &&
                  <Snackbar open={feedbackAlert} autoHideDuration={6000} onClose={() => setFeedbackAlert(false)}>
                    <Alert onClose={() => setFeedbackAlert(false)} severity="success" sx={{ width: '100%', color:'#7cff40'}}>
                      {message}
                    </Alert>
                  </Snackbar>
                }
              </div>
            </>
          }
      </>
   )
}

export default App;
