import React, { useState, useEffect } from 'react';
import Profile from '@components/simple-profile.js'
import EmployeeList from '@components/Employees/employee-list.js'
import QuickMenu from '@components/quick-menu.js'
import Modal from '@components/modal.js'
import AddEmployeeButton from '@components/Buttons/new-employee-button.js'
import EventForm from '@components/Schedule/event-form.js'
import EmployeeEditForm from '@components/Employees/employee-edit-form.js'
import NewEmployeeForm from '@components/Employees/employee-new-form.js'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Login from '@components/Buttons/login.js'
import Logout from '@components/Buttons/logoutButton.js'
import { useAuth0} from '@auth0/auth0-react'

const AdminDashboard = ( props ) => {
  const [editMode, setEditMode] = useState(false)
  const [eventForm, setEventForm] = useState(false)
  const [detailsView, setDetailsView ] = useState(false)
  const [formData, setFormData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const {isAuthenticated, isLoading, user} = useAuth0();

  return (<>
    <div className="header">
      {props.user && <h4 className="user-name">Hello, {props.user.name}</h4>}
      <AddEmployeeButton
        selectedEmployee={props.selectedEmployee}
        showNewEmployeeModal={props.showNewEmployeeModal}
        setShowNewEmployeeModal={props.setShowNewEmployeeModal}/>
      <Login />
      <Logout />
    </div>
    <div className="main">
      {props.isAuthenticated && (
        <>
          <div className="dashboard">
            <Profile
              selectedEmployee={props.selectedEmployee}
              fetchSchedule={props.fetchSchedule}
              schedule={props.schedule}
              setSchedule={props.setSchedule}
              editMode={editMode}
              setEditMode={setEditMode}
              detailsView={detailsView}
              setDetailsView={setDetailsView}
              eventForm={eventForm}
              setEventForm={setEventForm}
              formData={formData}
              setFormData={setFormData}
              setShowEditModal={setShowEditModal}
              setMessage={props.setMessage}/>
              {showModal?
                <Modal>
                  <EventForm
                    selectedEmployee={props.selectedEmployee}
                    eventForm={eventForm}
                    setEventForm={setEventForm}
                    fetchSchedule={props.fetchSchedule}
                    setShowModal={setShowModal}
                    setMessage={props.setMessage}/>
                </Modal>
              :null}
              {showEditModal?
                <Modal>
                  <EmployeeEditForm
                    setShowEditModal={setShowEditModal}
                    selectedEmployee={props.selectedEmployee}
                    setSelectedEmployee={props.setSelectedEmployee}/>
                </Modal>
              :null}
              {props.showNewEmployeeModal?
                <Modal>
                  <NewEmployeeForm
                    setShowNewEmployeeModal={props.setShowNewEmployeeModal}
                    selectedEmployee={props.selectedEmployee}
                    setSelectedEmployee={props.setSelectedEmployee}
                    fetchEmployeeList={props.fetchEmployeeList}/>
                </Modal>
              :null}
          </div>
          <div className="main-top">
            <div className="sideMenu">
              <EmployeeList
                fetchEmployeeList={props.fetchEmployeeList}
                employeeList={props.employeeList}
                setEmployeeList={props.setEmployeeList}
                setSelectedEmployee={props.setSelectedEmployee}
                selectedEmployee={props.selectedEmployee}
                setMessage={props.setMessage}/>
            </div>
            <div className="quick-menu">
              {props.selectedEmployee?
                <QuickMenu
                  selectedEmployee={props.selectedEmployee}
                  schedule={props.schedule}
                  fetchSchedule={props.fetchSchedule}
                  formData={formData}
                  eventForm={eventForm}
                  setEventForm={setEventForm}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  message={props.message}
                  setMessage={props.setMessage}
                  detailsView={detailsView}
                  setDetailsView={setDetailsView}/>
              :
                <p>Select an employee to to clock in and out.</p>
              }
            </div>
          </div>
        </>
      )}
      {props.feedbackAlert &&
        <Snackbar open={props.feedbackAlert} autoHideDuration={6000} onClose={() => props.setFeedbackAlert(false)}>
          <Alert onClose={() => props.setFeedbackAlert(false)} severity="success" sx={{ width: '100%', color:'#7cff40'}}>
            {props.message}
          </Alert>
        </Snackbar>
      }
    </div>
  </>);
}

export default AdminDashboard;
