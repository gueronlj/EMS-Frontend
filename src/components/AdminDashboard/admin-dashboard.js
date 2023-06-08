import {useState, useEffect } from 'react'
import Profile from '@components/AdminDashboard/simple-profile.js'
import EmployeeList from '@components/Employees/employee-list.js'
import QuickMenu from '@components/AdminDashboard/quick-menu.js'
import Modal from '@components/modal.js'
import EventForm from '@components/Schedule/event-form.js'
import EmployeeEditForm from '@components/Employees/employee-edit-form.js'
import NewEmployeeForm from '@components/Employees/employee-new-form.js'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Header from '@components/header.js'
import NavBar from '../nav-bar'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import {Routes, Route} from 'react-router-dom'
import Checklist from '../Checklist/table'
import Notes from '../Notes/notes';

const AdminDashboard = ( props ) => {
  const {getAccessTokenSilently} = useAuth0();
  const [editMode, setEditMode] = useState(false)
  const [eventForm, setEventForm] = useState(false)
  const [detailsView, setDetailsView ] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showNewEmployeeModal,setShowNewEmployeeModal ] = useState(false)
  const [feedbackAlert, setFeedbackAlert] = useState(false)
  const [schedule, setSchedule] = useState([])
  const [employeeList, setEmployeeList] = useState([])
  const [loadingEmployees, setLoadingEmployees] = useState(false)
  const [message, setMessage] = useState('')

  const ENDPOINT = process.env.REACT_APP_DEV_URI;

  const fetchSchedule = async () => {
    try{
      const token = await getAccessTokenSilently();
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/admin/${selectedEmployee._id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios(options)
      setSchedule(response.data.schedule)
    } catch(error){console.log(error)}
  }

  const fetchEmployeeList = async () => {
    try{
      setLoadingEmployees(true)
      const token = await getAccessTokenSilently();
      const options = {
        method: 'GET',
        url: `${ENDPOINT}/admin`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await axios(options)
      setEmployeeList(response.data)
      setLoadingEmployees(false)
    } catch (error) { console.error(error) }
  }

  useEffect(() => {
    fetchEmployeeList()
  },[])

  return (<>
    <Header
      isAdmin={props.isAdmin}
      user={props.user}
      showNewEmployeeModal={showNewEmployeeModal}
      setShowNewEmployeeModal={setShowNewEmployeeModal}
    />
    <NavBar
      isAdmin={props.isAdmin}/>
    <div className="main">
      <Routes>
        <Route path="/employees" element={
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
              setShowEditModal={setShowEditModal}
              setMessage={setMessage}/>
              {showModal?
                <Modal>
                  <EventForm
                    selectedEmployee={selectedEmployee}
                    fetchSchedule={fetchSchedule}
                    setShowModal={setShowModal}
                    setFeedbackAlert={setFeedbackAlert}
                    setMessage={setMessage}/>
                </Modal>
              :null}
              {showEditModal?
                <Modal>
                  <EmployeeEditForm
                    setShowEditModal={setShowEditModal}
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    setFeedbackAlert={setFeedbackAlert}
                    setMessage={setMessage}/>
                </Modal>
              :null}
              {showNewEmployeeModal?
                <Modal>
                  <NewEmployeeForm
                    setShowNewEmployeeModal={setShowNewEmployeeModal}
                    setSelectedEmployee={setSelectedEmployee}
                    fetchEmployeeList={fetchEmployeeList}/>
                </Modal>
              :null}
          </div>
          <div className="main-top">
          {loadingEmployees?
            <p className="loading-text">Loading</p>
            :
            <>
              <div className="sideMenu">
                <EmployeeList
                  fetchEmployeeList={fetchEmployeeList}
                  employeeList={employeeList}
                  setEmployeeList={setEmployeeList}
                  setSelectedEmployee={setSelectedEmployee}
                  selectedEmployee={selectedEmployee}
                  loadingEmployees={loadingEmployees}/>
              </div>
              <div className="quick-menu">
                {selectedEmployee?
                  <QuickMenu
                    selectedEmployee={selectedEmployee}
                    fetchSchedule={fetchSchedule}
                    eventForm={eventForm}
                    setEventForm={setEventForm}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setMessage={setMessage}
                    detailsView={detailsView}
                    setDetailsView={setDetailsView}
                    setFeedbackAlert={setFeedbackAlert}/>
                :
                  <p>Select an employee to to clock in and out.</p>
                }
              </div>
            </>
          }
          </div>
        </>
        }/>
        <Route path="/checklist" element={<Checklist/>}/>
        <Route path="/notes" element={<Notes/>}/>
      </Routes>     
      {feedbackAlert &&
        <Snackbar open={feedbackAlert} autoHideDuration={6000} onClose={() => setFeedbackAlert(false)}>
          <Alert onClose={() => setFeedbackAlert(false)} severity="success" sx={{ width: '100%', color:'#7cff40'}}>
            {message}
          </Alert>
        </Snackbar>
      }
    </div>
  </>)
}

export default AdminDashboard;
