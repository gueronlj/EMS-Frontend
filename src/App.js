import './App.css'
import { useAuth0 } from '@auth0/auth0-react'
import React, {useState} from 'react'
import Login from './components/login.js'
import Logout from './components/logoutButton.js'
import Profile from './components/simple-profile.js'
import EmployeeList from './components/employee-list.js'
import DetailsButton from './components/details-button.js'
import QuickMenu from './components/quick-menu.js'
import Modal from './components/modal.js'
import EmployeeEditModal from './components/employee-edit-modal.js'
import AddEmployeeButton from './components/new-employee-button.js'
import NewEmployeeModal from './components/employee-new-modal.js'
import axios from 'axios'

const App = () => {
   const TARGET_URI = process.env.REACT_APP_DEV_URI;
   const {isAuthenticated} = useAuth0();
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

   const fetchSchedule = async () => {
      try{
         const response = await axios.get(`${TARGET_URI}/admin/${selectedEmployee._id}`)
         setSchedule(response.data.schedule)
      } catch(error){console.log(error)}
   }

   return (<>
      <div className="header">
         <AddEmployeeButton
            selectedEmployee={selectedEmployee}
            showNewEmployeeModal={showNewEmployeeModal}
            setShowNewEmployeeModal={setShowNewEmployeeModal}/>
         <DetailsButton
            selectedEmployee={selectedEmployee}
            detailsView={detailsView}
            setDetailsView={setDetailsView}/>
          <Login />
          <Logout />
      </div>
      <div className="main">
         {isAuthenticated &&(<>
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
                 setShowEditModal={setShowEditModal}/>
              {showModal?
                 <Modal
                    selectedEmployee={selectedEmployee}
                    eventForm={eventForm}
                    setEventForm={setEventForm}
                    fetchSchedule={fetchSchedule}
                    setShowModal={setShowModal}/>
                 :null}
               {showEditModal?
                 <EmployeeEditModal
                   setShowEditModal={setShowEditModal}
                   selectedEmployee={selectedEmployee}
                   setSelectedEmployee={setSelectedEmployee}/>
               :null}
               {showNewEmployeeModal?
                 <NewEmployeeModal
                   setShowNewEmployeeModal={setShowNewEmployeeModal}
                   selectedEmployee={selectedEmployee}
                   setSelectedEmployee={setSelectedEmployee}/>
               :null}
           </div>
            <div className="main-top">
               <div className="sideMenu">
                  <EmployeeList
                     employeeList={employeeList}
                     setEmployeeList={setEmployeeList}
                     setSelectedEmployee={setSelectedEmployee}
                     selectedEmployee={selectedEmployee}/>
               </div>
               <div className="quick-menu">
                  {selectedEmployee&&(
                     <QuickMenu
                        selectedEmployee={selectedEmployee}
                        schedule={schedule}
                        fetchSchedule={fetchSchedule}
                        formData={formData}
                        eventForm={eventForm}
                        setEventForm={setEventForm}
                        showModal={showModal}
                        setShowModal={setShowModal}/>
                  )}
               </div>
            </div>

         </>)}
      </div>
   </>)
}

export default App;
